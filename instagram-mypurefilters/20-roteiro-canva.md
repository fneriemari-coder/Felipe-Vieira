# 20 — Roteiro de Geração no Canva (lote pronto)

> Quando o Canva liberar a cota, **me avise** que eu gero tudo em sequência seguindo esta lista.
> Cada item traz: **tipo · ativo (foto oficial) · prompt pronto**. Segue o playbook `18-...`,
> as cores/tipografia `02-...` e o logo em **todas** as peças.

---

## 🔧 Pré-passos (1 vez)
1. **Brand Kit no Canva:** cores `#0B1A2B` (navy), `#E8821E` (laranja), `#FFFFFF`, `#EFE7DB` (areia),
   `#1E272E`; fontes de título **Fredoka/Quicksand** (combinam com o logo) + **Cormorant/Playfair**
   (beauty) + Inter (corpo); subir o **logo transparente** (versão branca e escura).
2. **Upload das fotos oficiais** (nomes em `10-ativos-e-imagens.md`) para inserir nas artes.
3. Gerar com `brand_kit_id` + `asset_ids` (foto certa por peça) — logo aplicado pelo Brand Kit.

## 🎛️ Bloco de estilo global (prepend em todo prompt)
> "Premium water-filtration brand 'My Pure Filters'. Deep navy (#0B1A2B) or warm sand background,
> orange (#E8821E) accent only on CTA/badges, white text. Geometric sans (Poppins) for tech, elegant
> serif for beauty. Include the 'MY PURE filter' logo, lots of negative space, water-drop motif,
> clean and trustworthy, modern American premium look. Headlines in a ROUNDED geometric font
> (Fredoka/Quicksand) to match the logo. Badge: 'Official My Pure Filters Rep · Orlando'."

---

## 1) Identidade base
| ID | Tipo | Ativo | Prompt (após o bloco global) |
|---|---|---|---|
| ID-01 | `logo` | — | "Refine the MY PURE filter wordmark lockup, white version + navy version, with optional orange dot accent." |
| ID-02 | `instagram_post` | `logo` | "Profile-style brand card: centered MY PURE filter logo on navy with subtle water rings." |

## 2) Capas de Destaques (14) — `your_story`
| ID | Ativo | Prompt |
|---|---|---|
| HC-01..14 | — | "Set of 14 matching highlight covers: navy gradient background, single white line icon centered, no text. Icons: water drop, shield, water glass, heart+, atom, star, split-screen, house, speech bubble, people, seal, % tag, '?', phone. Consistent minimal premium style." |

## 3) Feed — Franquias (ver `18-...`) — `instagram_post` (1080x1350)
| ID | Franquia | Ativo | Prompt |
|---|---|---|---|
| F-01 | Welcome/Fixado | `template-welcome-grid` ou logo | "Welcome post: 'If you're looking for pure, filtered, chlorine-free water — welcome, you're in the right place.' + CTA 'Free Water Test → DM'." |
| F-02 | What's in your water | — | "Educational carousel cover: bold 'What's REALLY in your tap water?' + 4 contaminant chips (Chlorine, Lead, PFAS, Microplastics). Navy, tech." |
| F-03 | The Proof (TDS) | `reel-shower` ou foto teste | "Before/after split: 'Tap water vs My Pure Filters' with TDS numbers; orange check vs grey x." |
| F-04 | Pure Beauty | `beauty-naturally-radiant` | "Beauty post 'naturally radiant', serif overlay, sand background, benefits: preserved hydration, less irritation." |
| F-05 | Family trust | `family-child-trust` | "Emotional: 'The people you love deserve water you can trust.' Warm photo + navy gradient + CTA." |
| F-06 | Certifications | `certifications-badges` | "Authority: 'Engineered with industry-certified components' + WQA #10474427, NSF, ANSI, Made in USA badges. Navy." |
| F-07 | Tech 4 pillars | `tech-4-pillars` | "Full Home System 4 layers: KDF55, Ion Resin, Activated Carbon, Quartz Bed. Navy, geometric, icons." |
| F-08 | How it works | `process-4-steps` | "Process carousel: 1 Free Water Analysis, 2 Custom Design, 3 Professional Install, 4 Family Protected." |
| F-09 | Apartment Kit | `product-reverse-osmosis` | "Apartment Kit (no construction): alkaline RO dual faucet + premium shower filter + bathroom faucet filters." |
| F-10 | Savings | — | "Cost post: bottled water can cost $1,000+/year; a system pays for itself. Big number, orange accent." |
| F-11 | Alkaline | `product-faucet-filter` | "Alkaline water explained: RO purifies + remineralization balances pH. Clean infographic." |
| F-12 | Offer | — | "Offer: 'This month only — FREE water test + special install pricing, Orlando.' Urgency + CTA." |

> Para cada peça de feed: gerar **versão EN (principal)**, e duplicar trocando o texto para **PT** e **ES**
> (usar legendas de `04-`, `15-` e copy de `14-`).

## 4) Stories — `your_story` (1080x1920)
| ID | Tema | Ativo | Prompt |
|---|---|---|---|
| S-01 | Oferta teste grátis | logo | "Story offer: 🎁 FREE Water Test, big, navy, water drop, CTA 'Tap here → WhatsApp' (leave space for link sticker)." |
| S-02 | Beleza chuveiro | `reel-shower-05/06` | "Beauty story: serif 'healthier skin & shinier hair', shower photo, DM 'SKIN'." |
| S-03 | Enquete educativa | — | "Story with poll space: 'Did you know clear water can still carry chlorine & lead?'" |
| S-04 | Apartamento | `product-reverse-osmosis` | "Story: 'Renting? Apartment Kit, no construction' + CTA 'OSMOSIS'." |
| S-05 | Prova/cert | `certifications-badges` | "Story: WQA/NSF/ANSI/Made in USA — 'Real standards. Real trust.'" |
| S-06 | Depoimento | print cliente | "Testimonial story: 5 stars + quote + 'Your home is next' CTA." |

## 5) Criativos de Anúncio — `instagram_post` + `your_story`
| ID | Campanha (`18-`) | Ativo | Prompt |
|---|---|---|---|
| AD-01 | What's in your water | foto TDS | "Ad creative, high-contrast hook 'What's in your water?', free test CTA. EN/PT/ES versions." |
| AD-02 | Pure Beauty | `beauty-naturally-radiant` | "Beauty ad: hair loss → healthier skin, shower filter, DM 'SKIN'. EN/PT/ES." |
| AD-03 | Apartment | `product-reverse-osmosis` | "Apartment Kit ad: no construction, alkaline RO + shower + bathroom filters. EN/PT/ES." |
| AD-04 | Family/Offer | `family-child-trust` | "Family trust + free test offer + urgency. EN/PT/ES." |

---

## 📦 Entregáveis ao final do lote
- Exportar tudo em **PNG (alta)** via `export-design` (feed 1080x1350, story 1080x1920).
- Salvar em `instagram-mypurefilters/artes/canva/` + atualizar o mapa em `10-...`.
- Versões **EN/PT/ES** nomeadas: `F-04_pure-beauty_EN.png`, `..._PT.png`, `..._ES.png`.

> **Quando o Canva liberar:** me mande "Canva liberou" que eu executo este roteiro de cima a baixo,
> embuto suas fotos + logo, exporto os PNGs e te entrego prontos para postar.
