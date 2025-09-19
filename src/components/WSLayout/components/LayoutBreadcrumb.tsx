import { BRAND_COLORS } from '@/styles/colors';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string | undefined;
  isActive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface LayoutBreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  maxItems?: number;
  separator?: React.ReactNode;
}

export default function LayoutBreadcrumb({
  items,
  showHomeIcon = true,
  maxItems = 8,
  separator = <NavigateNextIcon fontSize="small" />,
}: LayoutBreadcrumbProps) {
  const navigate = useNavigate();

  const handleClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 2, sm: 3 },
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        // CUSTOMIZE: Chỉnh sửa style của breadcrumb container ở đây
      }}
    >
      <Breadcrumbs
        maxItems={maxItems}
        separator={separator}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'text.secondary',
            mx: 0.5,
          },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast || item.isActive) {
            return (
              <Typography
                key={`${item.path || index}-${item.label}`}
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  // CUSTOMIZE: Chỉnh sửa style của breadcrumb item active ở đây
                  color: BRAND_COLORS.accent,
                  fontWeight: 600,
                }}
              >
                {showHomeIcon && index === 0 && <HomeIcon fontSize="small" />}
                {item.icon && index > 0 && item.icon}
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={`${item.path || index}-${item.label}`}
              component="button"
              variant="body2"
              onClick={() => handleClick(item)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                // CUSTOMIZE: Chỉnh sửa style của breadcrumb link ở đây
                color: 'text.secondary',
                '&:hover': {
                  color: BRAND_COLORS.accent,
                  textDecoration: 'underline',
                },
                transition: 'color 0.2s ease',
              }}
            >
              {showHomeIcon && index === 0 && <HomeIcon fontSize="small" />}
              {item.icon && index > 0 && item.icon}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
