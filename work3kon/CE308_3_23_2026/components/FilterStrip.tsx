import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FilterType } from '../store/imageStore';
import { COLORS } from '../constants/theme';

const STRIP_HEIGHT = 110;
const THUMB_SIZE = 72;

interface FilterOption {
  id: FilterType;
  label: string;
  style: object;
}

const FILTERS: FilterOption[] = [
  { id: 'none',      label: 'Original', style: {} },
  { id: 'grayscale', label: 'B&W',      style: { filter: 'grayscale(1)' } },
  { id: 'sepia',     label: 'Sepia',    style: { filter: 'sepia(0.8)' } },
  { id: 'warm',      label: 'Warm',     style: { filter: 'sepia(0.3) saturate(1.4) brightness(1.05)' } },
  { id: 'cool',      label: 'Cool',     style: { filter: 'hue-rotate(180deg) saturate(0.8) brightness(1.05)' } },
  { id: 'vivid',     label: 'Vivid',    style: { filter: 'saturate(2) contrast(1.1)' } },
  { id: 'vintage',   label: 'Vintage',  style: { filter: 'sepia(0.4) contrast(0.9) brightness(0.9)' } },
];

interface FilterStripProps {
  imageUri: string;
  activeFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

const FilterStrip: React.FC<FilterStripProps> = ({
  imageUri,
  activeFilter,
  onSelectFilter,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterItem, isActive && styles.filterItemActive]}
              onPress={() => onSelectFilter(filter.id)}
              activeOpacity={0.75}
            >
              <View style={[styles.thumbWrapper, isActive && styles.thumbWrapperActive]}>
                <Image
                  source={{ uri: imageUri }}
                  style={[styles.thumb, filter.style as any]}
                  resizeMode="cover"
                />
                {filter.id === 'none' && (
                  <View style={styles.originalBadge}>
                    <Text style={styles.originalBadgeText}>✦</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: STRIP_HEIGHT,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterItem: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  filterItemActive: {},
  thumbWrapper: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbWrapperActive: {
    borderColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  originalBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(108,99,255,0.8)',
    borderRadius: 99,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  originalBadgeText: {
    color: '#fff',
    fontSize: 8,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  labelActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});

export default FilterStrip;
