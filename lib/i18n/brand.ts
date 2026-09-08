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
  perPost: string;
  addCreator: string;
  expertTag: string;
  expertTitle: string;
  expertBody: string;
  expertCta: string;
  expertNote: string;
  availableBalance: string;
  signOut: string;
  settings: string;
  inviteCreators: string;
  wallet: string;
  connectMcp: string;
  getStarted: string;
  getStartedBody: string;
  helpFind: string;
  noCreators: string;
};

const en: BrandCopy = {
  overview: "Overview",
  marketplace: "Creators",
  campaigns: "Campaigns",
  collaborations: "Collaborations",
  results: "Results",
  messages: "Messages",
  billing: "Billing",
  integrations: "Integrations",
  hello: "Hello {name} 👋",
  happeningFor: "Here is what is happening for {workspace} on Naano.",
  newCampaign: "New campaign",
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
  fromPrice: "from",
  perPost: "/post",
  addCreator: "Add",
  expertTag: "Naano experts available",
  expertTitle: "Need an expert eye? Book a free call.",
  expertBody:
    "15 minutes with a Naano expert to frame your next campaign, sharpen your shortlist or improve the posts already running.",
  expertCta: "Book a free call →",
  expertNote: "No commitment · Slot available today",
  availableBalance: "Available balance",
  signOut: "Sign out",
  settings: "Settings",
  inviteCreators: "Invite Creators",
  wallet: "€{amount}",
  connectMcp: "Naano MCP / Connect →",
  getStarted: "Get started",
  getStartedBody: "Discover the marketplace",
  helpFind: "What can I help you find?",
  noCreators: "No creators to show yet.",
};

const fr: BrandCopy = {
  overview: "Vue d'ensemble",
  marketplace: "Créateurs",
  campaigns: "Campagnes",
  collaborations: "Collaborations",
  results: "Résultats",
  messages: "Messages",
  billing: "Facturation",
  integrations: "Intégrations",
  hello: "Bonjour {name} 👋",
  happeningFor: "Voici ce qui se passe pour {workspace} sur Naano.",
  newCampaign: "Nouvelle campagne",
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
  fromPrice: "à partir de",
  perPost: "/post",
  addCreator: "Ajouter",
  expertTag: "Experts Naano disponibles",
  expertTitle: "Besoin d'un œil expert ? Réservez un appel gratuit.",
  expertBody:
    "15 minutes avec un expert Naano pour cadrer votre prochaine campagne, affiner votre shortlist ou améliorer les posts déjà en ligne.",
  expertCta: "Réserver un appel gratuit →",
  expertNote: "Sans engagement · Créneau disponible aujourd'hui",
  availableBalance: "Solde disponible",
  signOut: "Déconnexion",
  settings: "Paramètres",
  inviteCreators: "Inviter des créateurs",
  wallet: "{amount} €",
  connectMcp: "Naano MCP / Connecter →",
  getStarted: "Démarrer",
  getStartedBody: "Découvrir la marketplace",
  helpFind: "Que puis-je vous aider à trouver ?",
  noCreators: "Aucun créateur à afficher pour le moment.",
};

export const brandCopy: Record<Locale, BrandCopy> = { en, fr };

