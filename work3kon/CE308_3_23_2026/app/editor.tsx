import React, { useState, useCallback, useRef } from 'react';
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
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useImageStore } from '../store/imageStore';
import { COLORS, RADIUS, SHADOW } from '../constants/theme';
import { rotateImage, flipImage, resizeImage, cropImage, saveToGallery, shareImage } from '../utils/imageHelpers';
import CropEditor, { ImageCrop } from '../components/CropEditor';
import ActionBar from '../components/ActionBar';

const { width: SCREEN_W } = Dimensions.get('window');
const IMAGE_PREVIEW_H = SCREEN_W * 0.85;

// ─── Rotate Tool Bar ─────────────────────────────────────────────────────────
interface RotateOption {
  label: string;
  icon: string;
  degrees: 90 | 180 | 270;
}

const ROTATE_OPTIONS: RotateOption[] = [
  { label: '90°', icon: 'chevron-forward-circle-outline', degrees: 90 },
  { label: '180°', icon: 'repeat-outline', degrees: 180 },
  { label: '270°', icon: 'chevron-back-circle-outline', degrees: 270 },
];

type ActiveTool = 'none' | 'rotate' | 'resize' | 'crop';

export default function EditorScreen() {
  const router = useRouter();
  const {
    currentUri,
    originalUri,
    setEditedUri,
    setCurrentUri,
    isLoading,
    setIsLoading,
    isSaving: isSavingStore,
    setIsSaving,
  } = useImageStore();

  const [activeTool, setActiveTool] = useState<ActiveTool>('none');

  // Resize state
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [showResizeModal, setShowResizeModal] = useState(false);

  // Crop state
  const [showCropEditor, setShowCropEditor] = useState(false);

  const handleSave = useCallback(async () => {
    if (!currentUri) return;
    setIsSaving(true);
    try {
      const saved = await saveToGallery(currentUri);
      if (saved) {
        Alert.alert('✓ Saved', 'Image saved to your gallery.');
      } else {
        Alert.alert('Not Saved', 'Could not save the image. Please grant permission and try again.');
      }
    } catch {
      Alert.alert('Error', 'Failed to save image.');
    } finally {
      setIsSaving(false);
    }
  }, [currentUri, setIsSaving]);

  const handleShare = useCallback(async () => {
    if (!currentUri) return;
    try {
      await shareImage(currentUri);
    } catch {
      Alert.alert('Error', 'Failed to share image.');
    }
  }, [currentUri]);

  const handleRotate = useCallback(
    async (degrees: 90 | 180 | 270) => {
      if (!currentUri) return;
      setIsLoading(true);
      try {
        const uri = await rotateImage(currentUri, degrees);
        setEditedUri(uri);
        Alert.alert('✓ Rotated', `Image rotated ${degrees}°`);
      } catch (e) {
        Alert.alert('Error', 'Failed to rotate image.');
      } finally {
        setIsLoading(false);
      }
    },
    [currentUri, setEditedUri, setIsLoading]
  );

  const handleFlip = useCallback(async () => {
    if (!currentUri) return;
    setIsLoading(true);
    try {
      const uri = await flipImage(currentUri, 'horizontal');
      setEditedUri(uri);
    } catch (e) {
      Alert.alert('Error', 'Failed to flip image.');
    } finally {
      setIsLoading(false);
    }
  }, [currentUri, setEditedUri, setIsLoading]);

  const handleResize = useCallback(async () => {
    if (!currentUri) return;
    const w = parseInt(resizeWidth, 10);
    const h = parseInt(resizeHeight, 10);
    if (!w || !h || w <= 0 || h <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid width and height values.');
      return;
    }
    if (w > 8000 || h > 8000) {
      Alert.alert('Too Large', 'Max dimension is 8000px.');
      return;
    }
    setShowResizeModal(false);
    setIsLoading(true);
    try {
      const uri = await resizeImage(currentUri, { width: w, height: h });
      setEditedUri(uri);
      Alert.alert('✓ Resized', `Image resized to ${w}×${h}px`);
    } catch (e) {
      Alert.alert('Error', 'Failed to resize image.');
    } finally {
      setIsLoading(false);
      setResizeWidth('');
      setResizeHeight('');
    }
  }, [currentUri, resizeWidth, resizeHeight, setEditedUri, setIsLoading]);

  const handleCropApply = useCallback(
    async (cropRegion: ImageCrop) => {
      setShowCropEditor(false);
      if (!currentUri) return;
      setIsLoading(true);
      try {
        const uri = await cropImage(currentUri, cropRegion);
        setEditedUri(uri);
        Alert.alert('✓ Cropped', `Cropped to ${cropRegion.width}×${cropRegion.height}px`);
      } catch {
        Alert.alert('Error', 'Failed to apply crop.');
      } finally {
        setIsLoading(false);
      }
    },
    [currentUri, setEditedUri, setIsLoading],
  );

  const handleGoToFilters = () => {
    router.push('/filter');
  };

  const handleReset = () => {
    if (!originalUri) return;
    Alert.alert('Reset', 'Revert to the original image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          setCurrentUri(originalUri);
        },
      },
    ]);
  };

  if (!currentUri) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="image-outline" size={64} color={COLORS.textFaint} />
        <Text style={styles.emptyText}>No image selected</Text>
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
      {/* Image Preview */}
      <View style={styles.previewContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={COLORS.accent} size="large" />
            <Text style={styles.loadingText}>Processing…</Text>
          </View>
        )}
        <Image
          source={{ uri: currentUri }}
          style={styles.previewImage}
          resizeMode="contain"
        />
      </View>

      {/* Save / Share bar */}
      <ActionBar
        onSave={handleSave}
        onShare={handleShare}
        onReset={handleReset}
        isSaving={isSavingStore}
        isLoading={isLoading}
        disabled={!currentUri}
      />

      {/* Tool Tabs */}
      <ScrollView style={styles.toolsPanel} showsVerticalScrollIndicator={false}>
        {/* ── Rotate Section ─────────────────────────────────── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setActiveTool(activeTool === 'rotate' ? 'none' : 'rotate')}
            activeOpacity={0.8}
          >
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconBadge, { backgroundColor: '#3D2FFF22' }]}>
                <Ionicons name="refresh-circle-outline" size={20} color={COLORS.accent} />
              </View>
              <Text style={styles.sectionTitle}>Rotate</Text>
            </View>
            <Ionicons
              name={activeTool === 'rotate' ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {activeTool === 'rotate' && (
            <View style={styles.sectionContent}>
              <View style={styles.rotateRow}>
                {ROTATE_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.degrees}
                    style={styles.rotateButton}
                    onPress={() => handleRotate(opt.degrees)}
                    disabled={isLoading}
                    activeOpacity={0.75}
                  >
                    <Ionicons name={opt.icon as any} size={24} color={COLORS.accent} />
                    <Text style={styles.rotateLabel}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.rotateButton}
                  onPress={handleFlip}
                  disabled={isLoading}
                  activeOpacity={0.75}
                >
                  <Ionicons name="swap-horizontal-outline" size={24} color={COLORS.accentLight} />
                  <Text style={[styles.rotateLabel, { color: COLORS.accentLight }]}>Flip H</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* ── Crop Section ───────────────────────────────────── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setActiveTool(activeTool === 'crop' ? 'none' : 'crop')}
            activeOpacity={0.8}
          >
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconBadge, { backgroundColor: '#FF6B6B22' }]}>
                <Ionicons name="crop-outline" size={20} color={COLORS.error} />
              </View>
              <Text style={styles.sectionTitle}>Crop</Text>
            </View>
            <Ionicons
              name={activeTool === 'crop' ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {activeTool === 'crop' && (
            <View style={styles.sectionContent}>
              <Text style={styles.hint}>Freely adjust crop area by dragging handles</Text>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowCropEditor(true)}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                <Ionicons name="crop-outline" size={18} color="#fff" />
                <Text style={styles.applyButtonText}>Open Crop Editor</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* ── Resize Section ─────────────────────────────────── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setActiveTool(activeTool === 'resize' ? 'none' : 'resize')}
            activeOpacity={0.8}
          >
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconBadge, { backgroundColor: '#4CAF8C22' }]}>
                <Ionicons name="resize-outline" size={20} color={COLORS.success} />
              </View>
              <Text style={styles.sectionTitle}>Resize</Text>
            </View>
            <Ionicons
              name={activeTool === 'resize' ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {activeTool === 'resize' && (
            <View style={styles.sectionContent}>
              <Text style={styles.hint}>Enter new dimensions in pixels:</Text>
              <View style={styles.resizeInputRow}>
                <View style={styles.resizeInputWrapper}>
                  <Text style={styles.inputLabel}>Width (px)</Text>
                  <TextInput
                    style={styles.resizeInput}
                    placeholder="e.g. 1080"
                    placeholderTextColor={COLORS.textFaint}
                    keyboardType="number-pad"
                    value={resizeWidth}
                    onChangeText={setResizeWidth}
                    returnKeyType="next"
                    maxLength={5}
                  />
                </View>
                <View style={styles.resizeSeparator}>
                  <Text style={styles.resizeSeparatorText}>×</Text>
                </View>
                <View style={styles.resizeInputWrapper}>
                  <Text style={styles.inputLabel}>Height (px)</Text>
                  <TextInput
                    style={styles.resizeInput}
                    placeholder="e.g. 1920"
                    placeholderTextColor={COLORS.textFaint}
                    keyboardType="number-pad"
                    value={resizeHeight}
                    onChangeText={setResizeHeight}
                    returnKeyType="done"
                    maxLength={5}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  (!resizeWidth || !resizeHeight) && styles.applyButtonDisabled,
                ]}
                onPress={handleResize}
                disabled={!resizeWidth || !resizeHeight || isLoading}
              >
                <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
                <Text style={styles.applyButtonText}>Apply Resize</Text>
              </TouchableOpacity>

              {/* Common presets */}
              <View style={styles.presetRow}>
                {[
                  { label: 'HD', w: 1280, h: 720 },
                  { label: 'FHD', w: 1920, h: 1080 },
                  { label: '4K', w: 3840, h: 2160 },
                  { label: 'Sq', w: 1080, h: 1080 },
                ].map((p) => (
                  <TouchableOpacity
                    key={p.label}
                    style={styles.presetChip}
                    onPress={() => {
                      setResizeWidth(String(p.w));
                      setResizeHeight(String(p.h));
                    }}
                  >
                    <Text style={styles.presetChipText}>{p.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* ── Go to Filters ──────────────────────────────────── */}
        <TouchableOpacity
          style={styles.filtersNavButton}
          onPress={handleGoToFilters}
          activeOpacity={0.85}
        >
          <View style={styles.filtersNavLeft}>
            <View style={[styles.iconBadge, { backgroundColor: '#9F99FF22' }]}>
              <Ionicons name="color-filter-outline" size={20} color={COLORS.accentLight} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Filters & Adjustments</Text>
              <Text style={styles.sectionSubtitle}>
                B&W, Sepia, Warm, Cool, Vivid, Vintage + Sliders
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.accent} />
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── Free-form Crop Editor Modal ─────────────────────────────── */}
      <Modal
        visible={showCropEditor}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowCropEditor(false)}
      >
        {currentUri && (
          <CropEditor
            imageUri={currentUri}
            onApply={handleCropApply}
            onCancel={() => setShowCropEditor(false)}
          />
        )}
      </Modal>
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
  previewContainer: {
    height: IMAGE_PREVIEW_H,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    gap: 12,
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Tools Panel
  toolsPanel: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  sectionContent: {
    paddingBottom: 16,
    gap: 12,
  },
  hint: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },

  // Rotate
  rotateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rotateButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rotateLabel: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
  },

  // Crop
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cropPresetBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  cropPresetBtnActive: {
    borderColor: COLORS.accent,
    backgroundColor: `${COLORS.accent}22`,
  },
  cropPresetText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  cropPresetTextActive: {
    color: COLORS.accent,
  },

  // Resize
  resizeInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  resizeInputWrapper: {
    flex: 1,
    gap: 4,
  },
  inputLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  resizeInput: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlign: 'center',
  },
  resizeSeparator: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  resizeSeparatorText: {
    color: COLORS.textMuted,
    fontSize: 20,
    fontWeight: '300',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    ...SHADOW.accent,
  },
  applyButtonDisabled: {
    opacity: 0.4,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  presetChipText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // Filter nav
  filtersNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filtersNavLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  // Reset
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: `${COLORS.error}44`,
    backgroundColor: `${COLORS.error}11`,
  },
  resetButtonText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '700',
  },
});
