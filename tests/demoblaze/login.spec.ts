import { test, expect } from '@playwright/test';
import { HomePage } from '../../poms/HomePage';
import { LoginModal } from '../../poms/LoginModal';
// Zaregistrované údaje na stránce, snad nějakou dobu vydrží :)
const VALID_USERNAME = 'tonda';
const VALID_PASSWORD = 'tonda1';

test.describe('Demoblaze Login & Logout Tests', () => {
  let homePage: HomePage;
  let loginModal: LoginModal;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginModal = new LoginModal(page);
    // Navigace na hlavní stránku
    await homePage.goto();
  });

  test('Login with valid credentials', async () => {
    await homePage.navigationBar.openLoginModal();
    await loginModal.login(VALID_USERNAME, VALID_PASSWORD);
    await loginModal.expectModalIsNotVisible();
    await expect(homePage.navigationBar.loggedInUserLink).toBeVisible({ timeout: 10000 });
    await expect(homePage.navigationBar.loggedInUserLink).toContainText(`Welcome ${VALID_USERNAME}`);
    await expect(homePage.navigationBar.logoutLink).toBeVisible();
    await expect(homePage.navigationBar.loginLink).not.toBeVisible();
    await expect(homePage.navigationBar.signupLink).not.toBeVisible();
  });




  test('Logout after login', async () => {
    // Selže, pokud předchozí test neproběhl nebo selhal
    await expect(homePage.navigationBar.logoutLink).toBeVisible({ timeout: 10000 });
    await homePage.navigationBar.logout();
    await expect(homePage.navigationBar.loginLink).toBeVisible();
    await expect(homePage.navigationBar.signupLink).toBeVisible();
    await expect(homePage.navigationBar.logoutLink).not.toBeVisible();
    await expect(homePage.navigationBar.loggedInUserLink).not.toBeVisible();
  });

});
