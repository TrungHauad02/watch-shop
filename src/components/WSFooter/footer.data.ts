export interface FooterLink {
  label: string;
  path: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// ==================== FOOTER NAVIGATION LINKS ====================

export const footerNavigation = {
  products: {
    title: 'Sản phẩm',
    links: [
      { label: 'Đồng hồ nam', path: '#' },
      { label: 'Đồng hồ nữ', path: '#' },
      { label: 'Đồng hồ unisex', path: '#' },
      { label: 'Đồng hồ thể thao', path: '#' },
      { label: 'Đồng hồ sang trọng', path: '#' },
    ] as FooterLink[],
  },
  support: {
    title: 'Hỗ trợ',
    links: [
      { label: 'Hướng dẫn mua hàng', path: '#' },
      { label: 'Chính sách bảo hành', path: '#' },
      { label: 'Chính sách đổi trả', path: '#' },
      { label: 'Chính sách vận chuyển', path: '#' },
      { label: 'Câu hỏi thường gặp', path: '#' },
    ],
  },
  company: {
    title: 'Công ty',
    links: [
      { label: 'Về chúng tôi', path: '#' },
      { label: 'Liên hệ', path: '#' },
      { label: 'Chính sách bảo mật', path: '#' },
    ],
  },
} as const;

// ==================== COMPANY INFORMATION ====================

export const companyInfo = {
  name: 'Minh Nhật Watch Shop',
  description:
    'Chuyên cung cấp đồng hồ chính hãng, cao cấp với chất lượng tuyệt vời và dịch vụ khách hàng tận tâm. Hơn 10 năm kinh nghiệm trong ngành đồng hồ cao cấp.',
  foundedYear: 2014,
} as const;

// ==================== CONTACT INFORMATION ====================

export const contactData = {
  address: {
    street: '123 Đường ABC',
    district: 'Quận 1',
    city: 'TP.HCM',
    fullAddress: '123 Đường ABC, Quận 1, TP.HCM',
  },
  phone: {
    display: '+84 123 456 789',
    tel: '+84123456789', // For tel: links
  },
  email: {
    display: 'support@watchstore.vn',
    mailto: 'support@watchstore.vn',
  },
  businessHours: {
    display: '8:00 - 22:00 (T2-CN)',
    weekdays: '8:00 - 22:00',
    weekend: '8:00 - 22:00',
  },
} as const;

// ==================== SOCIAL MEDIA LINKS ====================

export const socialMedia = {
  facebook: {
    name: 'Facebook',
    url: '#',
    username: '@watchstore',
  },
  instagram: {
    name: 'Instagram',
    url: '#',
    username: '@watchstore',
  },
  youtube: {
    name: 'YouTube',
    url: '#',
    username: '@watchstore',
  },
  twitter: {
    name: 'Twitter',
    url: '#',
    username: '@watchstore',
  },
} as const;

// ==================== FOOTER BOTTOM LINKS ====================

export const footerBottomLinks = [
  { label: 'Chính sách bảo mật', path: '#' },
  { label: 'Điều khoản sử dụng', path: '#' },
] as const;

// ==================== FOOTER LAYOUT CONFIGURATION ====================

export const footerConfig = {
  // Grid breakpoints cho layout
  layout: {
    companyInfo: { xs: 12, md: 6, lg: 4 },
    products: { xs: 12, sm: 6, md: 2 },
    support: { xs: 12, sm: 6, md: 2 },
    company: { xs: 12, sm: 6, md: 2 },
    contact: { xs: 12, sm: 6, md: 12, lg: 2 },
  },
  // Spacing và padding
  spacing: {
    main: 8, // py: 8 cho main content
    bottom: 4, // py: 4 cho bottom section
    grid: 4, // spacing: 4 cho Grid container
  },
  // Features toggles
  features: {
    showSocialLinks: true,
    showContactInfo: true,
    showCompanyDescription: true,
    enableSmoothScroll: true, // Cho scroll to top functionality
  },
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Get formatted contact information for display
 */
export const getFormattedContact = () => ({
  address: contactData.address.fullAddress,
  phone: contactData.phone.display,
  email: contactData.email.display,
  hours: contactData.businessHours.display,
});

/**
 * Get all social media links as array
 */
export const getSocialMediaLinks = () => [
  socialMedia.facebook,
  socialMedia.instagram,
  socialMedia.youtube,
  socialMedia.twitter,
];

/**
 * Get footer navigation sections as array
 */
export const getFooterSections = () => [
  footerNavigation.products,
  footerNavigation.support,
  footerNavigation.company,
];

export default {
  footerNavigation,
  companyInfo,
  contactData,
  socialMedia,
  footerBottomLinks,
  footerConfig,
  getFormattedContact,
  getSocialMediaLinks,
  getFooterSections,
};
