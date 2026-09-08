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

export type CreatorHomeCopy = {
  eyebrow: string;
  title: string;
  hello: string;
  sub: string;
  reachKpi: string;
  reachPending: string;
  postsKpi: string;
  postsKpiHint: string;
  engagementsKpi: string;
  engagementsKpiHint: string;
  followersKpi: string;
  followersKpiHint: string;
  cardPreviewTitle: string;
  cardPreviewSub: string;
  openCard: string;
  copyCardLink: string;
  shareCard: string;
  linkCopied: string;
  nextStepsTitle: string;
  nextStepsSub: string;
  guideCardReady: string;
  guideCardReadySub: string;
  guideCardPrice: string;
  guideCardPriceSub: string;
  guideComplete: string;
  guideTodo: string;
  guideMarketplaceLive: string;
  guideMarketplaceLiveSub: string;
  guideMarketplaceSetup: string;
  guideMarketplaceSetupSub: string;
  followers: string;
  estImpressions: string;
  chosenPrice: string;
  noPostData: string;
  nichesFallback: string;
};

const en: CreatorCopy = {
  home: "Overview",
  profile: "My card",
  opportunities: "Opportunities",
  collabs: "Collaborations",
  analytics: "Analytics",
  community: "Community",
  earnings: "Earnings",
  messages: "Messages",
  integrations: "Affiliate program",
  availableBalance: "Available balance",
  signOut: "Sign out",
  settings: "Settings",
  bookACall: "Book a call",
  getStarted: "Get started",
  getStartedBody: "Complete your profile",
  comingSoon: "This page is coming soon.",
};

const fr: CreatorCopy = {
  home: "Vue d’ensemble",
  profile: "Ma carte",
  opportunities: "Opportunités",
  collabs: "Collaborations",
  analytics: "Analytique",
  community: "Communauté",
  earnings: "Gains",
  messages: "Messages",
  integrations: "Programme d’affiliation",
  availableBalance: "Solde disponible",
  signOut: "Déconnexion",
  settings: "Paramètres",
  bookACall: "Réserver un appel",
  getStarted: "Démarrer",
  getStartedBody: "Compléter votre profil",
  comingSoon: "Cette page arrive bientôt.",
};

const homeEn: CreatorHomeCopy = {
  eyebrow: "Creator workspace",
  title: "Welcome",
  hello: "Good to see you, {name}",
  sub: "Your creator activity, at a glance.",
  reachKpi: "Public post reach",
  reachPending: "Waiting for public post data",
  postsKpi: "Public posts",
  postsKpiHint: "Original LinkedIn posts found",
  engagementsKpi: "Public engagements",
  engagementsKpiHint: "Reactions, comments and reposts",
  followersKpi: "LinkedIn followers",
  followersKpiHint: "Imported from the public profile",
  cardPreviewTitle: "Your creator card",
  cardPreviewSub: "This is how brands discover your positioning and collaboration offer.",
  openCard: "Open card",
  copyCardLink: "Copy card link",
  shareCard: "Share my card",
  linkCopied: "Copied",
  nextStepsTitle: "Your launch guide",
  nextStepsSub: "Personalized for your Marketplace status",
  guideCardReady: "Card and price ready",
  guideCardReadySub: "Your positioning and offer are ready to review.",
  guideCardPrice: "Complete your card and price",
  guideCardPriceSub: "Review the information imported from LinkedIn and set your offer.",
  guideComplete: "Complete",
  guideTodo: "To do",
  guideMarketplaceLive: "Visible on the Marketplace",
  guideMarketplaceLiveSub: "Brands can discover your card.",
  guideMarketplaceSetup: "Unlock Marketplace visibility",
  guideMarketplaceSetupSub: "Complete the remaining listing requirements before brands can discover your card.",
  followers: "Followers",
  estImpressions: "Est. impressions",
  chosenPrice: "Chosen price",
  noPostData: "No post data available",
  nichesFallback: "B2B",
};

const homeFr: CreatorHomeCopy = {
  eyebrow: "Espace créateur",
  title: "Bienvenue",
  hello: "Ravi de vous revoir, {name}",
  sub: "Votre activité créateur, en un coup d’œil.",
  reachKpi: "Portée des posts publics",
  reachPending: "En attente des données de posts publics",
  postsKpi: "Posts publics",
  postsKpiHint: "Posts LinkedIn originaux trouvés",
  engagementsKpi: "Engagements publics",
  engagementsKpiHint: "Réactions, commentaires et partages",
  followersKpi: "Abonnés LinkedIn",
  followersKpiHint: "Importés du profil public",
  cardPreviewTitle: "Votre carte créateur",
  cardPreviewSub: "C’est ainsi que les marques découvrent votre positionnement et votre offre.",
  openCard: "Ouvrir la carte",
  copyCardLink: "Copier le lien",
  shareCard: "Partager ma carte",
  linkCopied: "Copié",
  nextStepsTitle: "Votre guide de lancement",
  nextStepsSub: "Personnalisé selon votre statut Marketplace",
  guideCardReady: "Carte et prix prêts",
  guideCardReadySub: "Votre positionnement et votre offre sont prêts à être relus.",
  guideCardPrice: "Compléter votre carte et votre prix",
  guideCardPriceSub: "Relisez les infos importées de LinkedIn et définissez votre offre.",
  guideComplete: "Terminé",
  guideTodo: "À faire",
  guideMarketplaceLive: "Visible sur la Marketplace",
  guideMarketplaceLiveSub: "Les marques peuvent découvrir votre carte.",
  guideMarketplaceSetup: "Débloquer la visibilité Marketplace",
  guideMarketplaceSetupSub: "Complétez les critères restants avant que les marques ne voient votre carte.",
  followers: "Abonnés",
  estImpressions: "Impressions est.",
  chosenPrice: "Prix choisi",
  noPostData: "Pas de données de posts",
  nichesFallback: "B2B",
};

export const creatorCopy: Record<Locale, CreatorCopy> = { en, fr };
export const creatorHomeCopy: Record<Locale, CreatorHomeCopy> = { en: homeEn, fr: homeFr };

export function fillHome(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}
