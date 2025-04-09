import { test, expect } from '@playwright/test';
import { HomePage } from '../../poms/HomePage';
import { ProductPage } from '../../poms/ProductPage';

// Test suite
test.describe('Demoblaze Navigace POM', () => {
  let homePage: HomePage;

  // Před každým testem
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  // Ověření titulku hlavní stránky
  test('correct homepage title', async ({ page }) => {
    await expect(page).toHaveTitle('STORE');
  });

  // Ověření viditelnosti navigačního baru
  test('displayment of navigation bar', async () => {
    await expect(homePage.navigationBar.cartLink).toBeVisible();
    await expect(homePage.navigationBar.loginLink).toBeVisible();
    await expect(homePage.navigationBar.signupLink).toBeVisible();
    await expect(homePage.navigationBar.homeLink).toBeVisible();
  });

  // Navigace do kategorie "Phones"
  test('navigation to Phones category', async () => {
    await homePage.clickCategory('Phones');
    await expect(homePage.getProductLocator('Samsung galaxy s6')).toBeVisible({ timeout: 5000 });
  });

  // Navigace do kategorie "Laptops"
  test('navigation to Laptops category', async () => {
    await homePage.clickCategory('Laptops');
    await expect(homePage.getProductLocator('Sony vaio i5')).toBeVisible({ timeout: 5000 });
  });

   // Navigace do kategorie "Monitors"
   test('navigation to Monitors category', async () => {
    await homePage.clickCategory('Monitors');
    await expect(homePage.getProductLocator('Apple monitor 24')).toBeVisible({ timeout: 5000 });
  });

  // Navigace na detail produktu
  test('navigation to product detail page', async ({ page }) => {
    const productName = 'Samsung galaxy s6';
    await homePage.clickProduct(productName);

    const productPage = new ProductPage(page);
    await productPage.verifyProductDetails(productName);
  });

}); // Konec