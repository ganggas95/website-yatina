## 1. Goal

Memasang Google Tag Manager container GTM-PVZWTZ2L pada seluruh halaman website Yatina melalui root layout Next.js, tanpa menambahkan event tracking, GA4, backend, atau dependency baru.

## 2. Approach

Buat komponen analytics khusus di src/components/analytics/google-tag-manager.tsx yang merender script GTM melalui next/script dan fallback <noscript> sesuai snippet dari screenshot. Komponen dibuat sebagai Server Component dan dipanggil satu kali dari src/app/layout.tsx, sehingga semua route App Router menerima GTM tanpa duplikasi; implementasi ini juga mempertahankan Vercel Analytics dan Speed Insights yang sudah ada.

ID container akan didefinisikan sebagai konstanta yang mudah ditemukan di komponen integrasi karena ID GTM bersifat publik dan tidak membutuhkan secret. Tidak ada package tambahan karena Next.js sudah menyediakan next/script.

## 3. File Changes

- **Create** src/components/analytics/google-tag-manager.tsx
  - Tambahkan komponen server GoogleTagManager.
  - Render script loader GTM dengan container ID GTM-PVZWTZ2L.
  - Render fallback iframe https://www.googletagmanager.com/ns.html?id=GTM-PVZWTZ2L dengan atribut aksesibilitas dan ukuran tersembunyi.
  - Pastikan tidak memakai window, document, state client, atau package baru.

- **Modify** src/app/layout.tsx:1-10, 103-124
  - Import komponen GoogleTagManager.
  - Letakkan komponen script di area root layout agar dimuat di semua halaman.
  - Letakkan fallback <noscript> sedini mungkin di dalam <body>, sebelum konten utama/header, mengikuti instruksi instalasi Google Tag Manager.
  - Pertahankan Analytics, SpeedInsights, metadata, JSON-LD, header, footer, dan struktur aksesibilitas yang sudah ada.

- **No change** package.json:12-26
  - Tidak menambah dependency karena integrasi memakai API bawaan Next.js.

## 4. Implementation Steps

### Task 1: Add the GTM integration component

1. Create src/components/analytics/google-tag-manager.tsx.
2. Define the container ID as GTM-PVZWTZ2L.
3. Add the GTM loader using Script from next/script, preserving the standard dataLayer initialization and GTM URL query parameter.
4. Add the standard no-JavaScript iframe fallback with title, zero dimensions, and hidden styling.

### Task 2: Mount GTM globally

1. Update src/app/layout.tsx:1-10 to import the new component.
2. Insert <GoogleTagManager /> inside <body> before <a>/header content so the GTM script is available globally.
3. Verify that the root layout remains a Server Component and no use client directive is introduced.
4. Verify that existing Vercel Analytics and Speed Insights remain mounted once at src/app/layout.tsx:121-122.

### Task 3: Validate the integration

1. Run npm run typecheck to verify TypeScript and JSX types.
2. Run npm run lint to catch Next.js/React lint issues.
3. Run npm run build to confirm the static Next.js build still succeeds.
4. Inspect the rendered HTML in a production or local preview and confirm:
   - https://www.googletagmanager.com/gtm.js?id=GTM-PVZWTZ2L appears once.
   - https://www.googletagmanager.com/ns.html?id=GTM-PVZWTZ2L appears in the body fallback.
   - Both snippets are present on the home page and a nested route such as /kegiatan.
5. Use Google Tag Assistant/Preview mode with container GTM-PVZWTZ2L after deployment to confirm the container connects; this requires the site to be reachable from the browser and is separate from code validation.

## 5. Acceptance Criteria

- The GTM container ID in the implementation is exactly GTM-PVZWTZ2L.
- The GTM script is mounted from the global root layout and is available on the home page and every App Router route.
- The standard GTM noscript fallback is present directly inside <body> and points to the same container ID.
- No new npm dependency is added.
- No client component, browser-only API, backend infrastructure, API route, or event tracking is introduced.
- Existing Vercel Analytics, Speed Insights, metadata, JSON-LD, and page content continue to render.
- npm run typecheck, npm run lint, and npm run build complete successfully.
- Google Tag Assistant Preview recognizes container GTM-PVZWTZ2L on the deployed site.

## 6. Verification Steps

- Static verification: search the changed files for GTM-PVZWTZ2L, googletagmanager.com/gtm.js, and googletagmanager.com/ns.html; each expected URL should be present in the GTM component.
- Type and build verification: run npm run typecheck, npm run lint, and npm run build.
- Browser verification: open the home page and /kegiatan, inspect page source/DOM, and confirm the script URL and fallback iframe are each present once.
- GTM verification: open GTM Preview/Tag Assistant, connect to the deployed domain, and confirm the container is detected before publishing any tags.
- Regression verification: confirm page navigation, existing Vercel Analytics, Speed Insights, and the skip-to-content link still work.

## 7. Risks & Mitigations

- **GTM loading strategy differs from the exact raw snippet:** use next/script in the root layout while preserving the same container URL and dataLayer initialization; validate the generated HTML and Tag Assistant connection.
- **Duplicate tracking if GTM is later added elsewhere:** keep the integration in one dedicated component mounted only from src/app/layout.tsx; do not add snippets to individual pages.
- **Container is installed but has no published tags:** this is expected for the selected scope; container installation can be verified in Preview mode, while actual analytics behavior depends on tags configured and published inside GTM.
- **Production domain is unavailable during local validation:** validate URL presence locally, then run Tag Assistant against the deployed site once the domain is reachable.