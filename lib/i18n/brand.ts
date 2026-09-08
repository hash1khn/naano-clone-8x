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

export type BillingCopy = {
  title: string;
  sub: string;
  needHelp: string;
  availableBalance: string;
  readyToSpend: string;
  addBudget: string;
  addBudgetSub: string;
  invoices: string;
  tabAll: string;
  tabTopups: string;
  tabBookings: string;
  colRef: string;
  colDate: string;
  colType: string;
  colAmount: string;
  colStatus: string;
  colActions: string;
  emptyAll: string;
  emptyTopups: string;
  emptyBookings: string;
  secureBadge: string;
  chooseAmount: string;
  customAmount: string;
  minNote: string;
  youWillCredit: string;
  currentBalance: string;
  trustCard: string;
  trustCardBody: string;
  trustNoSub: string;
  trustNoSubBody: string;
  trustPay: string;
  trustPayBody: string;
  addAmount: string;
  foot: string;
  demoNote: string;
  close: string;
  topupLabel: string;
  stPaid: string;
  demoEntry: string;
  added: string;
};

const billingEn: BillingCopy = {
  title: "Billing",
  sub: "Manage your budget, plan and invoices.",
  needHelp: "Need help?",
  availableBalance: "Available balance",
  readyToSpend: "Ready to spend across your campaigns.",
  addBudget: "Add budget",
  addBudgetSub: "One-time deposit to your Naano balance. Use it across all campaigns — no subscription.",
  invoices: "Invoices",
  tabAll: "All",
  tabTopups: "Top-ups",
  tabBookings: "Bookings",
  colRef: "Reference",
  colDate: "Date",
  colType: "Type",
  colAmount: "Amount",
  colStatus: "Status",
  colActions: "Actions",
  emptyAll: "No invoices or entries yet.",
  emptyTopups: "No top-ups yet.",
  emptyBookings: "No booking entries yet.",
  secureBadge: "Secure payment",
  chooseAmount: "Choose an amount",
  customAmount: "Custom amount",
  minNote: "Minimum {min} · credited right after payment",
  youWillCredit: "You will credit",
  currentBalance: "Current balance",
  trustCard: "Card payment",
  trustCardBody: " — entered only on Stripe’s secure checkout (PCI DSS).",
  trustNoSub: "No subscription",
  trustNoSubBody: " — funds stay in your Naano balance until used.",
  trustPay: "Pay on delivery",
  trustPayBody: " — creators are charged only after the post is delivered.",
  addAmount: "Add {amount}",
  foot: "End-to-end encrypted · powered by Stripe",
  demoNote: "Demo mode — no payment is taken.",
  close: "Close",
  topupLabel: "Budget top-up",
  stPaid: "Paid",
  demoEntry: "Demo entry",
  added: "{amount} added to your wallet (demo).",
};

const billingFr: BillingCopy = {
  title: "Facturation",
  sub: "Gérez votre budget, votre offre et vos factures.",
  needHelp: "Besoin d’aide ?",
  availableBalance: "Solde disponible",
  readyToSpend: "Prêt à dépenser sur vos campagnes.",
  addBudget: "Ajouter du budget",
  addBudgetSub: "Dépôt unique sur votre solde Naano. Utilisable sur toutes les campagnes — sans abonnement.",
  invoices: "Factures",
  tabAll: "Tout",
  tabTopups: "Recharges",
  tabBookings: "Bookings",
  colRef: "Référence",
  colDate: "Date",
  colType: "Type",
  colAmount: "Montant",
  colStatus: "Statut",
  colActions: "Actions",
  emptyAll: "Aucune facture ni écriture pour le moment.",
  emptyTopups: "Aucune recharge pour le moment.",
  emptyBookings: "Aucune écriture de booking pour le moment.",
  secureBadge: "Paiement sécurisé",
  chooseAmount: "Choisir un montant",
  customAmount: "Montant libre",
  minNote: "Minimum {min} · crédité juste après le paiement",
  youWillCredit: "Vous allez créditer",
  currentBalance: "Solde actuel",
  trustCard: "Paiement par carte",
  trustCardBody: " — saisie uniquement sur le checkout sécurisé Stripe (PCI DSS).",
  trustNoSub: "Pas d’abonnement",
  trustNoSubBody: " — les fonds restent sur votre solde Naano jusqu’à utilisation.",
  trustPay: "Paiement à la livraison",
  trustPayBody: " — les créateurs sont payés seulement après publication du post.",
  addAmount: "Ajouter {amount}",
  foot: "Chiffrement de bout en bout · propulsé par Stripe",
  demoNote: "Mode démo — aucun paiement n’est prélevé.",
  close: "Fermer",
  topupLabel: "Recharge de budget",
  stPaid: "Payé",
  demoEntry: "Écriture démo",
  added: "{amount} ajouté à votre wallet (démo).",
};

