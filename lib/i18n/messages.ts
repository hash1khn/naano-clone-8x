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
  whoAreYou: string;
  imACreator: string;
  creatorRoleLead: string;
  imABrand: string;
  brandRoleLead: string;
  onePlatform: string;
  onePlatformBody: string;
  joinNaano: string;
  step1Of4: string;
  creatorsBrandsResults: string;
  brandSignupLead: string;
  brandPanelBody: string;
  builtForB2b: string;
  signUpWithLinkedIn: string;
  signUpWithGoogle: string;
  signUpWithEmail: string;
  signInHere: string;
  backToSignupOptions: string;
  marketplaceCardLabel: string;
  marketplaceCardTitle: string;
  marketplaceCardBody: string;
  yourName: string;
  headlinePlaceholder: string;
  dataLabel: string;
  pending: string;
  followers: string;
  estImpressions: string;
  costPerPost: string;
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
  continueWithLinkedIn: string;
  continueWithGoogle: string;
  orContinueWithEmail: string;
  oauthFailed: string;
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
  whoAreYou: "First, who are you here as?",
  imACreator: "I'm a creator",
  creatorRoleLead: "Get paid to create LinkedIn content for B2B brands you actually use.",
  imABrand: "I'm a brand",
  brandRoleLead: "Find creators, launch campaigns, and trace real pipeline back to each post.",
  onePlatform: "One platform. Two sides.",
  onePlatformBody:
    "Creators get paid to post. B2B brands get real pipeline. Pick where you fit and we'll set the rest up in a couple of minutes.",
  joinNaano: "Join Naano",
  step1Of4: "Step 1 of 4",
  creatorsBrandsResults: "Creators. Brands. Results.",
  brandSignupLead: "The #1 platform to run LinkedIn creator campaigns that drive real business.",
  brandPanelBody:
    "Run LinkedIn creator campaigns that drive real business - discover creators, track performance, pay in one click.",
  builtForB2b: "Built for B2B marketing teams",
  signUpWithLinkedIn: "Sign up with LinkedIn",
  signUpWithGoogle: "Sign up with Google",
  signUpWithEmail: "Sign up with email",
  signInHere: "Sign in here",
  backToSignupOptions: "Back",
  marketplaceCardLabel: "Your Marketplace card",
  marketplaceCardTitle: "Build a card brands can trust.",
  marketplaceCardBody: "It updates live with your profile, analytics, positioning and price.",
  yourName: "Your name",
  headlinePlaceholder: "Your LinkedIn headline and topics will appear here.",
  dataLabel: "Data",
  pending: "Pending",
  followers: "Followers",
  estImpressions: "Est. impressions",
  costPerPost: "Cost / post",
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
  continueWithLinkedIn: "Continue with LinkedIn",
  continueWithGoogle: "Continue with Google",
  orContinueWithEmail: "Or continue with email",
  oauthFailed: "Google sign-in failed. Try again, or use email.",
};

const authFr: AuthCopy = {
  welcomeBack: "Bon retour",
  signInToAccount: "Connectez-vous à votre compte",
  welcomeBackPanel: "Bon retour.",
  signInPanelBody: "Connectez-vous pour gérer vos campagnes, créateurs et paiements, au même endroit.",
  noAccount: "Pas encore de compte ?",
  createAccount: "Créez votre compte",
  createAccountLead: "Lancez des campagnes créateurs, ou commencez à être payé.",
  whoAreYou: "D'abord, vous êtes ici en tant que ?",
  imACreator: "Je suis créateur",
  creatorRoleLead: "Soyez payé pour créer du contenu LinkedIn pour des marques B2B que vous utilisez vraiment.",
  imABrand: "Je suis une marque",
  brandRoleLead: "Trouvez des créateurs, lancez des campagnes et reliez le pipeline réel à chaque post.",
  onePlatform: "Une plateforme. Deux côtés.",
  onePlatformBody:
    "Les créateurs sont payés pour poster. Les marques B2B obtiennent du pipeline réel. Choisissez votre place, on s'occupe du reste en quelques minutes.",
  joinNaano: "Rejoindre Naano",
  step1Of4: "Étape 1 sur 4",
  creatorsBrandsResults: "Créateurs. Marques. Résultats.",
  brandSignupLead: "La plateforme n°1 pour lancer des campagnes créateurs LinkedIn qui génèrent du business réel.",
  brandPanelBody:
    "Lancez des campagnes créateurs LinkedIn qui génèrent du business réel : découvrez des créateurs, suivez la performance, payez en un clic.",
  builtForB2b: "Conçu pour les équipes marketing B2B",
  signUpWithLinkedIn: "S'inscrire avec LinkedIn",
  signUpWithGoogle: "S'inscrire avec Google",
  signUpWithEmail: "S'inscrire par e-mail",
  signInHere: "Connectez-vous ici",
  backToSignupOptions: "Retour",
  marketplaceCardLabel: "Votre carte marketplace",
  marketplaceCardTitle: "Créez une carte en laquelle les marques peuvent avoir confiance.",
  marketplaceCardBody: "Elle se met à jour en direct avec votre profil, vos analytics, votre positionnement et votre tarif.",
  yourName: "Votre nom",
  headlinePlaceholder: "Votre titre LinkedIn et vos sujets apparaîtront ici.",
  dataLabel: "Données",
  pending: "En attente",
  followers: "Abonnés",
  estImpressions: "Impressions est.",
  costPerPost: "Coût / post",
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
  continueWithLinkedIn: "Continuer avec LinkedIn",
  continueWithGoogle: "Continuer avec Google",
  orContinueWithEmail: "Ou continuer par e-mail",
  oauthFailed: "La connexion Google a échoué. Réessayez, ou utilisez l'e-mail.",
};

export const chromeCopy: Record<Locale, ChromeCopy> = {
  en: chromeEn,
  fr: chromeFr,
};

export const authCopy: Record<Locale, AuthCopy> = {
  en: authEn,
  fr: authFr,
};
