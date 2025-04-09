import { type Locator, type Page, expect } from '@playwright/test';
import { NavigationBar } from './NavigationBar'; // Import komponentu

export class HomePage {
  readonly page: Page;
  readonly navigationBar: NavigationBar;
  readonly productListContainer: Locator;
  readonly categoriesTitle: Locator;
  readonly phonesCategoryLink: Locator;
  readonly laptopsCategoryLink: Locator;
  readonly monitorsCategoryLink: Locator;

  // URL
  readonly baseUrl: string = 'https://www.demoblaze.com/';

  constructor(page: Page) {
    this.page = page;
    this.navigationBar = new NavigationBar(page); // Vytvoření NavBar instance
    this.productListContainer = page.locator('#tbodyid'); // Seznam produktů
    this.categoriesTitle = page.locator('#cat'); // Nadpis "CATEGORIES"
    // Selektory pro kategorie
    this.phonesCategoryLink = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategoryLink = page.getByRole('link', { name: 'Laptops' });
    this.monitorsCategoryLink = page.getByRole('link', { name: 'Monitors' });
  }

  // Navigace na HomePagi
  async goto(): Promise<void> {
    await this.page.goto(this.baseUrl);
    // Počkání na klíčový prvek
    await expect(this.productListContainer).toBeVisible({ timeout: 10000 });
  }

  // Kliknutí na kategorii
  async clickCategory(categoryName: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    switch (categoryName) {
      case 'Phones':
        await this.phonesCategoryLink.click();
        break;
      case 'Laptops':
        await this.laptopsCategoryLink.click();
        break;
      case 'Monitors':
        await this.monitorsCategoryLink.click();
        break;
      default:
        throw new Error(`Wrong category name: ${categoryName}`);
    }
  }

  // Kliknutí na produkt
  async clickProduct(productName: string): Promise<void> {
    // Odkaz produktu dle textu
    await this.page.getByRole('link', { name: productName }).click();
  }

  // Získání lokátoru produktu podle názvu
  getProductLocator(productName: string): Locator {
    return this.page.getByRole('link', { name: productName });
  }
}