export type MarketplaceCopy = {
  title: string;
  allCreatorsTitle: string;
  aiTitle: string;
  aiSub: string;
  rankedTitle: string;
  rankedSub: string;
  experienceAi: string;
  experienceMarketplace: string;
  tabAll: string;
  tabSaved: string;
  searchPh: string;
  sortBy: string;
  sortRel: string;
  sortPrice: string;
  sortFol: string;
  industry: string;
  country: string;
  price: string;
  filters: string;
  results: string;
  reset: string;
  searchIndustry: string;
  searchCountry: string;
  priceRange: string;
  priceRangeHint: string;
  minPrice: string;
  maxPrice: string;
  clear: string;
  applyPrice: string;
  minFollowers: string;
  maxFollowers: string;
  applyFilters: string;
  clearFilters: string;
  performanceFilters: string;
  filtersHint: string;
  topRanked: string;
  topRankedBody: string;
  emptyFilters: string;
  emptyShortlist: string;
  emptyCatalogue: string;
  viewProfile: string;
  book: string;
  star: string;
  unstar: string;
  followers: string;
  medianViews: string;
  cpm: string;
  postCost: string;
  creatorLabel: string;
  linkedinCreator: string;
  overview: string;
  audience: string;
  content: string;
  creatorOverview: string;
  overviewBody: string;
  audienceSnapshot: string;
  audienceUnavailable: string;
  audienceComposition: string;
  audienceHelp: string;
  contentPerformance: string;
  contentUnavailable: string;
  reachUnavailable: string;
  professionalProfile: string;
  aboutCreator: string;
  contentSignals: string;
  contentSignalsHelp: string;
  latestPost: string;
  cadence: string;
  typicalRange: string;
  postsAnalyzed: string;
  linkedinPosts: string;
  publicPost: string;
  openOriginal: string;
  seeFullPost: string;
  postPosition: string;
  notAvailable: string;
  bookThisCreator: string;
  singlePost: string;
  typicalReach: string;
  estimatedCpm: string;
  howPricing: string;
  pricingBody: string;
  collaborateWith: string;
  secureBooking: string;
  selectionTitle: string;
  creatorRate: string;
  standardRate: string;
  selectionBody: string;
  back: string;
  negotiate: string;
  bookPrice: string;
  close: string;
  naoEyebrow: string;
  naoHero: string;
  naoAccent: string;
  naoBody: string;
  naoPlaceholder: string;
  naoDisclaimer: string;
  startersLabel: string;
  starterCompany: string;
  starterNew: string;
  starterViews: string;
  naoSelection: string;
  naoSelectionTitle: string;
  naoAnswerTitle: string;
  naoAnswerBody: string;
  naoZeroTitle: string;
  naoZeroBody: string;
  dockPlaceholder: string;
  loadingProfile: string;
};

