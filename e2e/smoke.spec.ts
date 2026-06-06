import { test, expect } from "@playwright/test";

test("strona główna ładuje się i zawiera nawigację", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("/");
  await expect(page).toHaveTitle(/Via Mentis/i);
  await expect(page.locator("nav").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("kluczowe podstrony zwracają treść", async ({ page }) => {
  for (const path of ["/o-fundacji", "/oferta", "/zespol", "/aktualnosci", "/kontakt", "/dokumenty"]) {
    const res = await page.goto(path);
    expect(res?.status(), `status ${path}`).toBeLessThan(400);
    await expect(page.locator("main").first()).toBeVisible();
  }
});

test("panel logowania administratora renderuje formularz", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/hasło/i)).toBeVisible();
});
