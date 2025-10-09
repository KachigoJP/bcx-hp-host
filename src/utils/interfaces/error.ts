export interface ErrorContent {
  mainTitle: string;
  subtitle: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
  quickLinksTitle: string;
  quickLinks: QuickLink[];
}

export interface QuickLink {
  title: string;
  link: string;
  icon?: string;
}
