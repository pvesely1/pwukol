import { type Locator, type Page, expect } from '@playwright/test';

export class LoginModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly modalTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selektor pro celý modální dialog
    this.modal = page.locator('#logInModal');
    // Selektor pro nadpis modálu
    this.modalTitle = this.modal.locator('.modal-title'); // Hledáme uvnitř modálu
    // Selektory pro inputy a tlačítka uvnitř modálu
    this.usernameInput = this.modal.locator('#loginusername');
    this.passwordInput = this.modal.locator('#loginpassword');
    this.loginButton = this.modal.getByRole('button', { name: 'Log in' });
    // Tlačítko Close má specifickou třídu nebo text
    this.closeButton = this.modal.getByRole('button', { name: 'Close' });
    // Alternativně: this.closeButton = this.modal.locator('.modal-footer .btn-secondary');
  }

  // Metoda pro ověření, že je modál viditelný
  async expectModalIsVisible(): Promise<void> {
    await expect(this.modal).toBeVisible();
    await expect(this.modalTitle).toHaveText('Log in');
  }

   // Metoda pro ověření, že je modál skrytý
   async expectModalIsNotVisible(): Promise<void> {
    await expect(this.modal).not.toBeVisible();
  }

  // Metoda pro vyplnění uživatelského jména
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  // Metoda pro vyplnění hesla
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  // Metoda pro kliknutí na tlačítko Login
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  // Metoda pro kliknutí na tlačítko Close
  async clickCloseButton(): Promise<void> {
    await this.closeButton.click();
  }

  // Kombinovaná metoda pro provedení přihlášení
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
