# Staff QR Code Generator

A client-side Angular application that turns a staff/contact form into a shareable **digital business card link**. Print that link as a QR code, and anyone who scans it lands on a styled profile card they can save to their phone with one tap.

There is no backend: the entered data is encrypted into the URL itself, so the app is fully static and can be hosted anywhere.

## How it works

1. **`/` (Home)** — landing page with a call to action that opens the form.
2. **`/forms`** — reactive form for the staff member's details: name, profession, company, address, company summary, theme colours, an optional profile photo, and repeatable phone / email / website entries (each with a label).
3. On submit, the form value is serialised and **AES-encrypted in the browser**, then a link of the form
   `/form-details?data=<encrypted-payload>` is built and copied to the clipboard.
4. **`/form-details`** — reads the `data` query parameter, decrypts it, and renders the profile card. A **Save Contact** button downloads a generated `.vcf` (vCard 3.0) file so the details can be imported into the phone's address book.

Profile images are uploaded to [Cloudinary](https://cloudinary.com) using an unsigned upload preset and the resulting URL is stored in the payload.

## Tech stack

| | |
|---|---|
| Framework | Angular 19.2 (standalone components, signals-ready, new control flow `@if` / `@for`) |
| Language | TypeScript 5.7 |
| Encryption | [`crypto-js`](https://github.com/brix/crypto-js) (AES) |
| Image hosting | Cloudinary REST API |
| Unit testing | Karma + Jasmine |
| Hosting | Vercel (`qr-code-gen-44.vercel.app`) |

## Getting started

```bash
npm install
npm start          # ng serve -> http://localhost:4200
```

### Scripts

| Command | Description |
|---|---|
| `npm start` | Start the dev server with live reload |
| `npm run build` | Production build into `dist/qr-code-generator` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Run the unit test suite (Karma, opens Chrome) |

### Code scaffolding

```bash
ng generate component <name>
```

## Project structure

```
src/
├── app/                  # Root component, router config, app providers
│   ├── app.routes.ts     # Routes: '' | 'forms' | 'form-details' | '**' -> '/'
│   └── app.config.ts     # Router, HttpClient, zone change detection
├── core/                 # App-wide singleton services
│   ├── cloudinary.service.ts   # Profile image upload -> secure URL
│   └── encryption.service.ts   # AES encrypt/decrypt of the URL payload
├── features/             # Routed, self-contained pages
│   ├── homepage/         # Landing page
│   ├── formspage/        # Data entry form (reactive forms + FormArray contacts)
│   └── form-details/     # Rendered profile card + vCard download
├── shared/               # Reusable presentational components
│   └── circular-progress-indicator-component/
├── main.ts               # Browser entry point
└── styles.css            # Global styles
public/                   # Static assets copied verbatim (SVG icons, images)
```

## Configuration

There is currently no environment file — the external credentials are hardcoded and must be updated in place:

| What | Where |
|---|---|
| AES payload key | `src/core/encryption.service.ts` (`key`) |
| Cloudinary cloud name + upload preset | `src/core/cloudinary.service.ts` (`cloudName`, `uploadPreset`) |
| Base URL used when generating share links | `src/features/formspage/forms-page.component.ts` (`submitDetails`) |

To deploy elsewhere, point the share-link base URL at your own origin (or derive it from `window.location.origin`).

