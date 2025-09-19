import { BRAND_COLORS } from '@/styles/colors';
import { Typography } from '@mui/material';
import { companyData } from '../header.data';

interface HeaderLogoProps {
  onClick: () => void;
  companyName?: string;
}

export default function HeaderLogo({
  onClick,
  companyName = companyData.name,
}: HeaderLogoProps) {
  return (
    <Typography
      variant="h6"
      component="div"
      onClick={onClick}
      sx={{
        flexGrow: 0,
        mr: 2,
        // CUSTOMIZE: Chỉnh sửa style của logo ở đây
        color: BRAND_COLORS.secondary,
        fontWeight: 'bold',
        fontSize: { xs: '1.2rem', md: '1.5rem' },
        cursor: 'pointer',
        textDecoration: 'none',
        userSelect: 'none',
        '&:hover': {
          opacity: 0.8,
        },
        transition: 'opacity 0.2s ease',
      }}
    >
      {companyName}
    </Typography>
  );
}
