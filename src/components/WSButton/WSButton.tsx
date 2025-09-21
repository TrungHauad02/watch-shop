import { Button, CircularProgress } from '@mui/material';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { WSButtonProps } from './WSButton.types';
import { getButtonStyles } from './WSButton.styles';

const WSButton = forwardRef<HTMLButtonElement, WSButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      startIcon,
      endIcon,
      iconOnly = false,
      loading = false,
      loadingText,
      fullWidth = false,
      disabled = false,
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    // CUSTOMIZE: Bạn có thể chỉnh sửa logic loading và disabled tại đây
    const isDisabled = disabled || loading;

    // CUSTOMIZE: Bạn có thể chỉnh sửa size của loading spinner tại đây
    const spinnerSize = {
      small: 16,
      medium: 18,
      large: 20,
    }[size];

    const buttonStyles = getButtonStyles(theme, variant, size);

    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        fullWidth={fullWidth}
        startIcon={
          loading ? (
            <CircularProgress
              size={spinnerSize}
              color="inherit"
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của loading spinner tại đây
            />
          ) : (
            startIcon
          )
        }
        endIcon={!loading ? endIcon : undefined}
        sx={{
          ...buttonStyles,
          // Icon only button
          ...(iconOnly && {
            minWidth: buttonStyles.minHeight,
            padding: 0,
            aspectRatio: '1',
          }),
          // Custom sx override
          ...sx,
        }}
        {...props}
      >
        {/* Content */}
        {iconOnly
          ? startIcon || endIcon || children
          : loading && loadingText
            ? loadingText
            : children}
      </Button>
    );
  }
);

WSButton.displayName = 'WSButton';

export default WSButton;
