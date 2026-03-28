import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Constants ───────────────────────────────────────────────────────────────
const { width: SW } = Dimensions.get('window');

const TOUCH_RADIUS = 26;   // px radius around a handle that counts as a hit
const CORNER_ARM   = 22;   // length of each L-shape arm
const CORNER_THICK = 3;    // thickness of each L-shape arm
const EDGE_LONG    = 24;   // long side of edge handle bar
const EDGE_SHORT   = 6;    // short side of edge handle bar
const MIN_CROP     = 50;   // minimum crop dimension in diฆsplay px

const OVERLAY_CLR  = 'rgba(0,0,0,0.60)';
const BORDER_CLR   = 'rgba(255,255,255,0.90)';
const HANDLE_CLR   = '#FFFFFF';
const GRID_CLR     = 'rgba(255,255,255,0.30)';
const ACCENT       = '#3D2FFF';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Rect { x: number; y: number; w: number; h: number }

/** Which part of the crop the user is interacting with */
type DragTarget =
  | 'tl' | 'tc' | 'tr'
  | 'ml' |         'mr'
  | 'bl' | 'bc' | 'br'
  | 'move'
  | null;

export interface ImageCrop {
  originX: number;
  originY: number;
  width: number;
  height: number;
}

interface Props {
  imageUri: string;
  onApply: (crop: ImageCrop) => void;
  onCancel: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * Determine which handle (or interior) was touched.
 * Returns null if touch is outside the crop box entirely.
 */
function detectTarget(tx: number, ty: number, r: Rect): DragTarget {
  const { x, y, w, h } = r;
  const tr = TOUCH_RADIUS;
  const mx = x + w / 2;
  const my = y + h / 2;

  // Corners — checked first so they win over edge midpoints
  if (tx >= x - tr && tx <= x + tr && ty >= y - tr && ty <= y + tr)                   return 'tl';
  if (tx >= x + w - tr && tx <= x + w + tr && ty >= y - tr && ty <= y + tr)           return 'tr';
  if (tx >= x - tr && tx <= x + tr && ty >= y + h - tr && ty <= y + h + tr)           return 'bl';
  if (tx >= x + w - tr && tx <= x + w + tr && ty >= y + h - tr && ty <= y + h + tr)   return 'br';

  // Edge midpoints
  if (Math.abs(tx - mx) <= tr && Math.abs(ty - y)       <= tr) return 'tc';
  if (Math.abs(tx - mx) <= tr && Math.abs(ty - (y + h)) <= tr) return 'bc';
  if (Math.abs(tx - x)       <= tr && Math.abs(ty - my) <= tr) return 'ml';
  if (Math.abs(tx - (x + w)) <= tr && Math.abs(ty - my) <= tr) return 'mr';

  // Interior → move whole box
  if (tx >= x && tx <= x + w && ty >= y && ty <= y + h) return 'move';

  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CropEditor({ imageUri, onApply, onCancel }: Props) {
  // ── Container (canvas) size  ─────────────────────────────────────────────
  const [containerSize, setContainerSize] = useState({ w: SW, h: 420 });
  const containerSizeRef = useRef(containerSize);

  // ── Natural image dimensions  ────────────────────────────────────────────
  const [imageNatSize, setImageNatSize] = useState({ w: 1, h: 1 });
  const imageNatRef = useRef(imageNatSize);

  // ── Image display rect (accounts for letterboxing from resizeMode=contain) ─
  const imgRectRef = useRef<Rect>({ x: 0, y: 0, w: SW, h: 420 });

  // ── Crop box in display-space pixels  ───────────────────────────────────
  const [crop, setCrop] = useState<Rect>({ x: 40, y: 40, w: 200, h: 200 });
  const cropRef = useRef<Rect>(crop);

  // ── Gesture tracking (refs → no stale closure in PanResponder) ──────────
  const dragTarget   = useRef<DragTarget>(null);
  const cropAtStart  = useRef<Rect>(crop);   // snapshot of crop at gesture start

  // ── Load natural image size  ─────────────────────────────────────────────
  useEffect(() => {
    Image.getSize(
      imageUri,
      (w, h) => {
        imageNatRef.current = { w, h };
        setImageNatSize({ w, h });
      },
      () => {},
    );
  }, [imageUri]);

  // ── Recompute letterbox rect + initial crop  ─────────────────────────────
  const computeLayout = useCallback(
    (cs: { w: number; h: number }, nat: { w: number; h: number }) => {
      if (cs.w === 0 || nat.w === 0) return;

      const imgAspect = nat.w / nat.h;
      const conAspect = cs.w / cs.h;
      let dw: number, dh: number, ox: number, oy: number;

      if (imgAspect > conAspect) {
        dw = cs.w;  dh = cs.w / imgAspect;
        ox = 0;     oy = (cs.h - dh) / 2;
      } else {
        dh = cs.h;  dw = cs.h * imgAspect;
        ox = (cs.w - dw) / 2;  oy = 0;
      }

      imgRectRef.current = { x: ox, y: oy, w: dw, h: dh };

      // Initial crop: 15% inset from each edge of the displayed image
      const pad = 0.15;
      const init: Rect = {
        x: ox + dw * pad,
        y: oy + dh * pad,
        w: dw * (1 - 2 * pad),
        h: dh * (1 - 2 * pad),
      };
      cropRef.current = init;
      setCrop(init);
    },
    [],
  );

  useEffect(() => {
    computeLayout(containerSize, imageNatSize);
  }, [containerSize, imageNatSize, computeLayout]);

  // ── PanResponder  ────────────────────────────────────────────────────────
  // All reads inside callbacks use .current refs → always up-to-date.
  // setCrop is stable (React guarantee) so safe to capture once.
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        dragTarget.current  = detectTarget(locationX, locationY, cropRef.current);
        cropAtStart.current = { ...cropRef.current };
      },

      onPanResponderMove: (_, gs) => {
        const target = dragTarget.current;
        if (!target) return;

        const snap = cropAtStart.current;
        const ir   = imgRectRef.current;
        const { dx, dy } = gs;
        let { x, y, w, h } = snap;

        switch (target) {
          /* ── Move whole box ─────────────────────────────────── */
          case 'move':
            x = clamp(snap.x + dx, ir.x,             ir.x + ir.w - w);
            y = clamp(snap.y + dy, ir.y,             ir.y + ir.h - h);
            break;

          /* ── Corners ────────────────────────────────────────── */
          case 'tl': {
            const nx = clamp(snap.x + dx, ir.x, snap.x + snap.w - MIN_CROP);
            const ny = clamp(snap.y + dy, ir.y, snap.y + snap.h - MIN_CROP);
            w = snap.x + snap.w - nx;  h = snap.y + snap.h - ny;
            x = nx;                    y = ny;
            break;
          }
          case 'tr': {
            const ny = clamp(snap.y + dy, ir.y, snap.y + snap.h - MIN_CROP);
            w = clamp(snap.w + dx, MIN_CROP, ir.x + ir.w - snap.x);
            h = snap.y + snap.h - ny;  y = ny;
            break;
          }
          case 'bl': {
            const nx = clamp(snap.x + dx, ir.x, snap.x + snap.w - MIN_CROP);
            w = snap.x + snap.w - nx;
            h = clamp(snap.h + dy, MIN_CROP, ir.y + ir.h - snap.y);
            x = nx;
            break;
          }
          case 'br':
            w = clamp(snap.w + dx, MIN_CROP, ir.x + ir.w - snap.x);
            h = clamp(snap.h + dy, MIN_CROP, ir.y + ir.h - snap.y);
            break;

          /* ── Edge midpoints ─────────────────────────────────── */
          case 'tc': {
            const ny = clamp(snap.y + dy, ir.y, snap.y + snap.h - MIN_CROP);
            h = snap.y + snap.h - ny;  y = ny;
            break;
          }
          case 'bc':
            h = clamp(snap.h + dy, MIN_CROP, ir.y + ir.h - snap.y);
            break;
          case 'ml': {
            const nx = clamp(snap.x + dx, ir.x, snap.x + snap.w - MIN_CROP);
            w = snap.x + snap.w - nx;  x = nx;
            break;
          }
          case 'mr':
            w = clamp(snap.w + dx, MIN_CROP, ir.x + ir.w - snap.x);
            break;
        }

        const nc: Rect = { x, y, w, h };
        cropRef.current = nc;
        setCrop(nc);
      },

      onPanResponderRelease:   () => { dragTarget.current = null; },
      onPanResponderTerminate: () => { dragTarget.current = null; },
    }),
  ).current;

  // ── Apply: convert display-space crop → real image pixels  ───────────────
  const handleApply = () => {
    const c  = cropRef.current;
    const ir = imgRectRef.current;
    const n  = imageNatRef.current;
    if (ir.w === 0 || ir.h === 0) return;

    const sx = n.w / ir.w;
    const sy = n.h / ir.h;

    onApply({
      originX: Math.max(0, Math.round((c.x - ir.x) * sx)),
      originY: Math.max(0, Math.round((c.y - ir.y) * sy)),
      width:   Math.max(1, Math.round(c.w * sx)),
      height:  Math.max(1, Math.round(c.h * sy)),
    });
  };

  // ── Coordinate info (image-space) for the info bar  ─────────────────────
  const ir  = imgRectRef.current;
  const nat = imageNatRef.current;
  const sx  = ir.w > 0 ? nat.w / ir.w : 1;
  const sy  = ir.h > 0 ? nat.h / ir.h : 1;
  const infoX = Math.max(0, Math.round((crop.x - ir.x) * sx));
  const infoY = Math.max(0, Math.round((crop.y - ir.y) * sy));
  const infoW = Math.max(0, Math.round(crop.w * sx));
  const infoH = Math.max(0, Math.round(crop.h * sy));

  // ── Derived positions for handles  ──────────────────────────────────────
  const { x: cx, y: cy, w: cw, h: ch } = crop;
  const cmx = cx + cw / 2;   // center x
  const cmy = cy + ch / 2;   // center y

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Crop Image</Text>
        <Text style={s.headerSub}>Drag handles to resize · Drag inside to move</Text>
      </View>

      {/* ── Canvas (image + overlay + handles) ─────────────────────────── */}
      <View
        style={s.canvas}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          const cs = { w: width, h: height };
          containerSizeRef.current = cs;
          setContainerSize(cs);
          computeLayout(cs, imageNatRef.current);
        }}
      >
        {/* Background image */}
        <Image source={{ uri: imageUri }} style={s.image} resizeMode="contain" />

        {/* Single PanResponder view — covers everything on top */}
        <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>

          {/* ── 4-rectangle dark overlay ──────────────────────── */}
          {/* Top */}
          <View style={[s.overlay, { left: 0, top: 0, right: 0, height: cy }]} />
          {/* Bottom */}
          <View style={[s.overlay, { left: 0, right: 0, top: cy + ch, bottom: 0 }]} />
          {/* Left */}
          <View style={[s.overlay, { left: 0, width: cx, top: cy, height: ch }]} />
          {/* Right */}
          <View style={[s.overlay, { left: cx + cw, right: 0, top: cy, height: ch }]} />

          {/* ── Crop border + rule-of-thirds grid ─────────────── */}
          <View style={[s.cropFrame, { left: cx, top: cy, width: cw, height: ch }]}>
            <View style={[s.gridVert,  { left: '33.33%' }]} />
            <View style={[s.gridVert,  { left: '66.66%' }]} />
            <View style={[s.gridHoriz, { top:  '33.33%' }]} />
            <View style={[s.gridHoriz, { top:  '66.66%' }]} />
          </View>

          {/* ── Corner handles (L-shapes) ─────────────────────── */}
          {/* TL */}
          <View style={[s.lH, { left: cx,          top: cy }]} />
          <View style={[s.lV, { left: cx,          top: cy }]} />
          {/* TR */}
          <View style={[s.lH, { left: cx + cw - CORNER_ARM, top: cy }]} />
          <View style={[s.lV, { left: cx + cw - CORNER_THICK, top: cy }]} />
          {/* BL */}
          <View style={[s.lH, { left: cx,          top: cy + ch - CORNER_THICK }]} />
          <View style={[s.lV, { left: cx,          top: cy + ch - CORNER_ARM }]} />
          {/* BR */}
          <View style={[s.lH, { left: cx + cw - CORNER_ARM, top: cy + ch - CORNER_THICK }]} />
          <View style={[s.lV, { left: cx + cw - CORNER_THICK, top: cy + ch - CORNER_ARM }]} />

          {/* ── Edge midpoint handles ──────────────────────────── */}
          {/* TC — horizontal bar centered on top edge */}
          <View style={[s.edgeH, { left: cmx - EDGE_LONG / 2, top: cy - EDGE_SHORT / 2 }]} />
          {/* BC */}
          <View style={[s.edgeH, { left: cmx - EDGE_LONG / 2, top: cy + ch - EDGE_SHORT / 2 }]} />
          {/* ML — vertical bar centered on left edge */}
          <View style={[s.edgeV, { left: cx - EDGE_SHORT / 2, top: cmy - EDGE_LONG / 2 }]} />
          {/* MR */}
          <View style={[s.edgeV, { left: cx + cw - EDGE_SHORT / 2, top: cmy - EDGE_LONG / 2 }]} />

        </View>
      </View>

      {/* ── Coordinate info bar ─────────────────────────────────────────── */}
      <View style={s.infoBar}>
        <Ionicons name="crop-outline" size={13} color="#888" />
        <Text style={s.infoText}>
          {'  '}X:{infoX}{'  '}Y:{infoY}{'  '}W:{infoW}{'  '}H:{infoH}{'  '}px
        </Text>
      </View>

      {/* ── Action buttons ─────────────────────────────────────────────── */}
      <View style={s.actionRow}>
        <TouchableOpacity style={s.btnCancel} onPress={onCancel} activeOpacity={0.8}>
          <Ionicons name="close-outline" size={20} color="#fff" />
          <Text style={s.btnLabel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnApply} onPress={handleApply} activeOpacity={0.8}>
          <Ionicons name="checkmark-outline" size={20} color="#fff" />
          <Text style={s.btnLabel}>Apply Crop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSub: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
  },

  // Canvas
  canvas: {
    flex: 1,
    backgroundColor: '#111',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Dark overlay panels
  overlay: {
    position: 'absolute',
    backgroundColor: OVERLAY_CLR,
  },

  // Crop border box
  cropFrame: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: BORDER_CLR,
    overflow: 'hidden',
  },

  // Rule-of-thirds grid lines
  gridVert: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: GRID_CLR,
  },
  gridHoriz: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: GRID_CLR,
  },

  // L-shape corner handle — horizontal arm
  lH: {
    position: 'absolute',
    width: CORNER_ARM,
    height: CORNER_THICK,
    backgroundColor: HANDLE_CLR,
  },
  // L-shape corner handle — vertical arm
  lV: {
    position: 'absolute',
    width: CORNER_THICK,
    height: CORNER_ARM,
    backgroundColor: HANDLE_CLR,
  },

  // Edge midpoint handle — horizontal (for top / bottom edges)
  edgeH: {
    position: 'absolute',
    width: EDGE_LONG,
    height: EDGE_SHORT,
    borderRadius: 3,
    backgroundColor: HANDLE_CLR,
  },
  // Edge midpoint handle — vertical (for left / right edges)
  edgeV: {
    position: 'absolute',
    width: EDGE_SHORT,
    height: EDGE_LONG,
    borderRadius: 3,
    backgroundColor: HANDLE_CLR,
  },

  // Info bar
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#1e1e1e',
  },
  infoText: {
    color: '#888',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },

  // Buttons
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#111',
  },
  btnCancel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#242424',
  },
  btnApply: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: ACCENT,
  },
  btnLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
