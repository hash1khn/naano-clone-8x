import type { Locale } from "@/lib/i18n/locale";

export type ChromeCopy = {
  forCompanies: string;
  forCreators: string;
  forAgencies: string;
  howItWorks: string;
  resources: string;
  blog: string;
  freeTools: string;
  reports: string;
  caseStudy: string;
  signIn: string;
  signUp: string;
  switchLanguage: string;
  product: string;
  features: string;
  pricing: string;
  faqs: string;
  about: string;
  company: string;
  helpCenter: string;
  privacy: string;
  terms: string;
  tagline: string;
  rights: string;
  trustpilot: string;
};

export type AuthCopy = {
  welcomeBack: string;
  signInToAccount: string;
  welcomeBackPanel: string;
  signInPanelBody: string;
  noAccount: string;
  createAccount: string;
  createAccountLead: string;
  joinMarketplace: string;
  joinMarketplaceBody: string;
  alreadyHaveAccount: string;
  email: string;
  password: string;
  emailPlaceholder: string;
  brand: string;
  creator: string;
  accountType: string;
  pleaseSignInAgain: string;
  loginFailed: string;
  registrationFailed: string;
  signingIn: string;
  creatingAccount: string;
  hidePassword: string;
  showPassword: string;
  hide: string;
  show: string;
  submitSignIn: string;
  submitCreateAccount: string;
};

const chromeEn: ChromeCopy = {
  forCompanies: "For companies",
  forCreators: "For creators",
  forAgencies: "For agencies",
  howItWorks: "How it works",
  resources: "Resources",
  blog: "Blog",
  freeTools: "Free Tools",
  reports: "Reports & benchmarks",
  caseStudy: "Case study: BlogSEO",
  signIn: "Sign in",
  signUp: "Sign up",
  switchLanguage: "Switch language",
  product: "Product",
  features: "Features",
  pricing: "Pricing",
  faqs: "FAQs",
  about: "About",
  company: "Company",
  helpCenter: "Help Center",
  privacy: "Privacy",
  terms: "Terms of Sale & Use",
  tagline: "Turn LinkedIn creators into your best acquisition channel.",
  rights: "© 2026 naano. All rights reserved.",
  trustpilot: "Trustpilot reviews",
};

const chromeFr: ChromeCopy = {
  forCompanies: "Pour les entreprises",
  forCreators: "Pour les créateurs",
  forAgencies: "Pour les agences",
  howItWorks: "Comment ça marche",
  resources: "Ressources",
  blog: "Blog",
  freeTools: "Outils gratuits",
  reports: "Rapports & benchmarks",
  caseStudy: "Étude de cas : BlogSEO",
  signIn: "Connexion",
  signUp: "S'inscrire",
  switchLanguage: "Changer de langue",
  product: "Produit",
  features: "Fonctionnalités",
  pricing: "Tarifs",
  faqs: "FAQ",
  about: "À propos",
  company: "Entreprise",
  helpCenter: "Centre d'aide",
  privacy: "Confidentialité",
  terms: "CGV & conditions d'utilisation",
  tagline: "Faites des créateurs LinkedIn votre meilleur canal d'acquisition.",
  rights: "© 2026 naano. Tous droits réservés.",
  trustpilot: "Avis Trustpilot",
};

const authEn: AuthCopy = {
  welcomeBack: "Welcome back",
  signInToAccount: "Sign in to your account",
  welcomeBackPanel: "Welcome back.",
  signInPanelBody: "Sign in to manage your campaigns, creators and payouts, all in one place.",
  noAccount: "Don't have an account?",
  createAccount: "Create your account",
  createAccountLead: "Start running creator campaigns, or start earning.",
  joinMarketplace: "Join the marketplace.",
  joinMarketplaceBody:
    "Brands book vetted LinkedIn creators at a fixed price per post. Creators get paid within 24h.",
  alreadyHaveAccount: "Already have an account?",
  email: "Email",
  password: "Password",
  emailPlaceholder: "john@company.com",
  brand: "Brand",
  creator: "Creator",
  accountType: "Account type",
  pleaseSignInAgain: "Please sign in again to continue.",
  loginFailed: "Login failed",
  registrationFailed: "Registration failed",
  signingIn: "Signing in…",
  creatingAccount: "Creating account…",
  hidePassword: "Hide password",
  showPassword: "Show password",
  hide: "Hide",
  show: "Show",
  submitSignIn: "Sign in",
  submitCreateAccount: "Create account",
};

const authFr: AuthCopy = {
  welcomeBack: "Bon retour",
  signInToAccount: "Connectez-vous à votre compte",
  welcomeBackPanel: "Bon retour.",
  signInPanelBody: "Connectez-vous pour gérer vos campagnes, créateurs et paiements, au même endroit.",
  noAccount: "Pas encore de compte ?",
  createAccount: "Créez votre compte",
  createAccountLead: "Lancez des campagnes créateurs, ou commencez à être payé.",
  joinMarketplace: "Rejoignez la marketplace.",
  joinMarketplaceBody:
    "Les marques réservent des créateurs LinkedIn vérifiés à un tarif fixe par post. Les créateurs sont payés sous 24h.",
  alreadyHaveAccount: "Vous avez déjà un compte ?",
  email: "E-mail",
  password: "Mot de passe",
  emailPlaceholder: "jean@entreprise.com",
  brand: "Marque",
  creator: "Créateur",
  accountType: "Type de compte",
  pleaseSignInAgain: "Veuillez vous reconnecter pour continuer.",
  loginFailed: "La connexion a échoué",
  registrationFailed: "L'inscription a échoué",
  signingIn: "Connexion…",
  creatingAccount: "Création du compte…",
  hidePassword: "Masquer le mot de passe",
  showPassword: "Afficher le mot de passe",
  hide: "Masquer",
  show: "Afficher",
  submitSignIn: "Connexion",
  submitCreateAccount: "Créer un compte",
};

export const chromeCopy: Record<Locale, ChromeCopy> = {
  en: chromeEn,
  fr: chromeFr,
};

export const authCopy: Record<Locale, AuthCopy> = {
  en: authEn,
  fr: authFr,
};
