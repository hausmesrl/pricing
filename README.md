# Hausme – Pagina prezzi

Pagina prezzi di Hausme per imprese edili. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione
npm run lint
```

## Dove modificare cosa

| Cosa | File |
|---|---|
| **Nomi dei piani** (unico punto) | `src/config/pricingPlans.ts` → `PLAN_NAMES` |
| Prezzi, limiti, attivazione, moduli, tabella | `src/config/pricingPlans.ts` |
| Testi (hero, banner, FAQ, CTA finale, SEO) | `src/config/pricingContent.ts` |
| URL checkout/demo, navbar, footer, loghi | `src/config/site.ts` |
| Design token (colori, font, raggi, ombre) | `src/app/globals.css` (`@theme`) |

- Nel codice e negli URL si usano solo gli id `entry`, `recommended`, `pro`.
- Le CTA puntano a `CTA_LINKS.checkout` con `?plan=<id>&billing=monthly|annual`.
- I prezzi annuali (199/279/399 e 2.388/3.348/4.788) sono valori espliciti nel config.
- Le liste feature ("Tutto in [piano], più:") sono generate dai dati: cambiando un limite o un nome si aggiornano da sole.

## Branding

Token ricavati da www.hausme.it. La palette di default di Tailwind è disattivata: si possono usare solo i colori Hausme.

- Font: **Outfit** (titoli, bottoni) e **Montserrat** (testo), self-hosted in `src/fonts` (licenza SIL OFL).
- Colori: navy `#2D3047`, verde `#2A9279`, magenta `#DB0C7E`, lavanda `#F7F7FF`, menta `#EAF3F2`, rosa `#FFE9FB` / `#F8C7F0`, lime `#C6FCC8`, grigi `#4A5565` / `#364153`.
- **Token derivati** (non presenti sul sito, servono per il contrasto AA del testo piccolo): `green-ink #227863` e `magenta-ink #B40A67`.
- Asset: logo Hausme, logo Credem a colori (`public/partners/credem.svg`) e monocromo bianco (`credem-white.png`), loghi partner presi dal sito.

## TODO aperti

- [ ] `TODO_NOME` – nomi commerciali dei piani (`PLAN_NAMES`)
- [ ] URL definitivi di checkout e demo (`CTA_LINKS` in `site.ts`)
- [ ] Testi FAQ: cosa include l'attivazione, pagamento/rinnovo annuale, policy di superamento limiti, condizioni di disdetta
- [ ] Tagline delle 3 card da validare
- [ ] Verificare con Credem che il logo preso dal sito sia la versione ufficiale aggiornata (anche quella monocromatica)
