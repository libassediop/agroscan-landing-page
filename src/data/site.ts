// Réglages et contenus partagés de la landing AgroScan.
// Les chiffres, avis et prix marqués TODO sont provisoires : à valider avant la mise en ligne.

export const site = {
  brand: "AgroScan",
  title: "AgroScan — L'analyse de sol intelligente pour vos parcelles",
  description:
    "AgroScan analyse votre sol, identifie son type et vous recommande les cultures et les amendements adaptés à chaque parcelle.",
  backOfficeUrl: "https://backoffice.agro-scan.com",
  appStoreUrl: "https://apps.apple.com/", // TODO: lien de la fiche App Store
  playStoreUrl: "https://play.google.com/store", // TODO: lien de la fiche Google Play
};

export const footerColumns = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "/fonctionnalites/" },
      { label: "Tarifs", href: "/tarifs/" },
      { label: "Comment ça marche", href: "/#comment-ca-marche" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Espace pro", href: site.backOfficeUrl },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Guide des sols", href: "/fonctionnalites/" },
      { label: "Blog", href: "#" },
    ],
  },
];

export const faqs = [
  {
    q: "Comment AgroScan analyse-t-il mon sol ?",
    a: "Deux options : saisissez les résultats d'une analyse de laboratoire, ou localisez simplement votre parcelle. AgroScan détermine le type de sol et calcule des recommandations adaptées.",
  },
  {
    q: "Ai-je besoin d'une analyse de laboratoire ?",
    a: "Non. L'analyse par localisation fonctionne sans prélèvement. Pour plus de précision, vous pouvez demander une analyse terrain directement depuis l'application.",
  },
  {
    q: "AgroScan convient-il aux petits exploitants ?",
    a: "Oui. L'application est pensée pour être simple : des indicateurs clairs, des recommandations concrètes et un rapport facile à partager.",
  },
  {
    q: "Les recommandations sont-elles fiables ?",
    a: "Elles reposent sur un moteur agronomique qui applique des règles de référence (seuils de phosphore et de potassium, chaulage, texture, réserve utile) à vos données.",
  },
  {
    q: "Faut-il une connexion internet ?",
    a: "Oui, une connexion est nécessaire pour lancer une analyse et consulter la météo. Vos rapports restent ensuite disponibles dans l'application.",
  },
];

// TODO: valider l'offre et les prix
export const plans = [
  {
    name: "Gratuit",
    icon: "leaf",
    iconSize: 21,
    dark: false,
    price: "0 FCFA/",
    period: "pour toujours",
    features: [
      "3 analyses de sol par mois",
      "Identification du type de sol",
      "Recommandations de base",
      "Météo locale",
      "Support par e-mail",
    ],
  },
  {
    name: "Pro",
    icon: "leaves",
    iconSize: 36,
    dark: true,
    price: "5 000 FCFA/",
    period: "mois",
    features: [
      "Analyses illimitées",
      "Cultures recommandées et doses d'amendement",
      "Rapports PDF à partager",
      "Arrosage connecté",
      "Support prioritaire",
    ],
  },
];

export const steps = [
  {
    title: "Analysez votre sol",
    text: "Saisissez vos résultats de laboratoire ou localisez simplement votre parcelle sur la carte.",
    icon: "scan",
  },
  {
    title: "Détectez les carences",
    text: "AgroScan identifie le type de sol, les déséquilibres et les points de vigilance de la parcelle.",
    icon: "warning",
  },
  {
    title: "Suivez le plan d'action",
    text: "Recevez les cultures recommandées, les doses d'amendement et un rapport complet à partager.",
    icon: "plant-b",
  },
];
