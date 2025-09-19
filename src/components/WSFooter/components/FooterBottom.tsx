import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { footerBottomLinks } from '../footer.data';
import COLORS, { colorUtils } from '@/styles/colors';

interface FooterBottomProps {
  companyName: string;
  copyrightYear: number;
}

export default function FooterBottom({
  companyName,
  copyrightYear,
}: FooterBottomProps) {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: '0.95rem',
          // CUSTOMIZE: Chỉnh sửa style của copyright text ở đây
        }}
      >
        © {copyrightYear} {companyName}. Tất cả quyền được bảo lưu.
      </Typography>

      {/* Bottom Links */}
      <Stack
        direction="row"
        spacing={3}
        sx={{
          '& button': {
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            // CUSTOMIZE: Chỉnh sửa hiệu ứng hover của bottom links ở đây
            '&:hover': {
              color: COLORS.accent,
              backgroundColor: colorUtils.hexToRgba(COLORS.accent, 0.1),
            },
            '&:focus-visible': {
              outline: `2px solid ${COLORS.accent}`,
              outlineOffset: '2px',
            },
          },
        }}
      >
        {footerBottomLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => handleLinkClick(link.path)}
            aria-label={link.label}
          >
            {link.label}
          </button>
        ))}
      </Stack>
    </Box>
  );
}
