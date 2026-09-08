import type { Locale } from "@/lib/i18n/locale";

export type CreatorCopy = {
  home: string;
  profile: string;
  opportunities: string;
  collabs: string;
  analytics: string;
  community: string;
  earnings: string;
  messages: string;
  integrations: string;
  availableBalance: string;
  signOut: string;
  settings: string;
  bookACall: string;
  getStarted: string;
  getStartedBody: string;
  comingSoon: string;
};

const en: CreatorCopy = {
  home: "Home",
  profile: "Profile",
  opportunities: "Opportunities",
  collabs: "Collabs",
  analytics: "Analytics",
  community: "Community",
  earnings: "Earnings",
  messages: "Messages",
  integrations: "Integrations",
  availableBalance: "Available balance",
  signOut: "Sign out",
  settings: "Settings",
  bookACall: "Book a call",
  getStarted: "Get started",
  getStartedBody: "Complete your profile",
  comingSoon: "This page is coming soon.",
};

const fr: CreatorCopy = {
  home: "Accueil",
  profile: "Profil",
  opportunities: "Opportunités",
  collabs: "Collabs",
  analytics: "Analytique",
  community: "Communauté",
  earnings: "Gains",
  messages: "Messages",
  integrations: "Intégrations",
  availableBalance: "Solde disponible",
  signOut: "Déconnexion",
  settings: "Paramètres",
  bookACall: "Réserver un appel",
  getStarted: "Démarrer",
  getStartedBody: "Compléter votre profil",
  comingSoon: "Cette page arrive bientôt.",
};

export const creatorCopy: Record<Locale, CreatorCopy> = { en, fr };
