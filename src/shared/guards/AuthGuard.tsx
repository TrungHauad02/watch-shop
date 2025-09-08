import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuthStore, useAuth } from '@/shared/store/authStore';
import { RoleEnum } from '@/shared/types/common.types';
import { ROUTES } from '@/shared/constants/app.constants';
import tokenManager from '@/shared/utils/tokenManager';

// ==============================================
// TYPES
// ==============================================

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: RoleEnum;
  requiredPermissions?: string[];
  fallbackPath?: string | undefined;
  loadingComponent?: React.ReactNode;
}

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: RoleEnum[];
  fallbackPath?: string | undefined;
  showFallback?: boolean;
  fallbackComponent?: React.ReactNode;
}

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean; // true = AND logic, false = OR logic
  fallbackComponent?: React.ReactNode;
}

// ==============================================
// LOADING COMPONENT
// ==============================================

const DefaultLoadingComponent: React.FC<{ message?: string }> = ({
  message = 'Đang kiểm tra quyền truy cập...',
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="200px"
    gap={2}
  >
    <CircularProgress size={40} />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

// ==============================================
// MAIN AUTH GUARD
// ==============================================

/**
 * Main authentication guard component
 * CUSTOMIZE: Bạn có thể thay đổi logic authentication check ở đây
 */
export default function AuthGuard({
  children,
  requireAuth = true,
  requiredRole,
  requiredPermissions,
  fallbackPath,
  loadingComponent,
}: AuthGuardProps): React.JSX.Element {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { checkAuthStatus, hasRole, hasPermission } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize auth status on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we need to initialize auth
        if (!useAuthStore.getState().isInitialized) {
          await checkAuthStatus();
        }

        // Validate current token if authenticated
        if (isAuthenticated) {
          const tokenStatus = tokenManager.getTokenStatus();

          // Auto-refresh if needed
          if (tokenStatus.needsRefresh) {
            try {
              await tokenManager.refreshAccessToken();
            } catch (error) {
              console.error('❌ Auto-refresh failed:', error);
              // Let the user continue, token might still be valid
            }
          }
        }
      } catch (error) {
        console.error('❌ Auth initialization failed:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [checkAuthStatus, isAuthenticated]);

  // Show loading while initializing or loading
  if (isInitializing || isLoading) {
    return <>{loadingComponent || <DefaultLoadingComponent />}</>;
  }

  // If auth is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Check authentication
  if (!isAuthenticated || !user) {
    const loginPath = fallbackPath || ROUTES.LOGIN;
    return (
      <Navigate to={loginPath} state={{ from: location.pathname }} replace />
    );
  }

  // Check role requirement
  if (requiredRole && !hasRole(requiredRole)) {
    const unauthorizedPath = fallbackPath || ROUTES.UNAUTHORIZED;
    return (
      <Navigate
        to={unauthorizedPath}
        state={{ from: location.pathname, requiredRole }}
        replace
      />
    );
  }

  // Check permissions requirement
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((permission) =>
      hasPermission(permission)
    );

    if (!hasAllPermissions) {
      const unauthorizedPath = fallbackPath || ROUTES.UNAUTHORIZED;
      return (
        <Navigate
          to={unauthorizedPath}
          state={{ from: location.pathname, requiredPermissions }}
          replace
        />
      );
    }
  }

  // All checks passed, render children
  return <>{children}</>;
}

// ==============================================
// ROLE GUARD
// ==============================================

/**
 * Role-based access control guard
 * CUSTOMIZE: Bạn có thể thay đổi logic role check ở đây
 */
export function RoleGuard({
  children,
  allowedRoles,
  fallbackPath,
  showFallback = true,
  fallbackComponent,
}: RoleGuardProps): React.JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
    );
  }

  // Check if user has allowed role
  const hasAllowedRole = allowedRoles.includes(user.role);

  if (!hasAllowedRole) {
    if (showFallback) {
      if (fallbackComponent) {
        return <>{fallbackComponent}</>;
      }

      if (fallbackPath) {
        return (
          <Navigate
            to={fallbackPath}
            state={{ from: location.pathname, allowedRoles }}
            replace
          />
        );
      }

      // Default unauthorized message
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          textAlign="center"
          p={3}
        >
          <Typography variant="h5" gutterBottom>
            Không có quyền truy cập
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bạn không có quyền truy cập vào trang này.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Vai trò yêu cầu: {allowedRoles.join(', ')}
          </Typography>
        </Box>
      );
    }

    // Don't render anything
    return <></>;
  }

  return <>{children}</>;
}

// ==============================================
// PERMISSION GUARD
// ==============================================

/**
 * Permission-based access control guard
 * CUSTOMIZE: Bạn có thể thay đổi logic permission check ở đây
 */
export function PermissionGuard({
  children,
  requiredPermissions,
  requireAll = true,
  fallbackComponent,
}: PermissionGuardProps): React.JSX.Element {
  const { hasPermission } = useAuthStore();

  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  // Check permissions
  const hasPermissions = requireAll
    ? requiredPermissions.every((permission) => hasPermission(permission))
    : requiredPermissions.some((permission) => hasPermission(permission));

  if (!hasPermissions) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    // Don't render anything by default
    return <></>;
  }

  return <>{children}</>;
}

// ==============================================
// ADMIN GUARD
// ==============================================

/**
 * Admin-only access guard
 * CUSTOMIZE: Bạn có thể thay đổi logic admin check ở đây
 */
