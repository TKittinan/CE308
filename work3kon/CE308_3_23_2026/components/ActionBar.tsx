import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface ActionBarProps {
  onSave: () => void;
  onShare: () => void;
  onReset?: () => void;
  isSaving?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
  onSave,
  onShare,
  onReset,
  isSaving = false,
  isLoading = false,
  disabled = false,
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <View style={styles.container}>
      {/* Reset Button */}
      {onReset && (
        <TouchableOpacity
          style={[styles.secondaryButton, isDisabled && styles.buttonDisabled]}
          onPress={onReset}
          disabled={isDisabled}
          activeOpacity={0.75}
        >
          <Ionicons name="refresh-outline" size={20} color={COLORS.textMuted} />
          <Text style={styles.secondaryLabel}>Reset</Text>
        </TouchableOpacity>
      )}

      {/* Share Button */}
      <TouchableOpacity
        style={[styles.shareButton, isDisabled && styles.buttonDisabled]}
        onPress={onShare}
        disabled={isDisabled}
        activeOpacity={0.75}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'share-outline' : 'share-social-outline'}
          size={20}
          color={COLORS.accent}
        />
        <Text style={styles.shareLabel}>Share</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, isDisabled && styles.buttonDisabled]}
        onPress={onSave}
        disabled={isDisabled || isSaving}
        activeOpacity={0.75}
      >
        {isSaving ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Ionicons name="download-outline" size={20} color="#fff" />
        )}
        <Text style={styles.saveLabel}>{isSaving ? 'Saving…' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 'auto',
  },
  secondaryLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    backgroundColor: 'transparent',
  },
  shareLabel: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  saveLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
});

export default ActionBar;