const marketplaceEn: MarketplaceCopy = {
  title: "Browse creators",
  allCreatorsTitle: "All creators",
  aiTitle: "AI creator matching",
  aiSub: "Describe the campaign. Nao will search, filter and explain the strongest creator matches.",
  rankedTitle: "Ranked for your company",
  rankedSub:
    "All creators are shown from most to least relevant, using sector fit first and verified performance statistics to refine the order.",
  experienceAi: "AI Matching",
  experienceMarketplace: "Creator Marketplace",
  tabAll: "All creators",
  tabSaved: "Shortlist",
  searchPh: "Search for a creator…",
  sortBy: "Sort by",
  sortRel: "Best match",
  sortPrice: "Price: low to high",
  sortFol: "Most followers",
  industry: "Industry",
  country: "Country",
  price: "Price",
  filters: "Filters",
  results: "creators",
  reset: "Reset",
  searchIndustry: "Search an industry…",
  searchCountry: "Search a country…",
  priceRange: "Price range",
  priceRangeHint: "Price per sponsored post",
  minPrice: "Minimum",
  maxPrice: "Maximum",
  clear: "Clear",
  applyPrice: "Apply price",
  minFollowers: "Minimum followers",
  maxFollowers: "Maximum followers",
  applyFilters: "Apply filters",
  clearFilters: "Clear",
  performanceFilters: "Performance filters",
  filtersHint: "These filters hide creators; matching scores stay unchanged.",
  topRanked: "Top ranked creators",
  topRankedBody: "Profiles from the catalogue, ordered by the current sort.",
  emptyFilters: "No creators match these filters. Try removing a filter.",
  emptyShortlist: "No creators on your shortlist yet. Save profiles with the star.",
  emptyCatalogue: "No creators to show yet.",
  viewProfile: "View profile",
  book: "Book",
  star: "Save to my list",
  unstar: "Remove from saved",
  followers: "Followers",
  medianViews: "Median views",
  cpm: "CPM",
  postCost: "Post cost",
  creatorLabel: "Creator",
  linkedinCreator: "LinkedIn creator",
  overview: "Overview",
  audience: "Audience",
  content: "Content",
  creatorOverview: "Creator overview",
  overviewBody: "Review this creator's audience and recent content before booking.",
  audienceSnapshot: "Audience snapshot",
  audienceUnavailable: "Audience data unavailable",
  audienceComposition: "Audience composition",
  audienceHelp: "Top segments by dimension; each bar compares like with like.",
  contentPerformance: "Content performance",
  contentUnavailable: "No public post data available",
  reachUnavailable: "Reach trend unavailable",
  professionalProfile: "Professional profile",
  aboutCreator: "About this creator",
  contentSignals: "Content signals",
  contentSignalsHelp: "What this creator discusses and how consistently the audience responds.",
  latestPost: "Latest post",
  cadence: "Estimated cadence",
  typicalRange: "Typical range",
  postsAnalyzed: "Posts analyzed",
  linkedinPosts: "LinkedIn posts",
  publicPost: "Public LinkedIn post",
  openOriginal: "Open original",
  seeFullPost: "See full post",
  postPosition: "{current} of {total}",
  notAvailable: "Not available",
  bookThisCreator: "Book this creator",
  singlePost: "Single post",
  typicalReach: "Typical reach",
  estimatedCpm: "Estimated CPM",
  howPricing: "How pricing is calculated",
  pricingBody: "Post cost comes from the creator's listed price per post. Median views and CPM stay hidden until verified performance data is available.",
  collaborateWith: "Collaborate with {name}",
  secureBooking: "Secure booking · Creator approves first.",
  selectionTitle: "Your selection",
  creatorRate: "Creator rate",
  standardRate: "Standard rate",
  selectionBody: "Book this option at the listed price, or propose a lower price.",
  back: "Back",
  negotiate: "Negotiate",
  bookPrice: "Book · {price}",
  close: "Close",
  naoEyebrow: "Nao · Creator intelligence",
  naoHero: "Who are you looking for?",
  naoAccent: "Ask Nao.",
  naoBody: "Describe the audience, geography, creative direction or budget. Nao turns your request into a comparable creator shortlist.",
  naoPlaceholder: "Tell Nao who you're looking for…",
  naoDisclaimer: "Nao can make mistakes. Check important information.",
  startersLabel: "Suggested for you",
  starterCompany: "Find creators for your company",
  starterNew: "Show promising new creators",
  starterViews: "Prioritize median views and efficient CPM",
  naoSelection: "Nao's selection",
  naoSelectionTitle: "Creators selected for your request",
  naoAnswerTitle: "Filtered from the catalogue",
  naoAnswerBody: "Showing creators whose name, industry or country matches “{query}”.",
  naoZeroTitle: "No catalogue match",
  naoZeroBody: "Nothing in the current catalogue matched that request. Try a name, industry or country.",
  dockPlaceholder: "What would you like to do?",
  loadingProfile: "Loading audience and performance data…",
};