export const billingCopy: Record<Locale, BillingCopy> = {
  en: billingEn,
  fr: billingFr,
};

export type CollaborationsCopy = {
  title: string;
  collaborationsLabel: string;
  committed: string;
  toDo: string;
  allCampaigns: string;
  openCampaign: string;
  searchPh: string;
  tabAll: string;
  tabActive: string;
  tabReceived: string;
  tabInvited: string;
  tabAction: string;
  tabCompleted: string;
  colCreator: string;
  colCampaign: string;
  colStatus: string;
  colNext: string;
  colDue: string;
  colAmount: string;
  colUpdated: string;
  followers: string;
  emptyAll: string;
  emptyTab: string;
  showing: string;
  showingNone: string;
  rowsPerPage: string;
  campaignFallback: string;
  creatorFallback: string;
  stAwait: string;
  stAccepted: string;
  stLive: string;
  stDone: string;
  stDraft: string;
  stApp: string;
  nextAwait: string;
  nextAccepted: string;
  nextDraft: string;
  nextLive: string;
  nextApp: string;
  review: string;
  approve: string;
  advance: string;
  messageCreator: string;
  copyLink: string;
  linkCopied: string;
  close: string;
  detailTitle: string;
  trackingLink: string;
  goMarketplace: string;
};

const collaborationsEn: CollaborationsCopy = {
  title: "Collaborations",
  collaborationsLabel: "collaborations",
  committed: "committed",
  toDo: "to do",
  allCampaigns: "All campaigns",
  openCampaign: "Open campaign",
  searchPh: "Search creators, campaigns…",
  tabAll: "All",
  tabActive: "Active",
  tabReceived: "Invitations received",
  tabInvited: "Invitations sent",
  tabAction: "To do",
  tabCompleted: "Completed",
  colCreator: "Creator",
  colCampaign: "Campaign",
  colStatus: "Status",
  colNext: "Next action",
  colDue: "Due date",
  colAmount: "Amount",
  colUpdated: "Updated",
  followers: "followers",
  emptyAll: "No collaborations yet, invite a creator from the Marketplace.",
  emptyTab: "Nothing in this tab yet.",
  showing: "Showing {from} to {to} of {total} collaborations",
  showingNone: "0 collaborations",
  rowsPerPage: "Rows per page:",
  campaignFallback: "Campaign",
  creatorFallback: "Creator",
  stAwait: "Awaiting creator",
  stAccepted: "Awaiting the post",
  stLive: "Posted",
  stDone: "Completed",
  stDraft: "Draft to review",
  stApp: "Application received",
  nextAwait: "Waiting for the creator",
  nextAccepted: "Waiting for the post",
  nextDraft: "Review the draft",
  nextLive: "Approve & release payout",
  nextApp: "Review application",
  review: "Review",
  approve: "Approve",
  advance: "Advance status",
  messageCreator: "Message creator",
  copyLink: "Copy tracking link",
  linkCopied: "Copied",
  close: "Close",
  detailTitle: "Collaboration detail",
  trackingLink: "Tracking link",
  goMarketplace: "Open Marketplace",
};

