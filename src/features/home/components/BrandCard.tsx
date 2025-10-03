import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BrandDTO } from '@/shared/types';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';

interface BrandCardProps {
  brand: BrandDTO;
  onClick?: () => void;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa style của brand card tại đây
export default function BrandCard({ brand, onClick }: BrandCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2.5,
        p: { xs: 3, sm: 3.5, md: 4 },
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: { xs: 160, sm: 180, md: 200 },
        borderRadius: '16px',
        background: COLORS.gray50,
        border: `2px solid ${isHovered ? COLORS.gold500 : 'transparent'}`,

        '&:hover': {
          background: COLORS.white,
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 32px ${ALPHA_COLORS.blackAlpha12}`,
        },

        // Corner accent
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: isHovered ? 60 : 0,
          height: isHovered ? 60 : 0,
          background: `linear-gradient(135deg, ${COLORS.gold500}15, transparent)`,
          borderRadius: '0 14px 0 100%',
          transition: 'all 0.3s ease',
        },
      }}
    >
      {/* Brand Logo Container */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 70, sm: 85, md: 100 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: 2,
        }}
      >
        <Box
          component="img"
          src={brand.image}
          alt={brand.name}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'none' : 'grayscale(40%) brightness(0.95)',
            opacity: isHovered ? 1 : 0.75,
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
      </Box>

      {/* Brand Name */}
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pt: 1,
          borderTop: `2px solid ${isHovered ? COLORS.gold400 : COLORS.gray200}`,
          transition: 'border-color 0.3s ease',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            color: isHovered ? COLORS.gold700 : COLORS.gray800,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}
        >
          {brand.name}
        </Typography>
      </Box>
    </Box>
  );
}
