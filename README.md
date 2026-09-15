# AgroScan — Landing page

Site vitrine statique d’AgroScan.

**Stack** : Astro · Tailwind CSS v4 · View Transitions (Astro `ClientRouter`) · aucune librairie JS

## Développement

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```

## Structure

```
src/
  data/site.ts            # réglages, FAQ, offres, étapes, liens du footer
  layouts/Layout.astro    # <head>, SEO, navbar, footer, transitions de page
  assets/images/          # visuels optimisés au build (AVIF/WebP responsive)
  assets/icons/           # icônes SVG, inlinées au build
  scripts/interactions.ts # apparitions au scroll, compteurs, étapes, menus, accordéons
  styles/global.css       # palette AgroScan, typographie, utilitaires
  components/
    layout/  ui/  shared/  home/  feature/
  pages/                  # /, /fonctionnalites, /tarifs, /telecharger, 404
public/
  images/                 # SVG statiques (logos, badges, QR code)
  fonts/                  # polices auto-hébergées (latin)
  og.png, icon-*.png      # image de partage et icônes d'app
```

- **Couleurs** : tokens dans `@theme` de `global.css` (`forest`, `green`, `lime`, `mint`, `surface`, `ink`, `body`).
- **Animation au scroll** : `data-reveal` sur un élément (`data-delay="0.2"` pour décaler).
- **Compteur animé** : `<span data-count="98">98</span>`.
- **Icône** : `<Icon name="leaf" size={20} />` → `src/assets/icons/leaf.svg`.
- **Image** : importer depuis `src/assets/images/` et utiliser `<Image>` / `<Picture>` d'`astro:assets` (jamais de `<img>` brut pour un PNG/JPG).

## SEO

- Titre, description et URL canonique par page (props de `Layout.astro`), `robots.txt` et sitemap générés.
- Open Graph / Twitter avec `public/og.png` (1200×630), `site.webmanifest`, `apple-touch-icon`.
- Données structurées JSON-LD : `Organization` et `WebSite` (toutes les pages), `MobileApplication` (accueil), `FAQPage` (pages avec FAQ).
- Page 404 en `noindex`. URLs avec slash final (`/tarifs/`).

## À faire avant la mise en ligne

- [ ] Remplacer les visuels de `src/assets/images/` et `public/images/` (captures de l'app, logos partenaires, photo témoignage)
- [ ] Remplacer les chiffres, avis et noms fictifs (hero, témoignages, page Fonctionnalités)
- [ ] Valider les prix dans `src/data/site.ts`
- [ ] Liens App Store / Google Play et QR code
- [ ] Déclarer le site dans Google Search Console et soumettre le sitemap

## Déploiement — Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → connecter le dépôt Git.
2. Réglages de build : root directory `landing`, build command `npm run build`, output directory `dist`. Node est lu depuis `.nvmrc`.
3. **Custom domains** → `agro-scan.com`.

Sans dépôt Git : `npx wrangler pages deploy dist`.
