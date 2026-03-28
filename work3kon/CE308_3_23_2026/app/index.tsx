import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useImageStore } from '../store/imageStore';
import { COLORS, RADIUS, SHADOW } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const PREVIEW_SIZE = SCREEN_W - 48;

const TIPS = [
  { icon: '✂️', title: 'Crop & Rotate', desc: 'Precise cropping and rotation tools' },
  { icon: '🎨', title: '6 Filters', desc: 'B&W, Sepia, Warm, Cool, Vivid, Vintage' },
  { icon: '🎛️', title: 'Color Adjust', desc: 'Brightness, Contrast, Saturation sliders' },
  { icon: '💾', title: 'Save & Share', desc: 'Export to gallery or share directly' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { setOriginalUri, resetEditor, originalUri } = useImageStore();
  const [loading, setLoading] = useState(false);
  const [recentImage, setRecentImage] = useState<string | null>(null);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to pick images.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const handlePickImage = useCallback(async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        exif: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        resetEditor();
        setOriginalUri(asset.uri);
        setRecentImage(asset.uri);
        router.push('/editor');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to open image picker.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [resetEditor, setOriginalUri, router]);

  const handleContinueEditing = useCallback(() => {
    if (originalUri) {
      router.push('/editor');
    }
  }, [originalUri, router]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <View style={styles.logoInner}>
            <Text style={styles.logoEmoji}>✦</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Image Editor</Text>
        <Text style={styles.heroSubtitle}>
          Professional-grade editing{'\n'}in your pocket
        </Text>
      </View>

      {/* Recent Image Preview (if any) */}
      {recentImage && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <TouchableOpacity
            style={styles.recentImageCard}
            onPress={handleContinueEditing}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: recentImage }}
              style={styles.recentImagePreview}
              resizeMode="cover"
            />
            <View style={styles.recentOverlay}>
              <View style={styles.recentChip}>
                <Ionicons name="pencil" size={12} color="#fff" />
                <Text style={styles.recentChipText}>Continue Editing</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* CTA Button */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={[styles.pickButton, loading && styles.pickButtonDisabled]}
          onPress={handlePickImage}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="images-outline" size={22} color="#fff" />
          )}
          <Text style={styles.pickButtonText}>
            {loading ? 'Opening...' : 'Pick from Gallery'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Supports JPEG, PNG, HEIC, WebP</Text>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureGrid}>
          {TIPS.map((tip, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{tip.icon}</Text>
              <Text style={styles.featureTitle}>{tip.title}</Text>
              <Text style={styles.featureDesc}>{tip.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Built with Expo SDK 52 · TypeScript</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    paddingBottom: 60,
    gap: 32,
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingTop: 20,
    gap: 12,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.accent,
  },
  logoInner: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 26,
    color: '#fff',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Recent
  recentSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  recentImageCard: {
    width: '100%',
    height: 200,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recentImagePreview: {
    width: '100%',
    height: '100%',
  },
  recentOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
  },
  recentChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // CTA
  ctaSection: {
    alignItems: 'center',
    gap: 12,
  },
  pickButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    ...SHADOW.accent,
  },
  pickButtonDisabled: {
    opacity: 0.6,
  },
  pickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  orText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },

  // Features
  featuresSection: {
    gap: 12,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: (SCREEN_W - 60) / 2,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  featureDesc: {
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },

  footer: {
    textAlign: 'center',
    color: COLORS.textFaint,
    fontSize: 11,
  },
});
