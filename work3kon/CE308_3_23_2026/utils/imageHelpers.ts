import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { FilterType, ColorAdjustments } from '../store/imageStore';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CropRegion {
  originX: number;
  originY: number;
  width: number;
  height: number;
}

export interface ResizeDimensions {
  width: number;
  height: number;
}

// ─── Rotate Image ─────────────────────────────────────────────────────────────
export async function rotateImage(
  uri: string,
  degrees: 90 | 180 | 270
): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ rotate: degrees }],
    { compress: 0.92, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

// ─── Crop Image ───────────────────────────────────────────────────────────────
export async function cropImage(
  uri: string,
  crop: CropRegion
): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ crop }],
    { compress: 0.92, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

// ─── Resize Image ─────────────────────────────────────────────────────────────
export async function resizeImage(
  uri: string,
  dimensions: ResizeDimensions
): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: dimensions }],
    { compress: 0.92, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

// ─── Flip Image ───────────────────────────────────────────────────────────────
export async function flipImage(
  uri: string,
  direction: 'horizontal' | 'vertical'
): Promise<string> {
  const flip =
    direction === 'horizontal'
      ? ImageManipulator.FlipType.Horizontal
      : ImageManipulator.FlipType.Vertical;
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ flip }],
    { compress: 0.92, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

// ─── Compress & Convert ───────────────────────────────────────────────────────
export async function compressImage(
  uri: string,
  quality: number = 0.8
): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
}

export async function convertToPng(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  );
  return result.uri;
}

// ─── Get Image Info ───────────────────────────────────────────────────────────
export async function getImageInfo(
  uri: string
): Promise<FileSystem.FileInfo> {
  return await FileSystem.getInfoAsync(uri);
}

// ─── Apply CSS-style Filter (Matrix approach via canvas-like transforms) ───────
// Since we're using expo-image-manipulator (no native filter support),
// we represent filters as metadata for the UI layer and apply brightness/contrast
// via manipulator where possible. The filter is rendered via ColorMatrix on the
// Image component in the React Native layer using inline styles.
export function getFilterMatrix(filter: FilterType): number[] | null {
  switch (filter) {
    case 'grayscale':
      // Luminosity grayscale matrix
      return [
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0,      0,      0,      1, 0,
      ];
    case 'sepia':
      return [
        0.393, 0.769, 0.189, 0, 0,
        0.349, 0.686, 0.168, 0, 0,
        0.272, 0.534, 0.131, 0, 0,
        0,     0,     0,     1, 0,
      ];
    case 'warm':
      return [
        1.2, 0,   0,   0, 0.05,
        0,   1.0, 0,   0, 0,
        0,   0,   0.8, 0, -0.05,
        0,   0,   0,   1, 0,
      ];
    case 'cool':
      return [
        0.8, 0,   0,   0, -0.05,
        0,   1.0, 0,   0, 0,
        0,   0,   1.2, 0, 0.05,
        0,   0,   0,   1, 0,
      ];
    case 'vivid':
      return [
        1.3, 0,   0,   0, 0,
        0,   1.3, 0,   0, 0,
        0,   0,   1.3, 0, 0,
        0,   0,   0,   1, 0,
      ];
    case 'vintage':
      return [
        0.9,  0.05, 0.05, 0, 0.05,
        0.05, 0.8,  0.05, 0, 0.02,
        0,    0.05, 0.7,  0, -0.02,
        0,    0,    0,    1, 0,
      ];
    case 'none':
    default:
      return null;
  }
}

// ─── Build CSS filter string for React Native ──────────────────────────────
// Combines preset filters with user color adjustments into a CSS filter string.
export function getFilterStyle(
  filter: FilterType,
  adjustments: ColorAdjustments
): object {
  const { brightness, contrast, saturation } = adjustments;

  // Convert slider values to CSS filter percentages
  const b = 100 + brightness;  // -100 to 100 → 0 to 200
  const c = 100 + contrast;
  const s = 100 + saturation;

  // Build filter string from adjustments
  const filterParts: string[] = [
    `brightness(${b}%)`,
    `contrast(${c}%)`,
    `saturate(${s}%)`,
  ];

  // Add filter-specific operations
  switch (filter) {
    case 'grayscale':
      filterParts.push('grayscale(1)');
      break;
    case 'sepia':
      filterParts.push('sepia(0.8)');
      break;
    case 'warm':
      filterParts.push('sepia(0.3)', 'saturate(140%)');
      break;
    case 'cool':
      filterParts.push('hue-rotate(180deg)', 'saturate(80%)');
      break;
    case 'vivid':
      filterParts.push('saturate(200%)', 'contrast(110%)');
      break;
    case 'vintage':
      filterParts.push('sepia(0.4)', 'contrast(90%)', 'brightness(90%)');
      break;
  }

  const filterString = filterParts.join(' ');
  return { filter: filterString };
}

// ─── Save to Gallery ─────────────────────────────────────────────────────────
export async function saveToGallery(uri: string): Promise<boolean> {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Please allow access to your photo library in Settings to save images.'
      );
      return false;
    }

    // Copy to documentDirectory first — MediaLibrary on Android cannot reliably
    // access temp files from expo-image-manipulator's cache directory.
    const filename = `ImageEditor_${Date.now()}.jpg`;
    const stableUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.copyAsync({ from: uri, to: stableUri });

    let asset;
    try {
      asset = await MediaLibrary.createAssetAsync(stableUri);
    } finally {
      // Always clean up the temp copy regardless of success or failure
      await FileSystem.deleteAsync(stableUri, { idempotent: true }).catch(() => {});
    }

    // Try to save to "ImageEditor" album
    try {
      const album = await MediaLibrary.getAlbumAsync('ImageEditor');
      if (!album) {
        await MediaLibrary.createAlbumAsync('ImageEditor', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch {
      // Album creation may fail on some devices — asset is saved to general gallery
    }

    return true;
  } catch (error) {
    console.error('Save to gallery error:', error);
    return false;
  }
}

// ─── Share Image ──────────────────────────────────────────────────────────────
export async function shareImage(uri: string): Promise<void> {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) {
    Alert.alert('Sharing not available', 'Sharing is not supported on this device.');
    return;
  }
  await Sharing.shareAsync(uri, {
    mimeType: 'image/jpeg',
    dialogTitle: 'Share your edited image',
  });
}

// ─── Format file size ─────────────────────────────────────────────────────────
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
