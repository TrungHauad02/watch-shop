import COLORS, { colorUtils, GRADIENT_COLORS } from '@/styles/colors';
import { Box, Container, Grid, SxProps, Theme, Divider } from '@mui/material';
import {
  FooterCompanyInfo,
  FooterLinkSection,
  FooterContactInfo,
  FooterBottom,
} from './components';
import {
  footerNavigation,
  companyInfo,
  footerConfig,
  contactData,
} from './footer.data';
import { Email, Phone, LocationOn, Schedule } from '@mui/icons-material';

interface WSFooterProps {
  sx?: SxProps<Theme>;
  // CUSTOMIZE: Cho phép override các props cho từng section
  companyProps?: {
    companyName?: string;
    description?: string;
    showSocialLinks?: boolean;
  };
  contactProps?: {
    showContactInfo?: boolean;
  };
  bottomProps?: {
    companyName?: string;
    copyrightYear?: number;
  };
}

export default function WSFooter({
  sx,
  companyProps,
  contactProps,
  bottomProps,
}: WSFooterProps) {
  // ==================== CONTACT INFO DATA ====================
  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Địa chỉ',
      content: contactData.address.fullAddress,
    },
    {
      icon: <Phone />,
      title: 'Hotline',
      content: contactData.phone.display,
    },
    {
      icon: <Email />,
      title: 'Email',
      content: contactData.email.display,
    },
    {
      icon: <Schedule />,
      title: 'Giờ làm việc',
      content: contactData.businessHours.display,
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: COLORS.gray800,
        borderTop: `3px solid ${GRADIENT_COLORS.secondaryGradient}`,
        mt: 'auto',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 -4px 20px ${colorUtils.hexToRgba(COLORS.primary, 0.08)}`,
        ...sx,
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main footer content */}
        <Box sx={{ py: footerConfig.spacing.main }}>
          <Grid container spacing={footerConfig.spacing.grid}>
            {/* Company Information Section */}
            <Grid size={footerConfig.layout.companyInfo}>
              <FooterCompanyInfo
                companyName={companyProps?.companyName || companyInfo.name}
                description={
                  companyProps?.description || companyInfo.description
                }
                showSocialLinks={companyProps?.showSocialLinks ?? true}
              />
            </Grid>

            {/* Products Links Section */}
            <Grid size={footerConfig.layout.products}>
              <FooterLinkSection
                title={footerNavigation.products.title}
                links={footerNavigation.products.links}
              />
            </Grid>

            {/* Support Links Section */}
            <Grid size={footerConfig.layout.support}>
              <FooterLinkSection
                title={footerNavigation.support.title}
                links={[...footerNavigation.support.links]}
              />
            </Grid>

            {/* Company Links Section */}
            <Grid size={footerConfig.layout.company}>
              <FooterLinkSection
                title={footerNavigation.company.title}
                links={[...footerNavigation.company.links]}
              />
            </Grid>

            {/* Contact Information Section */}
            <Grid size={footerConfig.layout.contact}>
              {(contactProps?.showContactInfo ?? true) && (
                <FooterContactInfo contactInfo={contactInfo} />
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            borderColor: COLORS.borderMedium,
            borderWidth: '1px',
          }}
        />

        {/* Bottom Footer Section */}
        <FooterBottom
          companyName={bottomProps?.companyName || companyInfo.name}
          copyrightYear={bottomProps?.copyrightYear ?? new Date().getFullYear()}
        />
      </Container>
    </Box>
  );
}