const marketplaceFr: MarketplaceCopy = {
  title: "Parcourir les créateurs",
  allCreatorsTitle: "Tous les créateurs",
  aiTitle: "Matching IA",
  aiSub: "Décrivez la campagne. Nao cherche, filtre et explique les meilleurs profils.",
  rankedTitle: "Classés pour votre entreprise",
  rankedSub:
    "Tous les créateurs sont affichés du plus au moins pertinent, d'abord par secteur puis par statistiques de performance vérifiées.",
  experienceAi: "Matching IA",
  experienceMarketplace: "Marketplace créateurs",
  tabAll: "Tous les créateurs",
  tabSaved: "Shortlist",
  searchPh: "Rechercher un créateur…",
  sortBy: "Trier par",
  sortRel: "Meilleure correspondance",
  sortPrice: "Prix : croissant",
  sortFol: "Plus d'abonnés",
  industry: "Secteur",
  country: "Pays",
  price: "Prix",
  filters: "Filtres",
  results: "créateurs",
  reset: "Réinitialiser",
  searchIndustry: "Rechercher un secteur…",
  searchCountry: "Rechercher un pays…",
  priceRange: "Fourchette de prix",
  priceRangeHint: "Prix par post sponsorisé",
  minPrice: "Minimum",
  maxPrice: "Maximum",
  clear: "Effacer",
  applyPrice: "Appliquer le prix",
  minFollowers: "Abonnés minimum",
  maxFollowers: "Abonnés maximum",
  applyFilters: "Appliquer les filtres",
  clearFilters: "Effacer",
  performanceFilters: "Filtres de performance",
  filtersHint: "Ces filtres masquent des créateurs ; les scores de matching ne changent pas.",
  topRanked: "Créateurs les mieux classés",
  topRankedBody: "Profils du catalogue, selon le tri actuel.",
  emptyFilters: "Aucun créateur ne correspond à ces filtres. Essayez d'en retirer un.",
  emptyShortlist: "Aucun créateur dans votre shortlist. Enregistrez un profil avec l'étoile.",
  emptyCatalogue: "Aucun créateur à afficher pour le moment.",
  viewProfile: "Voir le profil",
  book: "Réserver",
  star: "Ajouter à ma liste",
  unstar: "Retirer de la liste",
  followers: "Abonnés",
  medianViews: "Vues médianes",
  cpm: "CPM",
  postCost: "Prix du post",
  creatorLabel: "Créateur",
  linkedinCreator: "Créateur LinkedIn",
  overview: "Aperçu",
  audience: "Audience",
  content: "Contenu",
  creatorOverview: "Aperçu du créateur",
  overviewBody: "Consultez l'audience et le contenu récent avant de réserver.",
  audienceSnapshot: "Instantané d'audience",
  audienceUnavailable: "Données d'audience indisponibles",
  audienceComposition: "Composition de l'audience",
  audienceHelp: "Principaux segments par dimension ; chaque barre compare des données comparables.",
  contentPerformance: "Performance du contenu",
  contentUnavailable: "Aucun post public disponible",
  reachUnavailable: "Tendance de portée indisponible",
  professionalProfile: "Profil professionnel",
  aboutCreator: "À propos de ce créateur",
  contentSignals: "Signaux de contenu",
  contentSignalsHelp: "Les sujets abordés et la régularité des réponses de l'audience.",
  latestPost: "Dernier post",
  cadence: "Cadence estimée",
  typicalRange: "Fourchette typique",
  postsAnalyzed: "Posts analysés",
  linkedinPosts: "Posts LinkedIn",
  publicPost: "Post LinkedIn public",
  openOriginal: "Ouvrir l'original",
  seeFullPost: "Voir le post complet",
  postPosition: "{current} sur {total}",
  notAvailable: "Non disponible",
  bookThisCreator: "Réserver ce créateur",
  singlePost: "Post unique",
  typicalReach: "Portée typique",
  estimatedCpm: "CPM estimé",
  howPricing: "Comment le prix est calculé",
  pricingBody: "Le prix vient du tarif au post du créateur. Les vues médianes et le CPM restent masqués tant que les statistiques vérifiées ne sont pas disponibles.",
  collaborateWith: "Collaborer avec {name}",
  secureBooking: "Réservation sécurisée · Le créateur valide d'abord.",
  selectionTitle: "Votre sélection",
  creatorRate: "Tarif créateur",
  standardRate: "Tarif standard",
  selectionBody: "Réservez cette option au prix affiché, ou proposez un prix inférieur.",
  back: "Retour",
  negotiate: "Négocier",
  bookPrice: "Réserver · {price}",
  close: "Fermer",
  naoEyebrow: "Nao · Intelligence créateur",
  naoHero: "Qui cherchez-vous ?",
  naoAccent: "Demandez à Nao.",
  naoBody: "Décrivez l'audience, la géographie, la direction créative ou le budget. Nao en fait une shortlist comparable.",
  naoPlaceholder: "Dites à Nao qui vous cherchez…",
  naoDisclaimer: "Nao peut se tromper. Vérifiez les informations importantes.",
  startersLabel: "Suggéré pour vous",
  starterCompany: "Trouver des créateurs pour votre entreprise",
  starterNew: "Montrer des créateurs prometteurs",
  starterViews: "Prioriser les vues médianes et un CPM efficace",
  naoSelection: "Sélection de Nao",
  naoSelectionTitle: "Créateurs sélectionnés pour votre demande",
  naoAnswerTitle: "Filtré depuis le catalogue",
  naoAnswerBody: "Créateurs dont le nom, le secteur ou le pays correspond à « {query} ».",
  naoZeroTitle: "Aucune correspondance",
  naoZeroBody: "Rien dans le catalogue actuel ne correspond. Essayez un nom, un secteur ou un pays.",
  dockPlaceholder: "Que souhaitez-vous faire ?",
  loadingProfile: "Chargement de l'audience et des performances…",
};