const collaborationsFr: CollaborationsCopy = {
  title: "Collaborations",
  collaborationsLabel: "collaborations",
  committed: "engagé",
  toDo: "à faire",
  allCampaigns: "Toutes les campagnes",
  openCampaign: "Ouvrir la campagne",
  searchPh: "Rechercher créateurs, campagnes…",
  tabAll: "Toutes",
  tabActive: "Actives",
  tabReceived: "Invitations reçues",
  tabInvited: "Invitations envoyées",
  tabAction: "À faire",
  tabCompleted: "Terminées",
  colCreator: "Créateur",
  colCampaign: "Campagne",
  colStatus: "Statut",
  colNext: "Prochaine action",
  colDue: "Échéance",
  colAmount: "Montant",
  colUpdated: "Mis à jour",
  followers: "abonnés",
  emptyAll: "Pas encore de collaborations, invitez un créateur depuis la Marketplace.",
  emptyTab: "Rien dans cet onglet pour le moment.",
  showing: "Affichage de {from} à {to} sur {total} collaborations",
  showingNone: "0 collaborations",
  rowsPerPage: "Lignes par page :",
  campaignFallback: "Campagne",
  creatorFallback: "Créateur",
  stAwait: "En attente du créateur",
  stAccepted: "En attente du post",
  stLive: "Publié",
  stDone: "Terminée",
  stDraft: "Brouillon à valider",
  stApp: "Candidature reçue",
  nextAwait: "En attente du créateur",
  nextAccepted: "En attente du post",
  nextDraft: "Valider le brouillon",
  nextLive: "Approuver et libérer le paiement",
  nextApp: "Examiner la candidature",
  review: "Examiner",
  approve: "Approuver",
  advance: "Avancer le statut",
  messageCreator: "Message au créateur",
  copyLink: "Copier le lien de tracking",
  linkCopied: "Copié",
  close: "Fermer",
  detailTitle: "Détail de la collaboration",
  trackingLink: "Lien de tracking",
  goMarketplace: "Ouvrir la Marketplace",
};

export const collaborationsCopy: Record<Locale, CollaborationsCopy> = {
  en: collaborationsEn,
  fr: collaborationsFr,
};

export type ResultsCopy = {
  title: string;
  tabAnalytics: string;
  tabLeads: string;
  tabPosts: string;
  allCampaigns: string;
  campaignFilter: string;
  estReach: string;
  noPublishedPosts: string;
  qualifiedClicks: string;
  last30Days: string;
  clicksTip: string;
  committedBudget: string;
  bookingsNote: string;
  spendTip: string;
  perfTitle: string;
  periodWeek: string;
  periodMonth: string;
  periodYear: string;
  legendHint: string;
  postPerformance: string;
  withoutPixel: string;
  nativePostMetrics: string;
  postsCount: string;
  reactions: string;
  comments: string;
  viewPosts: string;
  siteConversions: string;
  siteConversionsBody: string;
  installPixel: string;
  people: string;
  inIcp: string;
  companies: string;
  highPriority: string;
  peopleTab: string;
  companiesTab: string;
  searchLeads: string;
  allPriorities: string;
  prioWarm: string;
  prioNew: string;
  icpOnly: string;
  colPerson: string;
  colCompany: string;
  colEngagement: string;
  colSource: string;
  colPriority: string;
  emptyPeople: string;
  emptyCompanies: string;
  noFilterMatch: string;
  publishedContent: string;
  viewTable: string;
  viewFeed: string;
  exportLabel: string;
  tabAllPosts: string;
  tabLinkedin: string;
  tabX: string;
  colPost: string;
  colCampaign: string;
  colPublished: string;
  colReactions: string;
  colComments: string;
  colStatus: string;
  emptyPosts: string;
  emptyX: string;
  rowsPerPage: string;
  exportIcp: string;
};

