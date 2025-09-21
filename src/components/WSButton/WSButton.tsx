import { forwardRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { getButtonStyles } from './WSButton.styles';
import { WSButtonProps } from './WSButton.types';
import { useTheme } from '@mui/material/styles';

// CUSTOMIZE: Component WSButton với style đã được tối ưu
const WSButton = forwardRef<HTMLButtonElement, WSButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      startIcon,
      endIcon,
      iconOnly = false,
      loading = false,
      loadingText = 'Loading...',
      fullWidth = false,
      children,
      disabled,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    // Fix: Đơn giản hóa logic render
    const renderContent = () => {
      if (loading) {
        return (
          <>
            <CircularProgress
              size={16}
              color="inherit"
              sx={{ mr: children ? 1 : 0 }}
            />
            {children && !iconOnly && loadingText}
          </>
        );
      }

      if (iconOnly) {
        return startIcon || endIcon;
      }

      return (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      );
    };

    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        sx={{
          ...getButtonStyles(theme, variant, size),
          ...sx,
        }}
        {...props}
      >
        {renderContent()}
      </Button>
    );
  }
);

WSButton.displayName = 'WSButton';

export default WSButton;