export const marketplaceCopy: Record<Locale, MarketplaceCopy> = {
  en: marketplaceEn,
  fr: marketplaceFr,
};

export type MessagesCopy = {
  title: string;
  newMessage: string;
  searchList: string;
  messageModeAria: string;
  allMessages: string;
  campaignFilter: string;
  chooseCampaign: string;
  chooseCampaignHint: string;
  noCampaigns: string;
  botName: string;
  supportPrompt: string;
  now: string;
  emptyList: string;
  emptyCampaign: string;
  groupCreators: string;
  conversations: string;
  emptyHeadSub: string;
  emptyTitle: string;
  emptyHint: string;
  pickConv: string;
  composerPh: string;
  composerAria: string;
  composerSupportPh: string;
  addAttachment: string;
  addEmoji: string;
  chooseEmoji: string;
  quickReactions: string;
  emojiCount: string;
  sendAria: string;
  helpCenter: string;
  helpStatus: string;
  yourSpace: string;
  howHelp: string;
  helpBody: string;
  availableNow: string;
  orbitAria: string;
  actionPerf: string;
  actionPerfSub: string;
  actionHelp: string;
  actionHelpSub: string;
  actionBug: string;
  actionBugSub: string;
  actionIdea: string;
  actionIdeaSub: string;
  intro: string;
  you: string;
  assistantName: string;
  promptPerf: string;
  promptHelp: string;
  promptBug: string;
  promptIdea: string;
  localReply: string;
  noMessages: string;
  loading: string;
  startFromCollab: string;
  chooseConversation: string;
  bookingPreview: string;
};

const messagesEn: MessagesCopy = {
  title: "Messages",
  newMessage: "New message",
  searchList: "Search conversations",
  messageModeAria: "Message display mode",
  allMessages: "All messages",
  campaignFilter: "Campaign",
  chooseCampaign: "Choose a campaign",
  chooseCampaignHint: "Find every creator associated with a campaign.",
  noCampaigns: "No campaigns yet.",
  botName: "NaanoBot",
  supportPrompt: "Have a question or need help? Click here.",
  now: "Now",
  emptyList: "No conversations yet.",
  emptyCampaign: "No creator conversation for this campaign.",
  groupCreators: "Creators",
  conversations: "Conversations",
  emptyHeadSub: "Threads open with your bookings.",
  emptyTitle: "No conversations yet.",
  emptyHint: "Invite a creator - the thread opens as soon as the first booking is accepted.",
  pickConv: "Select a conversation.",
  composerPh: "Write a message…",
  composerAria: "Write a message",
  composerSupportPh: "Ask Naano a question…",
  addAttachment: "Add an image, video or PDF",
  addEmoji: "Add an emoji",
  chooseEmoji: "Choose an emoji",
  quickReactions: "Quick reactions",
  emojiCount: "12 emojis",
  sendAria: "Send message",
  helpCenter: "Naano help center",
  helpStatus: "Instant assistant · team when needed",
  yourSpace: "Your Naano space",
  howHelp: "How can we help?",
  helpBody:
    "Product question, bug or performance concern: everything stays here and the team steps in when needed.",
  availableNow: "Available now",
  orbitAria: "Activate Naano satellite",
  actionPerf: "Understand my performance",
  actionPerfSub: "Review your analytics",
  actionHelp: "Get product help",
  actionHelpSub: "Get an instant answer",
  actionBug: "Report a bug",
  actionBugSub: "Escalated when needed",
  actionIdea: "Suggest an idea",
  actionIdeaSub: "Share product feedback",
  intro:
    "Hi, I’m the Naano assistant. Ask me a question or choose an option above — the team can step in if needed.",
  you: "You",
  assistantName: "Naano",
  promptPerf: "Why did my latest post perform less well, and what can I test?",
  promptHelp: "I need help using Naano.",
  promptBug: "I want to report a bug: ",
  promptIdea: "I would like to suggest an improvement: ",
  localReply:
    "Thanks — I noted that. A live assistant isn’t connected on this workspace yet, so this stays on your screen until the team can reply.",
  noMessages: "No messages yet - say hello.",
  loading: "Loading…",
  startFromCollab: "Choose a collaboration, then message the creator.",
  chooseConversation: "Choose a creator conversation…",
  bookingPreview: "Booking conversation",
};