const resultsEn: ResultsCopy = {
  title: "Results",
  tabAnalytics: "Analytics",
  tabLeads: "Leads",
  tabPosts: "Posts",
  allCampaigns: "All campaigns",
  campaignFilter: "Campaign",
  estReach: "Est. reach",
  noPublishedPosts: "No published posts yet",
  qualifiedClicks: "Qualified clicks",
  last30Days: "last 30 days",
  clicksTip: "Qualified clicks tracked on your creators' links.",
  committedBudget: "Committed budget",
  bookingsNote: "{n} bookings",
  spendTip: "Budget committed in escrow on your creator bookings.",
  perfTitle: "Performance over time",
  periodWeek: "Week",
  periodMonth: "Month",
  periodYear: "Year",
  legendHint: "Click a card or the legend to zoom",
  postPerformance: "Post performance",
  withoutPixel: "Without a pixel",
  nativePostMetrics: "Latest metrics collected from your posts.",
  postsCount: "Posts",
  reactions: "reactions",
  comments: "comments",
  viewPosts: "View posts",
  siteConversions: "Measure site conversions",
  siteConversionsBody: "Connect the pixel to add visits, sign-ups and revenue to your post results.",
  installPixel: "Install the pixel",
  people: "people",
  inIcp: "In ICP",
  companies: "companies",
  highPriority: "High priority",
  peopleTab: "People",
  companiesTab: "Companies",
  searchLeads: "Search leads",
  allPriorities: "All priorities",
  prioWarm: "Warm",
  prioNew: "New",
  icpOnly: "In your ICP",
  colPerson: "Person",
  colCompany: "Company",
  colEngagement: "Engagement",
  colSource: "Source",
  colPriority: "Priority",
  emptyPeople: "No one yet, the people who engage with your posts land here.",
  emptyCompanies: "No companies identified yet.",
  noFilterMatch: "No leads match these filters.",
  publishedContent: "Published content",
  viewTable: "Table",
  viewFeed: "Feed",
  exportLabel: "Export",
  tabAllPosts: "All posts",
  tabLinkedin: "LinkedIn",
  tabX: "X (Twitter)",
  colPost: "Post",
  colCampaign: "Campaign",
  colPublished: "Published",
  colReactions: "Reactions",
  colComments: "Comments",
  colStatus: "Status",
  emptyPosts: "No posts published yet.",
  emptyX: "No X posts. The X integration is coming, your LinkedIn posts live in the LinkedIn tab.",
  rowsPerPage: "Rows per page:",
  exportIcp: "Export ICP leads",
};

