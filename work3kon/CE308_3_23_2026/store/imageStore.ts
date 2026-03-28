import { create } from 'zustand';

export type FilterType =
  | 'none'
  | 'grayscale'
  | 'sepia'
  | 'warm'
  | 'cool'
  | 'vivid'
  | 'vintage';

export interface ColorAdjustments {
  brightness: number; // -100 to 100
  contrast: number;   // -100 to 100
  saturation: number; // -100 to 100
}

export interface ImageState {
  // Original image selected from gallery
  originalUri: string | null;
  // Current working URI (after manipulations)
  currentUri: string | null;
  // URI after editor transforms (crop/rotate/resize) — before filter
  editedUri: string | null;

  // Editor state
  rotation: number; // 0 | 90 | 180 | 270
  flipHorizontal: boolean;

  // Filter state
  activeFilter: FilterType;
  colorAdjustments: ColorAdjustments;

  // UI state
  isLoading: boolean;
  isSaving: boolean;

  // Actions
  setOriginalUri: (uri: string) => void;
  setCurrentUri: (uri: string) => void;
  setEditedUri: (uri: string) => void;
  setRotation: (rotation: number) => void;
  setFlipHorizontal: (flip: boolean) => void;
  setActiveFilter: (filter: FilterType) => void;
  setColorAdjustments: (adjustments: Partial<ColorAdjustments>) => void;
  setIsLoading: (loading: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  resetEditor: () => void;
}

const defaultColorAdjustments: ColorAdjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
};

export const useImageStore = create<ImageState>((set) => ({
  originalUri: null,
  currentUri: null,
  editedUri: null,

  rotation: 0,
  flipHorizontal: false,

  activeFilter: 'none',
  colorAdjustments: { ...defaultColorAdjustments },

  isLoading: false,
  isSaving: false,

  setOriginalUri: (uri) => set({ originalUri: uri, currentUri: uri }),
  setCurrentUri: (uri) => set({ currentUri: uri }),
  setEditedUri: (uri) => set({ editedUri: uri, currentUri: uri }),
  setRotation: (rotation) => set({ rotation }),
  setFlipHorizontal: (flip) => set({ flipHorizontal: flip }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setColorAdjustments: (adjustments) =>
    set((state) => ({
      colorAdjustments: { ...state.colorAdjustments, ...adjustments },
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  resetEditor: () =>
    set({
      originalUri: null,
      currentUri: null,
      editedUri: null,
      rotation: 0,
      flipHorizontal: false,
      activeFilter: 'none',
      colorAdjustments: { ...defaultColorAdjustments },
      isLoading: false,
      isSaving: false,
    }),
}));
