import { type Locator, type Page } from '@playwright/test';


export class NavigationBar {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly logoutLink: Locator; // Až po loginu
  readonly loggedInUserLink: Locator; // Až po loginu

  constructor(page: Page) {
    this.page = page;
    // Navigační bar
    this.homeLink = page.getByRole('link', { name: 'Home' }); // Odkaz na home
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutUsLink = page.getByRole('link', { name: 'About us' });
    this.cartLink = page.locator('#cartur'); // ID pro košík
    this.loginLink = page.locator('#login2'); // ID pro login
    this.signupLink = page.locator('#signin2'); // ID pro registraci
    this.logoutLink = page.locator('#logout2'); // ID pro odhlášení
    this.loggedInUserLink = page.locator('#nameofuser'); // ID pro usera
  }

  // Interakce s nav barem
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openLoginModal(): Promise<void> {
    await this.loginLink.click();
  }

  async openSignupModal(): Promise<void> {
    await this.signupLink.click();
  }

  async logout(): Promise<void> {
    // Až po přihlášení
    await this.logoutLink.click();
  }
}