const resultsFr: ResultsCopy = {
  title: "Résultats",
  tabAnalytics: "Analytique",
  tabLeads: "Leads",
  tabPosts: "Posts",
  allCampaigns: "Toutes les campagnes",
  campaignFilter: "Campagne",
  estReach: "Portée estimée",
  noPublishedPosts: "Aucun post publié pour le moment",
  qualifiedClicks: "Clics qualifiés",
  last30Days: "30 derniers jours",
  clicksTip: "Clics qualifiés suivis sur les liens de vos créateurs.",
  committedBudget: "Budget engagé",
  bookingsNote: "{n} bookings",
  spendTip: "Budget engagé en séquestre sur vos bookings créateurs.",
  perfTitle: "Performance dans le temps",
  periodWeek: "Semaine",
  periodMonth: "Mois",
  periodYear: "Année",
  legendHint: "Cliquez une carte ou la légende pour zoomer",
  postPerformance: "Performance des posts",
  withoutPixel: "Sans pixel",
  nativePostMetrics: "Dernières métriques collectées sur vos posts.",
  postsCount: "Posts",
  reactions: "réactions",
  comments: "commentaires",
  viewPosts: "Voir les posts",
  siteConversions: "Mesurer les conversions du site",
  siteConversionsBody: "Connectez le pixel pour ajouter visites, inscriptions et revenu aux résultats de vos posts.",
  installPixel: "Installer le pixel",
  people: "personnes",
  inIcp: "Dans l’ICP",
  companies: "entreprises",
  highPriority: "haute priorité",
  peopleTab: "Personnes",
  companiesTab: "Entreprises",
  searchLeads: "Rechercher des leads",
  allPriorities: "Toutes les priorités",
  prioWarm: "Tiède",
  prioNew: "Nouveau",
  icpOnly: "Dans votre ICP",
  colPerson: "Personne",
  colCompany: "Entreprise",
  colEngagement: "Engagement",
  colSource: "Source",
  colPriority: "Priorité",
  emptyPeople: "Personne pour le moment, les profils qui engagent vos posts apparaissent ici.",
  emptyCompanies: "Aucune entreprise identifiée pour le moment.",
  noFilterMatch: "Aucun lead ne correspond à ces filtres.",
  publishedContent: "Contenu publié",
  viewTable: "Tableau",
  viewFeed: "Fil",
  exportLabel: "Exporter",
  tabAllPosts: "Tous les posts",
  tabLinkedin: "LinkedIn",
  tabX: "X (Twitter)",
  colPost: "Post",
  colCampaign: "Campagne",
  colPublished: "Publié",
  colReactions: "Réactions",
  colComments: "Commentaires",
  colStatus: "Statut",
  emptyPosts: "Aucun post publié pour le moment.",
  emptyX: "Aucun post X. L’intégration X arrive, vos posts LinkedIn sont dans l’onglet LinkedIn.",
  rowsPerPage: "Lignes par page :",
  exportIcp: "Exporter les leads ICP",
};

export const resultsCopy: Record<Locale, ResultsCopy> = {
  en: resultsEn,
  fr: resultsFr,
};

export type CampaignsCopy = {
  title: string;
  createCampaign: string;
  createCampaignHelp: string;
  createCampaignCta: string;
  createCampaignEmpty: string;
  creatorsLabel: string;
  publishedCount: string;
  budgetCommitted: string;
  campaignsLabel: string;
  scopeAria: string;
  scopeAll: string;
  scopeActive: string;
  scopeDraft: string;
  scopeCompleted: string;
  noCampaignsFilter: string;
  noCampaignsFilterHelp: string;
  createdOn: string;
  noBriefSummary: string;
  statusDraft: string;
  statusLive: string;
  statusPaused: string;
  statusCompleted: string;
  launchAria: string;
  howToLaunch: string;
  howToLaunchSub: string;
  teamTitle: string;
  teamDesc: string;
  teamCta: string;
  teamSlot: string;
  aiTitle: string;
  aiDesc: string;
  aiCta: string;
  aiTime: string;
  aiBubble: string;
  linkTitle: string;
  linkDesc: string;
  linkCta: string;
  linkTime: string;
  linkChip: string;
  linkSubmit: string;
  linkPlaceholder: string;
  chatHero: string;
  chatPlaceholder: string;
  send: string;
  back: string;
};

