import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';

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
// THEME STORE - OPTIMIZED
// ==============================================

export const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        ...initialState,

        // Actions - Optimized to prevent unnecessary re-renders
        toggleTheme: () => {
          const currentMode = get().isDarkMode;
          set({ isDarkMode: !currentMode });
        },

        setTheme: (mode) => {
          const currentMode = get().isDarkMode;
          const newMode = mode === 'dark';

          // Only update if different
          if (currentMode !== newMode) {
            set({ isDarkMode: newMode });
          }
        },

        setLanguage: (language) => {
          const currentLanguage = get().language;

          // Only update if different
          if (currentLanguage !== language) {
            set({ language });
          }
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
        // Optimize storage writes
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            try {
              return JSON.parse(str);
            } catch {
              return null;
            }
          },
          setItem: (name, value) => {
            try {
              localStorage.setItem(name, JSON.stringify(value));
            } catch (error) {
              console.warn('Failed to save theme to localStorage:', error);
            }
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    )
  )
);

// ==============================================
// OPTIMIZED SELECTORS - Prevent unnecessary re-renders
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

// Stable reference selectors for better performance
export const useStableThemeActions = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setLanguage = useThemeStore((state) => state.setLanguage);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  return { toggleTheme, setTheme, setLanguage, resetTheme };
};

// ==============================================
// THEME UTILITIES - CACHED
// ==============================================

let cachedSystemTheme: 'light' | 'dark' | null = null;
let lastCheck = 0;
const CACHE_DURATION = 1000; // 1 second cache

export const getSystemTheme = (): 'light' | 'dark' => {
  const now = Date.now();

  // Return cached value if within cache duration
  if (cachedSystemTheme && now - lastCheck < CACHE_DURATION) {
    return cachedSystemTheme;
  }

  if (typeof window !== 'undefined') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    cachedSystemTheme = isDark ? 'dark' : 'light';
    lastCheck = now;
    return cachedSystemTheme;
  }

  return 'light';
};

export const applySystemTheme = () => {
  const systemTheme = getSystemTheme();
  const { setTheme } = useThemeStore.getState();
  setTheme(systemTheme);
};

// ==============================================
// BROWSER PREFERENCE LISTENER - OPTIMIZED
// ==============================================

let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;
let isListenerSetup = false;

export const setupSystemThemeListener = () => {
  if (typeof window === 'undefined' || isListenerSetup) return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQueryListener = (e: MediaQueryListEvent) => {
    // Clear cache when system theme changes
    cachedSystemTheme = null;

    // Optional: Auto-sync with system preference
    // Uncomment if you want automatic theme switching
    // const { setTheme } = useThemeStore.getState();
    // setTheme(e.matches ? 'dark' : 'light');

    if (process.env.NODE_ENV === 'development') {
      console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    }
  };

  mediaQuery.addEventListener('change', mediaQueryListener);
  isListenerSetup = true;
};

export const cleanupSystemThemeListener = () => {
  if (typeof window === 'undefined' || !mediaQueryListener) return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.removeEventListener('change', mediaQueryListener);
  mediaQueryListener = null;
  isListenerSetup = false;
};

// Setup listener when module loads
if (typeof window !== 'undefined') {
  setupSystemThemeListener();
}

// ==============================================
// THEME SUBSCRIPTION HELPERS
// ==============================================

export const subscribeToThemeChanges = (
  callback: (isDarkMode: boolean) => void
) => {
  return useThemeStore.subscribe((state) => state.isDarkMode, callback, {
    equalityFn: (a, b) => a === b, // Only fire if actually changed
    fireImmediately: false, // Don't fire on subscription
  });
};

export const subscribeToLanguageChanges = (
  callback: (language: 'vi' | 'en') => void
) => {
  return useThemeStore.subscribe((state) => state.language, callback, {
    equalityFn: (a, b) => a === b, // Only fire if actually changed
    fireImmediately: false, // Don't fire on subscription
  });
};

// ==============================================
// THEME STATE GETTERS - For external usage
// ==============================================

export const getCurrentTheme = () => {
  const { isDarkMode } = useThemeStore.getState();
  return isDarkMode ? 'dark' : 'light';
};

export const getCurrentLanguage = () => {
  const { language } = useThemeStore.getState();
  return language;
};

// ==============================================
// DEVTOOLS INTEGRATION
// ==============================================

if (process.env.NODE_ENV === 'development') {
  // Add theme store to window for debugging
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__THEME_STORE__ = useThemeStore;
  }
}

export default useThemeStore;