const messagesFr: MessagesCopy = {
  title: "Messages",
  newMessage: "Nouveau message",
  searchList: "Rechercher des conversations",
  messageModeAria: "Mode d’affichage des messages",
  allMessages: "Tous les messages",
  campaignFilter: "Campagne",
  chooseCampaign: "Choisir une campagne",
  chooseCampaignHint: "Retrouvez chaque créateur associé à une campagne.",
  noCampaigns: "Aucune campagne pour le moment.",
  botName: "NaanoBot",
  supportPrompt: "Une question ou besoin d’aide ? Cliquez ici.",
  now: "Maintenant",
  emptyList: "Aucune conversation pour le moment.",
  emptyCampaign: "Aucune conversation créateur pour cette campagne.",
  groupCreators: "Créateurs",
  conversations: "Conversations",
  emptyHeadSub: "Les fils s’ouvrent avec vos bookings.",
  emptyTitle: "Aucune conversation pour le moment.",
  emptyHint: "Invitez un créateur — le fil s’ouvre dès que le premier booking est accepté.",
  pickConv: "Sélectionnez une conversation.",
  composerPh: "Écrire un message…",
  composerAria: "Écrire un message",
  composerSupportPh: "Posez une question à Naano…",
  addAttachment: "Ajouter une image, une vidéo ou un PDF",
  addEmoji: "Ajouter un emoji",
  chooseEmoji: "Choisir un emoji",
  quickReactions: "Réactions rapides",
  emojiCount: "12 emojis",
  sendAria: "Envoyer le message",
  helpCenter: "Centre d’aide Naano",
  helpStatus: "Assistant immédiat · équipe si nécessaire",
  yourSpace: "Ton espace Naano",
  howHelp: "Comment peut-on t’aider ?",
  helpBody:
    "Une question produit, un bug ou un doute sur tes performances : tout reste ici et l’équipe reprend la main si nécessaire.",
  availableNow: "Disponible maintenant",
  orbitAria: "Activer le satellite Naano",
  actionPerf: "Comprendre mes performances",
  actionPerfSub: "Analyse tes statistiques",
  actionHelp: "Besoin d’aide",
  actionHelpSub: "Une réponse immédiate",
  actionBug: "Signaler un bug",
  actionBugSub: "Transmis à l’équipe si besoin",
  actionIdea: "Proposer une idée",
  actionIdeaSub: "Partage ton retour produit",
  intro:
    "Bonjour, je suis l’assistant Naano. Pose-moi une question ou choisis une option ci-dessus — l’équipe prendra le relais si nécessaire.",
  you: "Vous",
  assistantName: "Naano",
  promptPerf: "Pourquoi mon dernier post a-t-il moins performé et que puis-je tester ?",
  promptHelp: "J’ai besoin d’aide pour utiliser Naano.",
  promptBug: "Je souhaite signaler un bug : ",
  promptIdea: "J’aimerais proposer une amélioration : ",
  localReply:
    "Merci — c’est noté. Un assistant en direct n’est pas encore connecté sur cet espace, donc le message reste ici jusqu’à une réponse de l’équipe.",
  noMessages: "Pas encore de messages — dites bonjour.",
  loading: "Chargement…",
  startFromCollab: "Choisissez une collaboration, puis écrivez au créateur.",
  chooseConversation: "Choisir une conversation créateur…",
  bookingPreview: "Conversation de booking",
};

export const messagesCopy: Record<Locale, MessagesCopy> = {
  en: messagesEn,
  fr: messagesFr,
};

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
