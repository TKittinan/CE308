export const COLORS = {
  background: '#0F0F14',
  surface: '#16161E',
  card: '#1E1E2A',
  border: '#2A2A38',
  accent: '#6C63FF',
  accentDark: '#4B44CC',
  accentLight: '#9F99FF',
  text: '#F0F0F8',
  textMuted: '#8A8A9E',
  textFaint: '#3E3E52',
  success: '#4CAF8C',
  error: '#FF6B6B',
  warning: '#FFB347',
} as const;

export const FONTS = {
  regular: 'System',
  semiBold: 'System',
  bold: 'System',
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOW = {
  accent: {
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
} as const;
