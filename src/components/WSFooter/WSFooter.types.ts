import { SxProps, Theme } from '@mui/material/styles';

export interface WSFooterProps {
  /** Additional styles */
  sx?: SxProps<Theme>;
}

export interface FooterLink {
  label: string;
  path: string;
}

export interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string;
}