const campaignsEn: CampaignsCopy = {
  title: "Campaigns",
  createCampaign: "Create a campaign",
  createCampaignHelp: "Launch a new campaign in 2 minutes — with AI, the Naano team, or an existing link.",
  createCampaignCta: "Get started",
  createCampaignEmpty: "+ Create campaign",
  creatorsLabel: "Creators",
  publishedCount: "Published",
  budgetCommitted: "Committed budget",
  campaignsLabel: "campaigns",
  scopeAria: "Filters",
  scopeAll: "All",
  scopeActive: "Active",
  scopeDraft: "Draft",
  scopeCompleted: "Completed",
  noCampaignsFilter: "No campaigns in this view",
  noCampaignsFilterHelp: "Change the filter or create a new campaign.",
  createdOn: "Created on {date}",
  noBriefSummary: "Brief to complete",
  statusDraft: "Draft",
  statusLive: "Active",
  statusPaused: "Paused",
  statusCompleted: "Completed",
  launchAria: "Launch a campaign",
  howToLaunch: "How do you want to launch your campaign?",
  howToLaunchSub: "Choose your method. You can change everything before launch.",
  teamTitle: "Launch free with the Naano team",
  teamDesc:
    "A campaign manager turns your selection into a ready-to-launch campaign. You validate, they handle the rest.",
  teamCta: "Book my onboarding  →",
  teamSlot: "Today · 14:30 · 15 min",
  aiTitle: "Create with AI",
  aiDesc: "AI asks the right questions and prepares a fully editable brief.",
  aiCta: "Create with AI",
  aiTime: "5 min",
  aiBubble: "I want to reach VP Sales in B2B SaaS in France.",
  linkTitle: "Start from your link",
  linkDesc: "Paste an influence campaign you already ran: Naano reuses the brief and structure.",
  linkCta: "Start from my link",
  linkTime: "1 min",
  linkChip: "Brief recovered",
  linkSubmit: "Create →",
  linkPlaceholder: "https://notion.site/brief…",
  chatHero: "Generate your campaign in one click",
  chatPlaceholder: "Let’s build this campaign together…",
  send: "Send",
  back: "Back",
};

const campaignsFr: CampaignsCopy = {
  title: "Campagnes",
  createCampaign: "Créer une campagne",
  createCampaignHelp: "Lancez une nouvelle campagne en 2 minutes — avec l’IA, l’équipe Naano, ou un lien existant.",
  createCampaignCta: "Commencer",
  createCampaignEmpty: "+ Créer une campagne",
  creatorsLabel: "Créateurs",
  publishedCount: "Publiés",
  budgetCommitted: "Budget engagé",
  campaignsLabel: "campagnes",
  scopeAria: "Filtres",
  scopeAll: "Tous",
  scopeActive: "Actives",
  scopeDraft: "Brouillon",
  scopeCompleted: "Terminées",
  noCampaignsFilter: "Aucune campagne dans cette vue",
  noCampaignsFilterHelp: "Changez le filtre ou créez une nouvelle campagne.",
  createdOn: "Créée le {date}",
  noBriefSummary: "Brief à compléter",
  statusDraft: "Brouillon",
  statusLive: "Active",
  statusPaused: "En pause",
  statusCompleted: "Terminée",
  launchAria: "Lancer une campagne",
  howToLaunch: "Comment voulez-vous lancer votre campagne ?",
  howToLaunchSub: "Choisissez votre méthode. Vous pourrez tout modifier avant le lancement.",
  teamTitle: "Lancez gratuitement avec l’équipe Naano",
  teamDesc:
    "Un campaign manager transforme votre sélection en campagne prête à lancer. Vous validez, ils s’occupent du reste.",
  teamCta: "Réserver mon onboarding  →",
  teamSlot: "Aujourd’hui · 14:30 · 15 min",
  aiTitle: "Créer avec l’IA",
  aiDesc: "L’IA pose les bonnes questions et prépare un brief entièrement modifiable.",
  aiCta: "Créer avec l’IA",
  aiTime: "5 min",
  aiBubble: "Je veux atteindre des VP Sales en SaaS B2B en France.",
  linkTitle: "Partir de votre lien",
  linkDesc: "Collez une campagne d’influence déjà réalisée : Naano réutilise le brief et la structure.",
  linkCta: "Partir de mon lien",
  linkTime: "1 min",
  linkChip: "Brief récupéré",
  linkSubmit: "Créer →",
  linkPlaceholder: "https://notion.site/brief…",
  chatHero: "Générez votre campagne en un clic",
  chatPlaceholder: "Construisons cette campagne ensemble…",
  send: "Envoyer",
  back: "Retour",
};

export const campaignsCopy: Record<Locale, CampaignsCopy> = {
  en: campaignsEn,
  fr: campaignsFr,
};

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
