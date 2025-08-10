import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ==============================================
// TYPES
// ==============================================

interface ThemeState {
  isDarkMode: boolean;
  language: 'vi' | 'en';
}

interface ThemeActions {
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
  setLanguage: (language: 'vi' | 'en') => void;
  resetTheme: () => void;
}

interface ThemeStore extends ThemeState, ThemeActions {}

// ==============================================
// INITIAL STATE
// ==============================================

const initialState: ThemeState = {
  isDarkMode: false,
  language: 'vi',
};

// ==============================================
// THEME STORE
// ==============================================

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      toggleTheme: () => {
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        }));
      },

      setTheme: (mode) => {
        set({
          isDarkMode: mode === 'dark',
        });
      },

      setLanguage: (language) => {
        set({ language });
      },

      resetTheme: () => {
        set(initialState);
      },
    }),
    {
      name: 'ws-theme-storage', // Storage key
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        language: state.language,
      }),
      version: 1,
      migrate: (persistedState: unknown, version) => {
        // Handle migration if needed in future
        if (version === 0) {
          return {
            ...(persistedState as ThemeState),
            language: 'vi', // Add default language
          };
        }
        return persistedState;
      },
    }
  )
);

// ==============================================
// SELECTORS (Optional - for better performance)
// ==============================================

export const useIsDarkMode = () => useThemeStore((state) => state.isDarkMode);
export const useLanguage = () => useThemeStore((state) => state.language);
export const useThemeActions = () =>
  useThemeStore((state) => ({
    toggleTheme: state.toggleTheme,
    setTheme: state.setTheme,
    setLanguage: state.setLanguage,
    resetTheme: state.resetTheme,
  }));

// ==============================================
// THEME UTILITIES
// ==============================================

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
};

export const applySystemTheme = () => {
  const systemTheme = getSystemTheme();
  useThemeStore.getState().setTheme(systemTheme);
};

// ==============================================
// BROWSER PREFERENCE LISTENER
// ==============================================

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', () => {
    // Optional: Auto-sync with system preference
    // Uncomment if you want automatic theme switching
    // useThemeStore.getState().setTheme(e.matches ? 'dark' : 'light');
  });
}

export default useThemeStore;
