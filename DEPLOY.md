# Déployer Life is Good Construction — domaine GoDaddy

Ce site est une application **Next.js** (serveur Node.js). L’hébergement web classique GoDaddy (cPanel / PHP) **ne convient pas**.

La méthode recommandée : **héberger sur Vercel** (gratuit, optimisé pour Next.js) et **pointer votre domaine GoDaddy** vers Vercel.

---

## Étape 1 — Pousser le code sur GitHub

1. Créez un dépôt sur [github.com/new](https://github.com/new) (ex. `lifeisgood-site`).
2. Dans le dossier du projet :

```bash
cd demenagement-site
git add .
git commit -m "Préparer déploiement production"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/lifeisgood-site.git
git push -u origin main
```

---

## Étape 2 — Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) → **Sign Up** (compte GitHub).
2. **Add New Project** → importez votre dépôt GitHub.
3. Paramètres du projet :
   - **Framework** : Next.js (détecté automatiquement)
   - **Root Directory** : `.` (racine du repo)
   - **Build Command** : `npm run build`
   - **Output** : défaut Next.js
4. **Environment Variables** (important) :

| Nom | Valeur |
|-----|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://lifeisgoodconstruction.ca` |

5. Cliquez **Deploy**. Vous obtenez une URL temporaire : `https://votre-projet.vercel.app`.

---

## Étape 3 — Connecter le domaine GoDaddy

### Dans Vercel

1. Projet → **Settings** → **Domains**
2. Ajoutez :
   - `lifeisgoodconstruction.ca`
   - `www.lifeisgoodconstruction.ca`
3. Vercel affiche les enregistrements DNS à créer.

### Dans GoDaddy

1. [godaddy.com](https://godaddy.com) → **Mes produits** → votre domaine → **Gérer le DNS**
2. Supprimez ou modifiez les anciens enregistrements **A** et **CNAME** en conflit.
3. Ajoutez (valeurs fournies par Vercel — exemple courant) :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| **A** | `@` | `76.76.21.21` | 600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 |

4. Attendez **15 min à 48 h** (souvent < 1 h) pour la propagation DNS.

### Option alternative : nameservers Vercel

Dans GoDaddy → **Nameservers** → **Changer** → utilisez ceux indiqués par Vercel. Vercel gère alors tout le DNS.

---

## Étape 4 — Vérifications

- [ ] `https://lifeisgoodconstruction.ca/fr` s’affiche
- [ ] `https://lifeisgoodconstruction.ca/en` s’affiche
- [ ] Redirection `/` → `/fr`
- [ ] `https://lifeisgoodconstruction.ca/robots.txt` et `/sitemap.xml` OK
- [ ] Formulaire devis ouvre Gmail avec `info@lifeisgoodconstruction.ca`
- [ ] Certificat HTTPS actif (cadenas vert — automatique sur Vercel)

---

## Mises à jour futures

Chaque `git push` sur `main` redéploie automatiquement le site sur Vercel.

---

## Autres options (si vous refusez Vercel)

| Option | Difficulté | Notes |
|--------|-----------|-------|
| **GoDaddy VPS** | Élevée | Installer Node 20+, `npm run build`, `npm run start`, Nginx reverse proxy, SSL |
| **Netlify / Railway** | Moyenne | Même principe DNS GoDaddy → hébergeur |
| **Export statique** | Non adapté | Ce site utilise next-intl + routes dynamiques |

---

## Support GoDaddy

Si le domaine est neuf, vérifiez que le **renouvellement automatique** est actif et que le domaine n’est pas verrouillé (transfer lock OK pour DNS).

Pour l’aide DNS GoDaddy : [Configurer DNS](https://www.godaddy.com/help/manage-dns-records-680)