export function AdminGuard({
  children,
  fallbackPath,
  fallbackComponent,
}: {
  children: React.ReactNode;
  fallbackPath?: string;
  fallbackComponent?: React.ReactNode;
}): React.JSX.Element {
  return (
    <RoleGuard
      allowedRoles={[RoleEnum.ADMIN]}
      fallbackPath={fallbackPath || ROUTES.UNAUTHORIZED}
      fallbackComponent={fallbackComponent}
    >
      {children}
    </RoleGuard>
  );
}

// ==============================================
// MANAGER GUARD
// ==============================================

/**
 * Manager and Admin access guard
 * CUSTOMIZE: Bạn có thể thay đổi logic manager check ở đây
 */
export function ManagerGuard({
  children,
  fallbackPath,
  fallbackComponent,
}: {
  children: React.ReactNode;
  fallbackPath?: string;
  fallbackComponent?: React.ReactNode;
}): React.JSX.Element {
  return (
    <RoleGuard
      allowedRoles={[RoleEnum.MANAGER, RoleEnum.ADMIN]}
      fallbackPath={fallbackPath || ROUTES.UNAUTHORIZED}
      fallbackComponent={fallbackComponent}
    >
      {children}
    </RoleGuard>
  );
}

// ==============================================
// TOKEN EXPIRY GUARD
// ==============================================

/**
 * Guard that checks for token expiry and shows warnings
 * CUSTOMIZE: Bạn có thể thay đổi logic token expiry warning ở đây
 */
export function TokenExpiryGuard({
  children,
  warningMinutes = 5,
  showWarning = true,
}: {
  children: React.ReactNode;
  warningMinutes?: number;
  showWarning?: boolean;
}): React.JSX.Element {
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowExpiryWarning(false);
      return;
    }

    const checkTokenExpiry = () => {
      const tokenStatus = tokenManager.getTokenStatus();
      const warningThreshold = warningMinutes * 60 * 1000;

      if (
        tokenStatus.timeUntilExpiry <= warningThreshold &&
        tokenStatus.timeUntilExpiry > 0
      ) {
        setShowExpiryWarning(true);
      } else {
        setShowExpiryWarning(false);
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, warningMinutes]);

  const handleExtendSession = async () => {
    try {
      await tokenManager.manualRefreshToken();
      setShowExpiryWarning(false);
    } catch (error) {
      console.error('❌ Failed to extend session:', error);
      // Let auth store handle the error
    }
  };

  return (
    <>
      {children}

      {/* Token expiry warning */}
      {showWarning && showExpiryWarning && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bgcolor="warning.main"
          color="warning.contrastText"
          p={1}
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            boxShadow: 2,
            // CUSTOMIZE: Bạn có thể thay đổi style của warning banner ở đây
          }}
        >
          <Typography variant="body2">
            ⚠️ Phiên đăng nhập sắp hết hạn. Bạn có muốn gia hạn?
          </Typography>
          <Box>
            <button
              onClick={handleExtendSession}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid currentColor',
                color: 'inherit',
                padding: '4px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '8px',
                // CUSTOMIZE: Bạn có thể thay đổi style button ở đây
              }}
            >
              Gia hạn
            </button>
            <button
              onClick={() => setShowExpiryWarning(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              ✕
            </button>
          </Box>
        </Box>
      )}
    </>
  );
}

// ==============================================
// COMPOSITE GUARDS
// ==============================================

/**
 * Combined auth and role guard
 */
export function AuthRoleGuard({
  children,
  allowedRoles,
  fallbackPath,
  loadingComponent,
}: {
  children: React.ReactNode;
  allowedRoles: RoleEnum[];
  fallbackPath?: string;
  loadingComponent?: React.ReactNode;
}): React.JSX.Element {
  return (
    <AuthGuard
      requireAuth={true}
      fallbackPath={fallbackPath}
      loadingComponent={loadingComponent}
    >
      <RoleGuard allowedRoles={allowedRoles} fallbackPath={fallbackPath}>
        {children}
      </RoleGuard>
    </AuthGuard>
  );
}

/**
 * Combined auth and permission guard
 */
export function AuthPermissionGuard({
  children,
  requiredPermissions,
  requireAll = true,
  fallbackPath,
  loadingComponent,
}: {
  children: React.ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean;
  fallbackPath?: string;
  loadingComponent?: React.ReactNode;
}): React.JSX.Element {
  return (
    <AuthGuard
      requireAuth={true}
      requiredPermissions={requiredPermissions}
      fallbackPath={fallbackPath}
      loadingComponent={loadingComponent}
    >
      <PermissionGuard
        requiredPermissions={requiredPermissions}
        requireAll={requireAll}
      >
        {children}
      </PermissionGuard>
    </AuthGuard>
  );
}

// ==============================================
// UTILITY COMPONENTS
// ==============================================

/**
 * Show content only if user is authenticated
 */
export function IfAuthenticated({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}): React.JSX.Element {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}

/**
 * Show content only if user has specific role
 */
export function IfRole({
  children,
  roles,
  fallback,
}: {
  children: React.ReactNode;
  roles: RoleEnum | RoleEnum[];
  fallback?: React.ReactNode;
}): React.JSX.Element {
  const { user } = useAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}

/**
 * Show content only if user has permission
 */
export function IfPermission({
  children,
  permissions,
  requireAll = true,
  fallback,
}: {
  children: React.ReactNode;
  permissions: string | string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
}): React.JSX.Element {
  const { hasPermission } = useAuthStore();
  const requiredPermissions = Array.isArray(permissions)
    ? permissions
    : [permissions];

  const hasRequiredPermissions = requireAll
    ? requiredPermissions.every((permission) => hasPermission(permission))
    : requiredPermissions.some((permission) => hasPermission(permission));

  if (hasRequiredPermissions) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}
