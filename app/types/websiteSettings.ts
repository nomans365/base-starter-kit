export interface HeaderSettings {
  websiteLogo: string | null;
  mobileLogo: string | null;
  getAppLink: string;
}

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
}

export interface FooterSettings {
  websiteLogo: string | null;
  mobileLogo: string | null;
  socialLinks: SocialMediaLink[];
  copyrightText: string;
}

export interface WebsiteSettings {
  header: HeaderSettings;
  footer: FooterSettings;
}

export interface SettingsFeedback {
  variant: "success" | "warning" | "destructive";
  message: string;
}
