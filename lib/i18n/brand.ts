import type { Locale } from "@/lib/i18n/locale";

export type BrandCopy = {
  overview: string;
  marketplace: string;
  campaigns: string;
  collaborations: string;
  results: string;
  messages: string;
  billing: string;
  integrations: string;
  hello: string;
  happeningFor: string;
  newCampaign: string;
  creatorsActivated: string;
  postsPublished: string;
  profilesEngaged: string;
  impressions: string;
  toDo: string;
  priorityActions: string;
  seeAll: string;
  topUpWallet: string;
  bookACall: string;
  findCreators: string;
  blocked: string;
  suggested: string;
  recentlyEngaged: string;
  icpAccounts: string;
  noCompanyEngaged: string;
  waitingOnReply: string;
  noConversation: string;
  newCreators: string;
  profilesThatFit: string;
  explore: string;
  fromPrice: string;
  wallet: string;
  connectMcp: string;
  getStarted: string;
  getStartedBody: string;
  helpFind: string;
  noCreators: string;
};

const en: BrandCopy = {
  overview: "Overview",
  marketplace: "Marketplace",
  campaigns: "Campaigns",
  collaborations: "Collaborations",
  results: "Results",
  messages: "Messages",
  billing: "Billing",
  integrations: "Integrations",
  hello: "Hello {name} 👋",
  happeningFor: "Here is what is happening for {workspace} on Naano.",
  newCampaign: "+ New campaign",
  creatorsActivated: "Creators activated",
  postsPublished: "Posts published",
  profilesEngaged: "Profiles engaged",
  impressions: "Impressions",
  toDo: "To do",
  priorityActions: "Priority actions",
  seeAll: "See all",
  topUpWallet: "Top up your wallet",
  bookACall: "Book a call for your next campaign",
  findCreators: "Find new creators for your next campaign",
  blocked: "Blocked",
  suggested: "Suggested",
  recentlyEngaged: "Recently engaged companies",
  icpAccounts: "ICP accounts in your target",
  noCompanyEngaged: "No company has engaged yet.",
  waitingOnReply: "Waiting on your reply",
  noConversation: "No conversation yet.",
  newCreators: "New creators",
  profilesThatFit: "Profiles that fit your buyers",
  explore: "Explore",
  fromPrice: "from €{price}",
  wallet: "€{amount}",
  connectMcp: "Naano MCP / Connect →",
  getStarted: "Get started",
  getStartedBody: "Discover the marketplace",
  helpFind: "What can I help you find?",
  noCreators: "No creators to show yet.",
};

const fr: BrandCopy = {
  overview: "Vue d'ensemble",
  marketplace: "Marketplace",
  campaigns: "Campagnes",
  collaborations: "Collaborations",
  results: "Résultats",
  messages: "Messages",
  billing: "Facturation",
  integrations: "Intégrations",
  hello: "Bonjour {name} 👋",
  happeningFor: "Voici ce qui se passe pour {workspace} sur Naano.",
  newCampaign: "+ Nouvelle campagne",
  creatorsActivated: "Créateurs activés",
  postsPublished: "Posts publiés",
  profilesEngaged: "Profils engagés",
  impressions: "Impressions",
  toDo: "À faire",
  priorityActions: "Actions prioritaires",
  seeAll: "Tout voir",
  topUpWallet: "Alimenter votre wallet",
  bookACall: "Réserver un appel pour votre prochaine campagne",
  findCreators: "Trouver de nouveaux créateurs pour votre prochaine campagne",
  blocked: "Bloqué",
  suggested: "Suggéré",
  recentlyEngaged: "Entreprises récemment engagées",
  icpAccounts: "Comptes ICP dans votre cible",
  noCompanyEngaged: "Aucune entreprise n'a encore engagé.",
  waitingOnReply: "En attente de votre réponse",
  noConversation: "Aucune conversation pour le moment.",
  newCreators: "Nouveaux créateurs",
  profilesThatFit: "Profils qui correspondent à vos acheteurs",
  explore: "Explorer",
  fromPrice: "à partir de {price} €",
  wallet: "{amount} €",
  connectMcp: "Naano MCP / Connecter →",
  getStarted: "Démarrer",
  getStartedBody: "Découvrir la marketplace",
  helpFind: "Que puis-je vous aider à trouver ?",
  noCreators: "Aucun créateur à afficher pour le moment.",
};

export const brandCopy: Record<Locale, BrandCopy> = { en, fr };

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
