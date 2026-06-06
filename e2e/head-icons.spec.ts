import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/o-fundacji",
  "/oferta",
  "/zespol",
  "/aktualnosci",
  "/kontakt",
  "/dokumenty",
  "/galeria",
  "/polityka-prywatnosci",
  "/regulamin",
];

const FORBIDDEN_ICON_RELS = [
  "icon",
  "shortcut icon",
  "apple-touch-icon",
  "apple-touch-icon-precomposed",
  "mask-icon",
];

const FORBIDDEN_META = [
  'meta[property="og:image"]',
  'meta[property="og:image:secure_url"]',
  'meta[property="og:image:type"]',
  'meta[property="og:image:width"]',
  'meta[property="og:image:height"]',
  'meta[property="og:image:alt"]',
  'meta[property="og:logo"]',
  'meta[name="twitter:image"]',
  'meta[name="twitter:image:alt"]',
];

for (const path of routes) {
  test(`head ${path}: brak dodatkowych ikon/og:image/twitter:image/og:logo poza index.html`, async ({ page }) => {
    await page.goto(path);
    // Wait for client-side Helmet hydration to settle
    await page.waitForLoadState("networkidle");

    for (const rel of FORBIDDEN_ICON_RELS) {
      const count = await page.locator(`head link[rel="${rel}"]`).count();
      const expected = rel === "mask-icon" || rel === "apple-touch-icon-precomposed" || rel === "shortcut icon" || rel === "apple-touch-icon" || rel === "icon" ? 1 : 0;
      expect(count, `rel="${rel}" na ${path}`).toBe(expected);
    }

    for (const sel of FORBIDDEN_META) {
      const count = await page.locator(`head ${sel}`).count();
      expect(count, `${sel} na ${path}`).toBe(0);
    }
  });
}
