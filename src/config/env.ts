// Environment configuration for WatchStore Frontend

export const ENV = {
  // API Configuration
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'WatchStore',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // Build Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',

  // Authentication
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',

  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_PWA: import.meta.env.VITE_ENABLE_PWA === 'true',

  // Development
  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
} as const;

// Computed environment flags
export const isDevelopment = ENV.NODE_ENV === 'development';
export const isProduction = ENV.NODE_ENV === 'production';
export const isTesting = ENV.NODE_ENV === 'test';

// Validation function to ensure required env vars are set
export const validateEnv = (): void => {
  const requiredEnvVars = ['VITE_API_BASE_URL', 'VITE_APP_NAME'];

  const missingVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};

// Development logging helper
export const devLog = (message: string, ...args: unknown[]): void => {
  if (isDevelopment && ENV.ENABLE_DEVTOOLS) {
    console.log(`[WatchStore] ${message}`, ...args);
  }
};

// Production error logging helper
export const prodError = (message: string, error?: Error): void => {
  if (isProduction) {
    // In production, you might want to send errors to a logging service
    console.error(`[WatchStore Error] ${message}`, error);
  } else {
    console.error(`[WatchStore Error] ${message}`, error);
  }
};
