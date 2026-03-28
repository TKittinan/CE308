import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  PixelRatio,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useImageStore, FilterType, ColorAdjustments } from '../store/imageStore';
import { COLORS, RADIUS, SHADOW } from '../constants/theme';
import FilterStrip from '../components/FilterStrip';
import SliderControl from '../components/SliderControl';
import ActionBar from '../components/ActionBar';
import { saveToGallery, shareImage, getFilterStyle, cropImage } from '../utils/imageHelpers';
import { captureRef } from 'react-native-view-shot';

const { width: SCREEN_W } = Dimensions.get('window');
const IMAGE_PREVIEW_H = SCREEN_W * 0.75;

type TabType = 'filters' | 'adjust';

export default function FilterScreen() {
  const router = useRouter();
  const {
    currentUri,
    activeFilter,
    colorAdjustments,
    isSaving,
    setActiveFilter,
    setColorAdjustments,
    setIsSaving,
    setCurrentUri,
  } = useImageStore();

  const [activeTab, setActiveTab] = useState<TabType>('filters');

  // Ref to the image view — used to capture rendered pixels (with filter baked in)
  const previewRef = useRef<View>(null);
  // Natural dimensions of the source image (needed to crop letterboxing after capture)
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  // Rendered CSS-pixel size of the preview container
  const previewDims = useRef<{ w: number; h: number }>({ w: SCREEN_W, h: IMAGE_PREVIEW_H });

  // Load natural image dimensions so we can crop letterboxing after capture
  useEffect(() => {
    if (currentUri) {
      Image.getSize(currentUri, (w, h) => setNaturalSize({ w, h }), () => {});
    }
  }, [currentUri]);

  /**
   * Capture the preview view with the CSS filter visually applied,
   * then crop out letterboxing so the saved image has no black bars.
   */
  const captureFilteredImage = useCallback(async (): Promise<string> => {
    const ratio = PixelRatio.get();
    const rawUri = await captureRef(previewRef, { format: 'jpg', quality: 0.97 });

    if (naturalSize && naturalSize.w > 0 && naturalSize.h > 0) {
      const cw = previewDims.current.w;
      const ch = previewDims.current.h;
      const imgAspect = naturalSize.w / naturalSize.h;
      const conAspect = cw / ch;

      if (Math.abs(imgAspect - conAspect) > 0.02) {
        let cropX = 0, cropY = 0, cropW = cw, cropH = ch;
        if (imgAspect > conAspect) {
          // letterbox top / bottom
          cropH = cw / imgAspect;
          cropY = (ch - cropH) / 2;
        } else {
          // pillarbox left / right
          cropW = ch * imgAspect;
          cropX = (cw - cropW) / 2;
        }
        return await cropImage(rawUri, {
          originX: Math.round(cropX * ratio),
          originY: Math.round(cropY * ratio),
          width:   Math.max(1, Math.round(cropW * ratio)),
          height:  Math.max(1, Math.round(cropH * ratio)),
        });
      }
    }
    return rawUri;
  }, [naturalSize]);

  // Compute the CSS filter style applied to the preview image
  const filterStyle = currentUri
    ? getFilterStyle(activeFilter, colorAdjustments)
    : {};

  const handleSave = useCallback(async () => {
    if (!currentUri) return;
    setIsSaving(true);
    try {
      // Capture the rendered view so the filter is baked into the pixel data
      const filteredUri = await captureFilteredImage();
      const success = await saveToGallery(filteredUri);
      if (success) {
        Alert.alert('🎉 Saved!', 'Your edited image has been saved to the gallery.');
      } else {
        Alert.alert('Not Saved', 'Could not save the image. Please grant permission and try again.');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to save image.');
    } finally {
      setIsSaving(false);
    }
  }, [currentUri, setIsSaving, captureFilteredImage]);

  const handleShare = useCallback(async () => {
    if (!currentUri) return;
    try {
      // Share with filter baked in
      const filteredUri = await captureFilteredImage();
      await shareImage(filteredUri);
    } catch (e) {
      Alert.alert('Error', 'Failed to share image.');
    }
  }, [currentUri, captureFilteredImage]);

  const handleResetAdjustments = useCallback(() => {
    setColorAdjustments({ brightness: 0, contrast: 0, saturation: 0 });
    setActiveFilter('none');
  }, [setColorAdjustments, setActiveFilter]);

  const handleSelectFilter = useCallback(
    (filter: FilterType) => {
      setActiveFilter(filter);
    },
    [setActiveFilter]
  );

  const sliderData: {
    key: keyof ColorAdjustments;
    label: string;
    icon: string;
  }[] = [
    { key: 'brightness', label: 'Brightness', icon: '☀️' },
    { key: 'contrast',   label: 'Contrast',   icon: '◑' },
    { key: 'saturation', label: 'Saturation', icon: '🎨' },
  ];

  const hasChanges =
    activeFilter !== 'none' ||
    colorAdjustments.brightness !== 0 ||
    colorAdjustments.contrast !== 0 ||
    colorAdjustments.saturation !== 0;

  if (!currentUri) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="image-outline" size={64} color={COLORS.textFaint} />
        <Text style={styles.emptyText}>No image to edit</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image Preview with Filter Applied */}
      <View
        style={styles.previewWrapper}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          previewDims.current = { w: width, h: height };
        }}
      >
        {/* Capturable view — contains only the image, NOT the badge */}
        <View ref={previewRef} collapsable={false} style={StyleSheet.absoluteFill}>
          <Image
            source={{ uri: currentUri }}
            style={[styles.previewImage, filterStyle as any]}
            resizeMode="contain"
          />
        </View>

        {/* Active filter badge */}
        {(activeFilter !== 'none' || hasChanges) && (
          <View style={styles.filterBadge}>
            <Ionicons name="color-filter" size={12} color="#fff" />
            <Text style={styles.filterBadgeText}>
              {activeFilter !== 'none'
                ? activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)
                : 'Adjusted'}
            </Text>
          </View>
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'filters' && styles.tabActive]}
          onPress={() => setActiveTab('filters')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="color-filter-outline"
            size={16}
            color={activeTab === 'filters' ? COLORS.accent : COLORS.textMuted}
          />
          <Text style={[styles.tabText, activeTab === 'filters' && styles.tabTextActive]}>
            Filters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'adjust' && styles.tabActive]}
          onPress={() => setActiveTab('adjust')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="options-outline"
            size={16}
            color={activeTab === 'adjust' ? COLORS.accent : COLORS.textMuted}
          />
          <Text style={[styles.tabText, activeTab === 'adjust' && styles.tabTextActive]}>
            Adjust
          </Text>
          {(colorAdjustments.brightness !== 0 ||
            colorAdjustments.contrast !== 0 ||
            colorAdjustments.saturation !== 0) && (
            <View style={styles.tabDot} />
          )}
        </TouchableOpacity>
      </View>

      {/* Tab content */}
      {activeTab === 'filters' ? (
        /* Filter strip */
        <FilterStrip
          imageUri={currentUri}
          activeFilter={activeFilter}
          onSelectFilter={handleSelectFilter}
        />
      ) : (
        /* Sliders */
        <View style={styles.slidersPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {sliderData.map(({ key, label, icon }) => (
              <SliderControl
                key={key}
                label={label}
                icon={icon}
                value={colorAdjustments[key]}
                onValueChange={(v) => setColorAdjustments({ [key]: v })}
              />
            ))}

            {/* Reset adjustments */}
            {hasChanges && (
              <TouchableOpacity
                style={styles.resetAdjBtn}
                onPress={handleResetAdjustments}
                activeOpacity={0.75}
              >
                <Ionicons name="refresh-outline" size={14} color={COLORS.textMuted} />
                <Text style={styles.resetAdjText}>Reset all adjustments</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      )}

      {/* Action Bar */}
      <ActionBar
        onSave={handleSave}
        onShare={handleShare}
        onReset={hasChanges ? handleResetAdjustments : undefined}
        isSaving={isSaving}
        disabled={!currentUri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: COLORS.background,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    marginTop: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Preview
  previewWrapper: {
    height: IMAGE_PREVIEW_H,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  filterBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(108,99,255,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    position: 'relative',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.accent,
  },
  tabDot: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },

  // Sliders panel
  slidersPanel: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: 8,
  },
  resetAdjBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 11,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  resetAdjText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
});
