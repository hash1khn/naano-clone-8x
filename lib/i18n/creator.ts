import type { Locale } from "@/lib/i18n/locale";

export type CreatorCopy = {
  home: string;
  profile: string;
  opportunities: string;
  collabs: string;
  analytics: string;
  community: string;
  earnings: string;
  referrals: string;
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

export type CreatorEarningsCopy = {
  title: string;
  sub: string;
  filterPaid: string;
  totalEarned: string;
  totalEarnedMeta: string;
  inTransitLabel: string;
  inTransitBody: string;
  availableLabel: string;
  availableBody: string;
  chartTitle: string;
  chartSub: string;
  chartTotal: string;
  withdrawTitle: string;
  withdrawSub: string;
  payoutMethod: string;
  bankTransfer: string;
  bankEmptyHolder: string;
  bankEmptyDetails: string;
  bankEdit: string;
  bankModalTitle: string;
  bankHolderLabel: string;
  bankIbanLabel: string;
  bankSave: string;
  cancel: string;
  stripe: string;
  stripeStatus: string;
  stripeNotConnected: string;
  stripeConnected: string;
  stripeHint: string;
  connectStripe: string;
  disconnectStripe: string;
  amountLabel: string;
  withdrawAll: string;
  confirmWithdraw: string;
  minNote: string;
  noticeNeedMethod: string;
  noticeMin: string;
  noticeOk: string;
  noticeZero: string;
};

const en: CreatorCopy = {
  home: "Overview",
  profile: "My card",
  opportunities: "Opportunities",
  collabs: "Collaborations",
  analytics: "Analytics",
  community: "Community",
  earnings: "Earnings",
  referrals: "Affiliate program",
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
  home: "Vue d’ensemble",
  profile: "Ma carte",
  opportunities: "Opportunités",
  collabs: "Collaborations",
  analytics: "Analytique",
  community: "Communauté",
  earnings: "Gains",
  referrals: "Programme d’affiliation",
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

const earningsEn: CreatorEarningsCopy = {
  title: "Earnings",
  sub: "Track revenue from your paid collaborations and withdraw available funds.",
  filterPaid: "Paid collaborations",
  totalEarned: "Total earned",
  totalEarnedMeta: "{count} paid collaborations · {avg} average",
  inTransitLabel: "In transit",
  inTransitBody:
    "In transit. International transfers usually arrive within 1–7 days, depending on the destination and banking network.",
  availableLabel: "Available now",
  availableBody: "Available now. Ready to withdraw to your selected payout method.",
  chartTitle: "Earnings over time",
  chartSub: "Net collaboration earnings from the last six months.",
  chartTotal: "{amount} over 6 months",
  withdrawTitle: "Withdraw earnings",
  withdrawSub: "Choose where your available balance should be sent.",
  payoutMethod: "Payout method",
  bankTransfer: "Bank transfer",
  bankEmptyHolder: "No account holder on file",
  bankEmptyDetails: "No bank details on file",
  bankEdit: "Edit",
  bankModalTitle: "Bank details",
  bankHolderLabel: "Account holder",
  bankIbanLabel: "IBAN",
  bankSave: "Save details",
  cancel: "Cancel",
  stripe: "Stripe",
  stripeStatus: "Status:",
  stripeNotConnected: "Not connected",
  stripeConnected: "Connected",
  stripeHint: "Instant transfer to your connected Stripe account.",
  connectStripe: "Connect Stripe",
  disconnectStripe: "Disconnect",
  amountLabel: "Amount",
  withdrawAll: "Withdraw all",
  confirmWithdraw: "Confirm withdrawal",
  minNote: "Minimum withdrawal is €100. Funds are sent to your selected payout method.",
  noticeNeedMethod: "Connect Stripe or add bank details before withdrawing.",
  noticeMin: "Minimum withdrawal is €100.",
  noticeOk: "Withdrawal of {amount} requested. Demo only — no real transfer.",
  noticeZero: "No available balance to withdraw.",
};

const earningsFr: CreatorEarningsCopy = {
  title: "Gains",
  sub: "Suivez les revenus de vos collaborations payées et retirez vos fonds disponibles.",
  filterPaid: "Collaborations payées",
  totalEarned: "Total gagné",
  totalEarnedMeta: "{count} collaborations payées · {avg} en moyenne",
  inTransitLabel: "En transit",
  inTransitBody:
    "En transit. Les virements internationaux arrivent généralement sous 1 à 7 jours, selon la destination et le réseau bancaire.",
  availableLabel: "Disponible maintenant",
  availableBody: "Disponible maintenant. Prêt à être retiré vers votre méthode de paiement.",
  chartTitle: "Gains dans le temps",
  chartSub: "Revenus nets des collaborations sur les six derniers mois.",
  chartTotal: "{amount} sur 6 mois",
  withdrawTitle: "Retirer les gains",
  withdrawSub: "Choisissez où envoyer votre solde disponible.",
  payoutMethod: "Méthode de paiement",
  bankTransfer: "Virement bancaire",
  bankEmptyHolder: "Aucun titulaire enregistré",
  bankEmptyDetails: "Aucun RIB enregistré",
  bankEdit: "Modifier",
  bankModalTitle: "Coordonnées bancaires",
  bankHolderLabel: "Titulaire du compte",
  bankIbanLabel: "IBAN",
  bankSave: "Enregistrer",
  cancel: "Annuler",
  stripe: "Stripe",
  stripeStatus: "Statut :",
  stripeNotConnected: "Non connecté",
  stripeConnected: "Connecté",
  stripeHint: "Virement instantané vers votre compte Stripe connecté.",
  connectStripe: "Connecter Stripe",
  disconnectStripe: "Déconnecter",
  amountLabel: "Montant",
  withdrawAll: "Tout retirer",
  confirmWithdraw: "Confirmer le retrait",
  minNote: "Le retrait minimum est de 100 €. Les fonds sont envoyés vers votre méthode sélectionnée.",
  noticeNeedMethod: "Connectez Stripe ou ajoutez un RIB avant de retirer.",
  noticeMin: "Le retrait minimum est de 100 €.",
  noticeOk: "Retrait de {amount} demandé. Démo uniquement — aucun virement réel.",
  noticeZero: "Aucun solde disponible à retirer.",
};

export type CreatorCommunityCopy = {
  title: string;
  sub: string;
  live: string;
  slackEyebrow: string;
  slackTitle: string;
  slackBody: string;
  joinSlack: string;
  slackUnavailable: string;
  slackBenefitFeedback: string;
  slackBenefitTips: string;
  slackBenefitTeam: string;
  linkedinEyebrow: string;
  linkedinAffiliateTitle: string;
  linkedinAffiliateBody: string;
  affiliationPeriod: string;
  affiliationBenefit: string;
  experienceRole: string;
  experienceCompany: string;
  experienceDates: string;
  addCardLinkedin: string;
  publishCard: string;
  cardLinkReadyToast: string;
  copyFailed: string;
  leaderboardTitle: string;
  leaderboardEstimatedSub: string;
  leaderboardPostsSub: string;
  metricAria: string;
  estimatedImpressions: string;
  posts: string;
  postCount: string;
  estimatedImpressionCount: string;
  you: string;
  publicCreator: string;
  creatorFallback: string;
  loadError: string;
  emptyEstimated: string;
  emptyPosts: string;
  yourPosition: string;
};

const communityEn: CreatorCommunityCopy = {
  title: "Community",
  sub: "Learn with other B2B creators, share what works and make your Naano identity visible.",
  live: "Creator network",
  slackEyebrow: "Naano creators on Slack",
  slackTitle: "The room where B2B creators get better together.",
  slackBody:
    "Ask for feedback on a sponsored post, compare campaign lessons, meet creators in your language and help shape what Naano builds next.",
  joinSlack: "Join the Slack community",
  slackUnavailable: "The Slack invite is temporarily unavailable. Contact Naano support and we’ll invite you.",
  slackBenefitFeedback: "Get feedback before you publish",
  slackBenefitTips: "Share campaign tips that work",
  slackBenefitTeam: "Talk directly with the Naano team",
  linkedinEyebrow: "LinkedIn visibility",
  linkedinAffiliateTitle: "Turn your LinkedIn profile into an always-on Deal Link",
  linkedinAffiliateBody:
    "Add your creator card to LinkedIn so brands can discover your work and join Naano through your attributed link.",
  affiliationPeriod: "of Naano's commission for 3 months",
  affiliationBenefit:
    "Leave your card on your LinkedIn profile. If a brand joins Naano through it, your reward is tracked automatically.",
  experienceRole: "Naano Creator",
  experienceCompany: "Naano · Independent",
  experienceDates: "Present",
  addCardLinkedin: "Add my creator card to LinkedIn",
  publishCard: "Publish my card",
  cardLinkReadyToast: "Your card link is copied — add it to the Naano experience on LinkedIn.",
  copyFailed: "Copy failed — select the link manually",
  leaderboardTitle: "Naano campaign leaderboard",
  leaderboardEstimatedSub:
    "Estimated impressions generated by sponsored posts published for Naano brand collaborations.",
  leaderboardPostsSub:
    "Published sponsored posts completed through Naano, all time. Every delivered collaboration counts.",
  metricAria: "Leaderboard metric",
  estimatedImpressions: "Estimated impressions",
  posts: "Posts",
  postCount: "Naano posts published",
  estimatedImpressionCount: "estimated Naano impressions",
  you: "You",
  publicCreator: "Public creator card",
  creatorFallback: "Creator",
  loadError: "The leaderboard could not be loaded right now. Try again in a moment.",
  emptyEstimated: "Estimated impressions will appear after a sponsored Naano post is published and measured.",
  emptyPosts: "Published Naano collaborations will appear here as soon as the first posts go live.",
  yourPosition: "Your position",
};

const communityFr: CreatorCommunityCopy = {
  title: "Communauté",
  sub: "Apprenez avec d’autres créateurs B2B, partagez ce qui fonctionne et rendez votre identité Naano visible.",
  live: "Réseau créateurs",
  slackEyebrow: "Créateurs Naano sur Slack",
  slackTitle: "L’espace où les créateurs B2B progressent ensemble.",
  slackBody:
    "Demandez un avis sur un post sponsorisé, comparez les enseignements de campagnes, rencontrez des créateurs dans votre langue et aidez à façonner Naano.",
  joinSlack: "Rejoindre la communauté Slack",
  slackUnavailable:
    "L’invitation Slack est temporairement indisponible. Contactez le support Naano et nous vous inviterons.",
  slackBenefitFeedback: "Obtenez un avis avant de publier",
  slackBenefitTips: "Partagez des conseils de campagnes qui marchent",
  slackBenefitTeam: "Parlez directement avec l’équipe Naano",
  linkedinEyebrow: "Visibilité LinkedIn",
  linkedinAffiliateTitle: "Transformez votre profil LinkedIn en Deal Link permanent",
  linkedinAffiliateBody:
    "Ajoutez votre carte créateur à LinkedIn pour que les marques découvrent votre travail et rejoignent Naano via votre lien attribué.",
  affiliationPeriod: "de la commission Naano pendant 3 mois",
  affiliationBenefit:
    "Laissez votre carte sur votre profil LinkedIn. Si une marque rejoint Naano grâce à elle, votre récompense est suivie automatiquement.",
  experienceRole: "Créateur Naano",
  experienceCompany: "Naano · Indépendant",
  experienceDates: "Présent",
  addCardLinkedin: "Ajouter ma carte créateur à LinkedIn",
  publishCard: "Publier ma carte",
  cardLinkReadyToast: "Lien de votre carte copié — ajoutez-le à l’expérience Naano sur LinkedIn.",
  copyFailed: "Copie impossible — sélectionnez le lien manuellement",
  leaderboardTitle: "Classement des campagnes Naano",
  leaderboardEstimatedSub:
    "Impressions estimées générées par les posts sponsorisés publiés pour les collaborations de marques Naano.",
  leaderboardPostsSub:
    "Posts sponsorisés publiés via Naano, depuis le début. Chaque collaboration livrée compte.",
  metricAria: "Métrique du classement",
  estimatedImpressions: "Impressions estimées",
  posts: "Posts",
  postCount: "Posts Naano publiés",
  estimatedImpressionCount: "impressions Naano estimées",
  you: "Vous",
  publicCreator: "Carte créateur publique",
  creatorFallback: "Créateur",
  loadError: "Le classement n’a pas pu être chargé. Réessayez dans un instant.",
  emptyEstimated:
    "Les impressions estimées apparaîtront après la publication et la mesure d’un post Naano sponsorisé.",
  emptyPosts: "Les collaborations Naano publiées apparaîtront ici dès les premiers posts.",
  yourPosition: "Votre position",
};

export type CreatorReferralsCopy = {
  tabBrands: string;
  tabCreators: string;
  brandBadge: string;
  brandTitle: string;
  brandSub: string;
  copyReferral: string;
  seeHow: string;
  introduceTitle: string;
  introduceSub: string;
  personalLinkLabel: string;
  copyLink: string;
  tracked: string;
  shareLabel: string;
  shareValue: string;
  rewardPeriod: string;
  rewardPeriodValue: string;
  rewardPeriodNote: string;
  rewardsEarned: string;
  brandsIntroduced: string;
  brandsIntroducedMeta: string;
  earningNow: string;
  earningNowMeta: string;
  twoWaysEyebrow: string;
  twoWaysTitle: string;
  twoWaysSub: string;
  recommendTitle: string;
  recommendBadge: string;
  recommendBody: string;
  copyNaanoLink: string;
  cardTitle: string;
  cardBody: string;
  openCard: string;
  howEyebrow: string;
  howTitle: string;
  how1Title: string;
  how1Body: string;
  how2Title: string;
  how2Body: string;
  how3Title: string;
  how3Body: string;
  simEyebrow: string;
  simTitle: string;
  simPotential: string;
  simMonthly: string;
  simNote: string;
  simBudget: string;
  simBrands: string;
  liveEyebrow: string;
  liveBrandsTitle: string;
  totalEarned: string;
  emptyBrandTitle: string;
  emptyBrandBody: string;
  creatorBadge: string;
  creatorTitle: string;
  creatorSub: string;
  copyCreatorInvite: string;
  unlockHint: string;
  creatorLinkLabel: string;
  creatorLinkSub: string;
  creatorShare: string;
  creatorWindow: string;
  creatorWindowNote: string;
  creatorsInvited: string;
  creatorsInvitedMeta: string;
  creatorHowEyebrow: string;
  creatorHowTitle: string;
  creatorHow1Title: string;
  creatorHow1Body: string;
  creatorHow2Title: string;
  creatorHow2Body: string;
  creatorHow3Title: string;
  creatorHow3Body: string;
  liveCreatorsTitle: string;
  emptyCreatorTitle: string;
  emptyCreatorBody: string;
  copied: string;
  linkFallback: string;
  creatorLinkFallback: string;
};

const referralsEn: CreatorReferralsCopy = {
  tabBrands: "Invite brands",
  tabCreators: "Invite creators",
  brandBadge: "Creator affiliation · 25% for 3 months",
  brandTitle: "Recommend Naano. Earn for 3 months.",
  brandSub:
    "Share your personal link with a company. If it joins Naano and launches paid campaigns, you receive 25% of Naano's commission for three months.",
  copyReferral: "Copy my referral link",
  seeHow: "See how it works",
  introduceTitle: "Introduce a company to Naano",
  introduceSub: "Your link identifies you automatically",
  personalLinkLabel: "Your personal referral link",
  copyLink: "Copy link",
  tracked: "Tracked",
  shareLabel: "Your share of Naano's commission",
  shareValue: "25%",
  rewardPeriod: "Reward period",
  rewardPeriodValue: "3 months",
  rewardPeriodNote: "The three-month reward period starts after the company's first completed paid campaign.",
  rewardsEarned: "Rewards earned",
  brandsIntroduced: "Brands introduced",
  brandsIntroducedMeta: "0 have generated rewards",
  earningNow: "Earning now",
  earningNowMeta: "Inside the three-month window",
  twoWaysEyebrow: "Two ways to introduce a brand",
  twoWaysTitle: "Choose the link that fits the conversation.",
  twoWaysSub: "Both options are tracked and pay you 25% of Naano's commission for three months.",
  recommendTitle: "Recommend Naano",
  recommendBadge: "Most common",
  recommendBody: "Use your Naano link when a company wants to discover creators or start influencer marketing.",
  copyNaanoLink: "Copy Naano link",
  cardTitle: "Share your Creator Card",
  cardBody:
    "Use your Deal Link when a brand already wants to collaborate with you. Your profile stays selected when it creates its account.",
  openCard: "Open My Card",
  howEyebrow: "How you get paid",
  howTitle: "Share once. Naano tracks the rest.",
  how1Title: "Share the right link",
  how1Body: "Use your Naano link for an introduction, or your Creator Card for a direct collaboration.",
  how2Title: "They launch a campaign",
  how2Body: "The company creates its account and completes its first paid campaign.",
  how3Title: "Earn for 3 months",
  how3Body: "You receive 25% of Naano's commission on its eligible campaigns.",
  simEyebrow: "Reward simulator",
  simTitle: "What could your network earn?",
  simPotential: "Potential over 3 months",
  simMonthly: "{amount} estimated per month",
  simNote:
    "Illustrative estimate using a 20% Naano commission. Your actual reward is always 25% of the commission Naano realizes on eligible campaigns.",
  simBudget: "Monthly paid campaign volume per brand",
  simBrands: "Active referred brands",
  liveEyebrow: "Live tracking",
  liveBrandsTitle: "Your introduced brands",
  totalEarned: "Total earned",
  emptyBrandTitle: "Your first brand will appear here",
  emptyBrandBody: "Share your referral link. Signup, reward window and earnings will update here automatically.",
  creatorBadge: "Creator referrals · 25% for 3 months",
  creatorTitle: "Invite great creators. Earn when they do.",
  creatorSub:
    "When a creator you invite completes their first paid collaboration, you earn 25% of Naano's commission on their collaborations for three months.",
  copyCreatorInvite: "Copy my creator invite link",
  unlockHint: "Publish your Creator Card to unlock your invite link.",
  creatorLinkLabel: "Your creator invite link",
  creatorLinkSub: "Every signup is attributed automatically",
  creatorShare: "Your share",
  creatorWindow: "Earning window",
  creatorWindowNote: "The window starts with their first completed paid collaboration — never at signup.",
  creatorsInvited: "Creators invited",
  creatorsInvitedMeta: "0 cards published",
  creatorHowEyebrow: "How it works",
  creatorHowTitle: "One link. Three simple steps.",
  creatorHow1Title: "Invite a creator",
  creatorHow1Body: "Send your personal link to a creator who should be on Naano.",
  creatorHow2Title: "They join and publish",
  creatorHow2Body: "Their account and Creator Card are automatically connected to you.",
  creatorHow3Title: "Earn when they do",
  creatorHow3Body: "Their first completed paid collaboration starts your three-month reward window.",
  liveCreatorsTitle: "Your invited creators",
  emptyCreatorTitle: "Your first invited creator will appear here",
  emptyCreatorBody:
    "Share your creator invite link. Their signup, Creator Card, reward window and earnings will update here automatically.",
  copied: "Copied",
  linkFallback: "naano.com/invite/you",
  creatorLinkFallback: "naano.com/invite/creator/you",
};

const referralsFr: CreatorReferralsCopy = {
  tabBrands: "Inviter des marques",
  tabCreators: "Inviter des créateurs",
  brandBadge: "Affiliation créateur · 25 % pendant 3 mois",
  brandTitle: "Recommandez Naano. Gagnez pendant 3 mois.",
  brandSub:
    "Partagez votre lien personnel avec une entreprise. Si elle rejoint Naano et lance des campagnes payées, vous recevez 25 % de la commission de Naano pendant trois mois.",
  copyReferral: "Copier mon lien de parrainage",
  seeHow: "Voir comment ça marche",
  introduceTitle: "Présenter une entreprise à Naano",
  introduceSub: "Votre lien vous identifie automatiquement",
  personalLinkLabel: "Votre lien de parrainage personnel",
  copyLink: "Copier le lien",
  tracked: "Suivi",
  shareLabel: "Votre part de la commission Naano",
  shareValue: "25 %",
  rewardPeriod: "Période de récompense",
  rewardPeriodValue: "3 mois",
  rewardPeriodNote:
    "La période de trois mois commence après la première campagne payée terminée de l’entreprise.",
  rewardsEarned: "Récompenses gagnées",
  brandsIntroduced: "Marques présentées",
  brandsIntroducedMeta: "0 ont généré des récompenses",
  earningNow: "En cours de rémunération",
  earningNowMeta: "Dans la fenêtre de trois mois",
  twoWaysEyebrow: "Deux façons de présenter une marque",
  twoWaysTitle: "Choisissez le lien adapté à la conversation.",
  twoWaysSub: "Les deux options sont suivies et vous versent 25 % de la commission Naano pendant trois mois.",
  recommendTitle: "Recommander Naano",
  recommendBadge: "Le plus courant",
  recommendBody:
    "Utilisez votre lien Naano quand une entreprise veut découvrir des créateurs ou lancer de l’influence marketing.",
  copyNaanoLink: "Copier le lien Naano",
  cardTitle: "Partager votre carte créateur",
  cardBody:
    "Utilisez votre Deal Link quand une marque veut déjà collaborer avec vous. Votre profil reste sélectionné à la création du compte.",
  openCard: "Ouvrir Ma carte",
  howEyebrow: "Comment vous êtes payé",
  howTitle: "Partagez une fois. Naano suit le reste.",
  how1Title: "Partagez le bon lien",
  how1Body: "Utilisez votre lien Naano pour une introduction, ou votre carte créateur pour une collaboration directe.",
  how2Title: "Ils lancent une campagne",
  how2Body: "L’entreprise crée son compte et termine sa première campagne payée.",
  how3Title: "Gagnez pendant 3 mois",
  how3Body: "Vous recevez 25 % de la commission Naano sur ses campagnes éligibles.",
  simEyebrow: "Simulateur de récompense",
  simTitle: "Que pourrait gagner votre réseau ?",
  simPotential: "Potentiel sur 3 mois",
  simMonthly: "{amount} estimés par mois",
  simNote:
    "Estimation illustrative avec une commission Naano de 20 %. Votre récompense réelle est toujours 25 % de la commission réalisée par Naano sur les campagnes éligibles.",
  simBudget: "Volume mensuel de campagnes payées par marque",
  simBrands: "Marques parrainées actives",
  liveEyebrow: "Suivi en direct",
  liveBrandsTitle: "Vos marques présentées",
  totalEarned: "Total gagné",
  emptyBrandTitle: "Votre première marque apparaîtra ici",
  emptyBrandBody:
    "Partagez votre lien de parrainage. L’inscription, la fenêtre de récompense et les gains se mettront à jour ici automatiquement.",
  creatorBadge: "Parrainage créateurs · 25 % pendant 3 mois",
  creatorTitle: "Invitez de grands créateurs. Gagnez quand ils gagnent.",
  creatorSub:
    "Quand un créateur que vous invitez termine sa première collaboration payée, vous gagnez 25 % de la commission Naano sur ses collaborations pendant trois mois.",
  copyCreatorInvite: "Copier mon lien d’invitation créateur",
  unlockHint: "Publiez votre carte créateur pour débloquer votre lien d’invitation.",
  creatorLinkLabel: "Votre lien d’invitation créateur",
  creatorLinkSub: "Chaque inscription vous est attribuée automatiquement",
  creatorShare: "Votre part",
  creatorWindow: "Fenêtre de rémunération",
  creatorWindowNote:
    "La fenêtre commence à leur première collaboration payée terminée — jamais à l’inscription.",
  creatorsInvited: "Créateurs invités",
  creatorsInvitedMeta: "0 cartes publiées",
  creatorHowEyebrow: "Comment ça marche",
  creatorHowTitle: "Un lien. Trois étapes simples.",
  creatorHow1Title: "Invitez un créateur",
  creatorHow1Body: "Envoyez votre lien personnel à un créateur qui devrait être sur Naano.",
  creatorHow2Title: "Ils rejoignent et publient",
  creatorHow2Body: "Leur compte et leur carte créateur sont automatiquement liés à vous.",
  creatorHow3Title: "Gagnez quand ils gagnent",
  creatorHow3Body: "Leur première collaboration payée terminée démarre votre fenêtre de trois mois.",
  liveCreatorsTitle: "Vos créateurs invités",
  emptyCreatorTitle: "Votre premier créateur invité apparaîtra ici",
  emptyCreatorBody:
    "Partagez votre lien d’invitation créateur. Leur inscription, carte, fenêtre de récompense et gains se mettront à jour ici automatiquement.",
  copied: "Copié",
  linkFallback: "naano.com/invite/you",
  creatorLinkFallback: "naano.com/invite/creator/you",
};

export const creatorCopy: Record<Locale, CreatorCopy> = { en, fr };
export const creatorHomeCopy: Record<Locale, CreatorHomeCopy> = { en: homeEn, fr: homeFr };
export const creatorEarningsCopy: Record<Locale, CreatorEarningsCopy> = { en: earningsEn, fr: earningsFr };
export const creatorCommunityCopy: Record<Locale, CreatorCommunityCopy> = {
  en: communityEn,
  fr: communityFr,
};
export const creatorReferralsCopy: Record<Locale, CreatorReferralsCopy> = {
  en: referralsEn,
  fr: referralsFr,
};

export function fillHome(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}

export function fillEarnings(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}

export function fillReferrals(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}

export type CreatorAnalyticsCopy = {
  title: string;
  sub: string;
  periodAria: string;
  last30: string;
  last90: string;
  allTime: string;
  snapshotEyebrow: string;
  coverageLabel: string;
  heroPending: string;
  heroPendingSub: string;
  sourceEmpty: string;
  postsKpi: string;
  postsKpiHint: string;
  reachKpi: string;
  reachPending: string;
  engagementsKpi: string;
  engagementsKpiHint: string;
  followersKpi: string;
  followersKpiHint: string;
  pendingValue: string;
  collabPerformance: string;
  collabPerformanceSub: string;
  funnelTitle: string;
  funnelSub: string;
  postsWithReach: string;
  emptyTitle: string;
  emptyBody: string;
  qualityPendingTitle: string;
  qualityPendingBody: string;
};

const analyticsEn: CreatorAnalyticsCopy = {
  title: "Analytics",
  sub: "See the business impact of your paid collaborations.",
  periodAria: "Analytics period",
  last30: "Last 30 days",
  last90: "Last 90 days",
  allTime: "All time",
  snapshotEyebrow: "Your creator momentum",
  coverageLabel: "of published collaborations include performance data",
  heroPending: "Public LinkedIn posts are being imported",
  heroPendingSub:
    "The profile is ready. Post history and reach will appear after the public-data job completes.",
  sourceEmpty: "No public post found yet",
  postsKpi: "Public posts",
  postsKpiHint: "Original LinkedIn posts found",
  reachKpi: "Public post reach",
  reachPending: "Waiting for public post data",
  engagementsKpi: "Public engagements",
  engagementsKpiHint: "Reactions, comments and reposts",
  followersKpi: "LinkedIn followers",
  followersKpiHint: "Imported from the public profile",
  pendingValue: "Pending",
  collabPerformance: "Top collaborations",
  collabPerformanceSub: "Open a collaboration to review its full delivery details.",
  funnelTitle: "Your opportunity journey",
  funnelSub: "From applications to completed work.",
  postsWithReach: "Posts with reach data",
  emptyTitle: "Public post import in progress",
  emptyBody: "The first public LinkedIn posts will appear here automatically.",
  qualityPendingTitle: "Public LinkedIn data is being prepared",
  qualityPendingBody:
    "Naano is collecting the creator’s recent public posts. No personal LinkedIn connection is required.",
};

const analyticsFr: CreatorAnalyticsCopy = {
  title: "Analytique",
  sub: "Mesurez l’impact business de vos collaborations payées.",
  periodAria: "Période d’analytique",
  last30: "30 derniers jours",
  last90: "90 derniers jours",
  allTime: "Tout le temps",
  snapshotEyebrow: "Votre momentum créateur",
  coverageLabel: "des collaborations publiées incluent des données de performance",
  heroPending: "Les posts LinkedIn publics sont en cours d’import",
  heroPendingSub:
    "Le profil est prêt. L’historique des posts et la portée apparaîtront une fois le job de données publiques terminé.",
  sourceEmpty: "Aucun post public trouvé pour le moment",
  postsKpi: "Posts publics",
  postsKpiHint: "Posts LinkedIn originaux trouvés",
  reachKpi: "Portée des posts publics",
  reachPending: "En attente des données de posts publics",
  engagementsKpi: "Engagements publics",
  engagementsKpiHint: "Réactions, commentaires et partages",
  followersKpi: "Abonnés LinkedIn",
  followersKpiHint: "Importés du profil public",
  pendingValue: "En attente",
  collabPerformance: "Meilleures collaborations",
  collabPerformanceSub: "Ouvrez une collaboration pour revoir tous les détails de livraison.",
  funnelTitle: "Votre parcours d’opportunités",
  funnelSub: "Des candidatures au travail livré.",
  postsWithReach: "Posts avec données de portée",
  emptyTitle: "Import des posts publics en cours",
  emptyBody: "Les premiers posts LinkedIn publics apparaîtront ici automatiquement.",
  qualityPendingTitle: "Les données LinkedIn publiques sont en préparation",
  qualityPendingBody:
    "Naano collecte les posts publics récents du créateur. Aucune connexion LinkedIn personnelle n’est requise.",
};

export const creatorAnalyticsCopy: Record<Locale, CreatorAnalyticsCopy> = {
  en: analyticsEn,
  fr: analyticsFr,
};

export type CreatorOpportunitiesCopy = {
  title: string;
  sub: string;
  filterEmpty: string;
  allChannels: string;
  allIndustries: string;
  searchIndustry: string;
  industriesSelected: string;
  noIndustryMatch: string;
  allCountries: string;
  searchCountry: string;
  countriesSelected: string;
  noCountryMatch: string;
  sortRelevance: string;
  sortMatch: string;
  sortNewest: string;
  searchPh: string;
  apply: string;
  applied: string;
  bookingInProgress: string;
  match: string;
  channel: string;
  postDeadline: string;
  tenDays: string;
  escrowLine: string;
  seeBrief: string;
  viewBrief: string;
  briefComingSoon: string;
  worldwide: string;
  relevance: string;
  close: string;
  appliedToast: string;
};

const opportunitiesEn: CreatorOpportunitiesCopy = {
  title: "Opportunities",
  sub: "Open brand campaigns - apply, the brand accepts, and the booking is created on your terms.",
  filterEmpty: "No campaign matches these filters. Remove a filter.",
  allChannels: "All channels",
  allIndustries: "All industries",
  searchIndustry: "Search an industry…",
  industriesSelected: "{n} industries",
  noIndustryMatch: "No industry matches.",
  allCountries: "All countries",
  searchCountry: "Search a country…",
  countriesSelected: "{n} countries",
  noCountryMatch: "No country matches.",
  sortRelevance: "Relevance (default)",
  sortMatch: "Match: high to low",
  sortNewest: "Newest",
  searchPh: "Search for a campaign or a brand…",
  apply: "Apply",
  applied: "Application sent",
  bookingInProgress: "Booking in progress",
  match: "match",
  channel: "Channel",
  postDeadline: "Post deadline",
  tenDays: "6 days",
  escrowLine: "Your net is held in escrow when the brand accepts, and released at publication.",
  seeBrief: "See Brief",
  viewBrief: "View the brief",
  briefComingSoon: "Brief coming soon",
  worldwide: "Worldwide",
  relevance: "Audience relevance",
  close: "Close",
  appliedToast: "Application sent — demo only.",
};

const opportunitiesFr: CreatorOpportunitiesCopy = {
  title: "Opportunités",
  sub: "Campagnes de marques ouvertes — candidatez, la marque accepte, et la réservation se crée selon vos conditions.",
  filterEmpty: "Aucune campagne ne correspond à ces filtres. Retirez un filtre.",
  allChannels: "Tous les canaux",
  allIndustries: "Toutes les industries",
  searchIndustry: "Rechercher une industrie…",
  industriesSelected: "{n} industries",
  noIndustryMatch: "Aucune industrie ne correspond.",
  allCountries: "Tous les pays",
  searchCountry: "Rechercher un pays…",
  countriesSelected: "{n} pays",
  noCountryMatch: "Aucun pays ne correspond.",
  sortRelevance: "Pertinence (défaut)",
  sortMatch: "Match : du plus élevé",
  sortNewest: "Plus récentes",
  searchPh: "Rechercher une campagne ou une marque…",
  apply: "Postuler",
  applied: "Candidature envoyée",
  bookingInProgress: "Réservation en cours",
  match: "match",
  channel: "Canal",
  postDeadline: "Délai de publication",
  tenDays: "6 jours",
  escrowLine: "Votre net est placé en séquestre quand la marque accepte, et libéré à la publication.",
  seeBrief: "Voir le brief",
  viewBrief: "Voir le brief",
  briefComingSoon: "Brief bientôt disponible",
  worldwide: "Monde entier",
  relevance: "Pertinence d’audience",
  close: "Fermer",
  appliedToast: "Candidature envoyée — démo uniquement.",
};

export const creatorOpportunitiesCopy: Record<Locale, CreatorOpportunitiesCopy> = {
  en: opportunitiesEn,
  fr: opportunitiesFr,
};

export function fillOpportunities(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}

export type CreatorProfileCopy = {
  viewModeAria: string;
  tabEdit: string;
  tabPreview: string;
  changePhoto: string;
  syncedSuffix: string;
  marketplacePrivate: string;
  marketplacePrivateHint: string;
  sectionAbout: string;
  sectionAudience: string;
  sectionPricing: string;
  dragToReorderTitle: string;
  editDescriptionAria: string;
  hideSectionAria: string;
  showSectionAgainTitle: string;
  addASection: string;
  hiddenSectionsHeading: string;
  hiddenSectionsEmpty: string;
  followers: string;
  basedIn: string;
  pricePerPost: string;
  priceNotSet: string;
  bundleLabel: string;
  bundleNoneSet: string;
  bookCtaButton: string;
  editPriceAndBundles: string;
  setMyPrice: string;
  syncCardTitle: string;
  syncStatusPublicProfile: string;
  syncLastUpdate: string;
  syncPublicRefreshCta: string;
  syncRefreshing: string;
  syncPublicQueued: string;
  syncBecomeVerifiedTitle: string;
  syncBecomeVerifiedBody: string;
  syncBecomeVerifiedCta: string;
  syncExtensionComingSoonBadge: string;
  modalEditDescriptionTitle: string;
  aboutTextareaPlaceholder: string;
  yourIndustries: string;
  maxThree: string;
  modalEditPriceTitle: string;
  modalAddSectionTitle: string;
  titleLabel: string;
  titleInputPlaceholder: string;
  contentLabel: string;
  sectionBodyDefaultPlaceholder: string;
  cancel: string;
  save: string;
  addSection: string;
  emptySection: string;
  bookToast: string;
  savedToast: string;
  photoToast: string;
  photoUploading: string;
  photoSaved: string;
  photoError: string;
  saveError: string;
  syncErrorMissingLinkedInUrl: string;
  syncErrorGeneric: string;
  shareCard: string;
  shareToast: string;
  noPostData: string;
  dataLabel: string;
  dataPending: string;
  impressions: string;
  chosenCost: string;
  engagement: string;
  performanceTitle: string;
  performanceSub: string;
  publicDataNote: string;
  audiencePending: string;
  flipToBack: string;
  flipToFront: string;
  cardFrontAria: string;
  cardBackAria: string;
  storefrontEyebrow: string;
  storefrontTitle: string;
  storefrontSub: string;
  dealLinkEyebrow: string;
  dealLinkTitle: string;
  dealLinkBody: string;
  dealLinkLinkedInTitle: string;
  dealLinkLinkedInBody: string;
  dealLinkSendTitle: string;
  dealLinkSendBody: string;
  dealLinkShare: string;
  yourShare: string;
  rewardPeriod: string;
  shareValue: string;
  rewardValue: string;
  copyDealLinkToast: string;
  headingEdit: string;
  headingPreview: string;
  introEdit: string;
  introPreview: string;
  dealLinkShareShort: string;
  flipHint: string;
  companySees: string;
  sectionsHeading: string;
  sectionsHint: string;
  liveCardLabel: string;
  syncRefreshShort: string;
};

const profileEn: CreatorProfileCopy = {
  viewModeAria: "View mode",
  tabEdit: "Edit",
  tabPreview: "Preview",
  changePhoto: "Change profile photo",
  syncedSuffix: " · synced {date}",
  marketplacePrivate: "Private Marketplace card",
  marketplacePrivateHint:
    "You can complete your card and price now. It becomes bookable after commercial approval and professional setup.",
  sectionAbout: "About",
  sectionAudience: "Audience & average metrics",
  sectionPricing: "Pricing",
  dragToReorderTitle: "Drag to reorder",
  editDescriptionAria: "Edit description",
  hideSectionAria: "Hide section",
  showSectionAgainTitle: "Show this section again",
  addASection: "Add a section",
  hiddenSectionsHeading: "Hidden sections",
  hiddenSectionsEmpty: "Sections you hide move here. Click one to add it back.",
  followers: "Followers",
  basedIn: "Based in",
  pricePerPost: "Price per post",
  priceNotSet: "Not set",
  bundleLabel: "Bundle",
  bundleNoneSet: "None set",
  bookCtaButton: "Book a post",
  editPriceAndBundles: "Edit price & bundles",
  setMyPrice: "Set my price",
  syncCardTitle: "LinkedIn data",
  syncStatusPublicProfile: "Public profile · unverified",
  syncLastUpdate: "Last update",
  syncPublicRefreshCta: "Refresh profile and followers",
  syncRefreshing: "Refreshing…",
  syncPublicQueued: "Update started. Your card’s public information will refresh shortly.",
  syncBecomeVerifiedTitle: "Become Naano Verified",
  syncBecomeVerifiedBody:
    "Public profile refresh is fine for basic card data. To unlock Naano Verified analytics, connect with the Naano browser extension.",
  syncBecomeVerifiedCta: "Use the extension",
  syncExtensionComingSoonBadge: "Extension coming soon",
  modalEditDescriptionTitle: "Edit description",
  aboutTextareaPlaceholder: "Describe yourself for companies — your story, what you create, results…",
  yourIndustries: "Your industries",
  maxThree: "max 3",
  modalEditPriceTitle: "Edit price & bundles",
  modalAddSectionTitle: "Add a section",
  titleLabel: "Title",
  titleInputPlaceholder: "e.g. Why brands work with me",
  contentLabel: "Content",
  sectionBodyDefaultPlaceholder: "Add anything you want companies to see — your pitch, formats, results, links…",
  cancel: "Cancel",
  save: "Save",
  addSection: "Add section",
  emptySection: "Empty section.",
  bookToast: "Booking opens for brands on your public card.",
  savedToast: "Profile updated.",
  photoToast: "Photo upload will connect to storage next.",
  photoUploading: "Uploading…",
  photoSaved: "Profile photo updated.",
  photoError: "Could not upload photo. Try another image.",
  saveError: "Could not save changes. Try again.",
  syncErrorMissingLinkedInUrl: "Add your LinkedIn URL in onboarding first.",
  syncErrorGeneric: "LinkedIn refresh failed. Try again in a moment.",
  shareCard: "Share card",
  shareToast: "Card link copied.",
  noPostData: "No post data available",
  dataLabel: "Data",
  dataPending: "Pending",
  impressions: "Impressions",
  chosenCost: "Chosen cost",
  engagement: "Engagement rate",
  performanceTitle: "Performance & ICP",
  performanceSub: "Public LinkedIn reach and audience signals for brands.",
  publicDataNote: "Public LinkedIn data estimated by Naano",
  audiencePending: "Audience stats unlock after more public post data lands.",
  flipToBack: "Flip to performance",
  flipToFront: "Flip to card front",
  cardFrontAria: "Preview of {name}'s Marketplace card",
  cardBackAria: "{name}'s LinkedIn performance and audience",
  storefrontEyebrow: "Your creator storefront",
  storefrontTitle: "Your Naano card, ready to travel.",
  storefrontSub:
    "Share clear proof of your positioning, audience and offers. Every improvement makes the card more useful to brands.",
  dealLinkEyebrow: "Your card is your Deal Link",
  dealLinkTitle: "Put it on LinkedIn. Earn when a brand joins through it.",
  dealLinkBody: "Your public card presents your profile and keeps you selected when a brand creates its account.",
  dealLinkLinkedInTitle: "Add it as a LinkedIn experience",
  dealLinkLinkedInBody: "Keep your card visible on your profile so brands can discover and book you.",
  dealLinkSendTitle: "Send it when a brand contacts you",
  dealLinkSendBody: "When you receive a collaboration request, share your card so the deal runs through Naano.",
  dealLinkShare: "Copy or share my Deal Link",
  yourShare: "Your share",
  rewardPeriod: "Reward period",
  shareValue: "25%",
  rewardValue: "3 months",
  copyDealLinkToast: "Deal Link copied.",
  headingEdit: "Edit your card",
  headingPreview: "Brand preview",
  introEdit: "Update your profile on the left. Your live card updates on the right.",
  introPreview: "This is how brands see your card. Flip it for performance details.",
  dealLinkShareShort: "Copy Deal Link",
  flipHint: "Tap the arrow under the card to flip between profile and performance.",
  companySees: "What brands see below the card",
  sectionsHeading: "Profile sections",
  sectionsHint: "Drag to reorder. Hide anything you don’t want brands to see.",
  liveCardLabel: "Live card",
  syncRefreshShort: "Refresh",
};

const profileFr: CreatorProfileCopy = {
  viewModeAria: "Mode d’affichage",
  tabEdit: "Éditer",
  tabPreview: "Aperçu",
  changePhoto: "Changer la photo de profil",
  syncedSuffix: " · synchronisé le {date}",
  marketplacePrivate: "Carte Marketplace privée",
  marketplacePrivateHint:
    "Vous pouvez compléter votre carte et votre prix maintenant. Elle devient réservable après validation commerciale.",
  sectionAbout: "À propos",
  sectionAudience: "Audience & métriques moyennes",
  sectionPricing: "Tarification",
  dragToReorderTitle: "Glisser pour réordonner",
  editDescriptionAria: "Modifier la description",
  hideSectionAria: "Masquer la section",
  showSectionAgainTitle: "Réafficher cette section",
  addASection: "Ajouter une section",
  hiddenSectionsHeading: "Sections masquées",
  hiddenSectionsEmpty: "Les sections masquées apparaissent ici. Cliquez pour les réafficher.",
  followers: "Abonnés",
  basedIn: "Basé à",
  pricePerPost: "Prix par post",
  priceNotSet: "Non défini",
  bundleLabel: "Pack",
  bundleNoneSet: "Aucun",
  bookCtaButton: "Réserver un post",
  editPriceAndBundles: "Modifier prix & packs",
  setMyPrice: "Définir mon prix",
  syncCardTitle: "Données LinkedIn",
  syncStatusPublicProfile: "Profil public · non vérifié",
  syncLastUpdate: "Dernière mise à jour",
  syncPublicRefreshCta: "Actualiser le profil et les abonnés",
  syncRefreshing: "Actualisation…",
  syncPublicQueued: "Mise à jour lancée. Les infos publiques de votre carte se rafraîchiront bientôt.",
  syncBecomeVerifiedTitle: "Devenir Naano Verified",
  syncBecomeVerifiedBody:
    "L’actualisation publique suffit pour la carte de base. Pour débloquer les analytics Naano Verified, connectez l’extension navigateur.",
  syncBecomeVerifiedCta: "Utiliser l’extension",
  syncExtensionComingSoonBadge: "Extension bientôt disponible",
  modalEditDescriptionTitle: "Modifier la description",
  aboutTextareaPlaceholder: "Présentez-vous aux marques — votre histoire, ce que vous créez, vos résultats…",
  yourIndustries: "Vos industries",
  maxThree: "max 3",
  modalEditPriceTitle: "Modifier prix & packs",
  modalAddSectionTitle: "Ajouter une section",
  titleLabel: "Titre",
  titleInputPlaceholder: "ex. Pourquoi les marques travaillent avec moi",
  contentLabel: "Contenu",
  sectionBodyDefaultPlaceholder: "Ajoutez ce que les marques doivent voir — pitch, formats, résultats, liens…",
  cancel: "Annuler",
  save: "Enregistrer",
  addSection: "Ajouter",
  emptySection: "Section vide.",
  bookToast: "La réservation s’ouvre pour les marques sur votre carte publique.",
  savedToast: "Profil mis à jour.",
  photoToast: "L’upload photo sera branché au stockage ensuite.",
  photoUploading: "Upload…",
  photoSaved: "Photo de profil mise à jour.",
  photoError: "Impossible d’uploader la photo. Essayez une autre image.",
  saveError: "Impossible d’enregistrer. Réessayez.",
  syncErrorMissingLinkedInUrl: "Ajoutez d’abord votre URL LinkedIn à l’onboarding.",
  syncErrorGeneric: "Échec de l’actualisation LinkedIn. Réessayez dans un moment.",
  shareCard: "Partager la carte",
  shareToast: "Lien de la carte copié.",
  noPostData: "Aucune donnée de post",
  dataLabel: "Données",
  dataPending: "En attente",
  impressions: "Impressions",
  chosenCost: "Prix choisi",
  engagement: "Taux d’engagement",
  performanceTitle: "Performance & ICP",
  performanceSub: "Portée LinkedIn publique et signaux d’audience pour les marques.",
  publicDataNote: "Données LinkedIn publiques estimées par Naano",
  audiencePending: "Les stats d’audience se débloquent avec plus de posts publics.",
  flipToBack: "Voir la performance",
  flipToFront: "Revenir à la carte",
  cardFrontAria: "Aperçu de la carte Marketplace de {name}",
  cardBackAria: "Performance LinkedIn et audience de {name}",
  storefrontEyebrow: "Votre vitrine créateur",
  storefrontTitle: "Votre carte Naano, prête à voyager.",
  storefrontSub:
    "Partagez une preuve claire de votre positionnement, audience et offres. Chaque amélioration rend la carte plus utile aux marques.",
  dealLinkEyebrow: "Votre carte est votre Deal Link",
  dealLinkTitle: "Mettez-la sur LinkedIn. Gagnez quand une marque rejoint via ce lien.",
  dealLinkBody: "Votre carte publique présente votre profil et vous garde sélectionné quand une marque crée son compte.",
  dealLinkLinkedInTitle: "Ajoutez-la comme expérience LinkedIn",
  dealLinkLinkedInBody: "Gardez votre carte visible sur votre profil pour que les marques vous découvrent.",
  dealLinkSendTitle: "Envoyez-la quand une marque vous contacte",
  dealLinkSendBody: "Quand vous recevez une demande de collab, partagez votre carte pour que le deal passe par Naano.",
  dealLinkShare: "Copier ou partager mon Deal Link",
  yourShare: "Votre part",
  rewardPeriod: "Période de reward",
  shareValue: "25 %",
  rewardValue: "3 mois",
  copyDealLinkToast: "Deal Link copié.",
  headingEdit: "Modifier votre carte",
  headingPreview: "Aperçu marque",
  introEdit: "Modifiez votre profil à gauche. La carte se met à jour à droite.",
  introPreview: "Voici comment les marques voient votre carte. Retournez-la pour la performance.",
  dealLinkShareShort: "Copier le Deal Link",
  flipHint: "Touchez la flèche sous la carte pour basculer profil / performance.",
  companySees: "Ce que les marques voient sous la carte",
  sectionsHeading: "Sections du profil",
  sectionsHint: "Glissez pour réordonner. Masquez ce que les marques ne doivent pas voir.",
  liveCardLabel: "Carte en direct",
  syncRefreshShort: "Actualiser",
};

export const creatorProfileCopy: Record<Locale, CreatorProfileCopy> = {
  en: profileEn,
  fr: profileFr,
};

export function fillProfile(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}
