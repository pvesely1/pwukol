import { type Locator, type Page, expect } from '@playwright/test';
import { NavigationBar } from './NavigationBar';

export class ProductPage {
  readonly page: Page;
  readonly navigationBar: NavigationBar;
  readonly productNameTitle: Locator;
  readonly productPriceContainer: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationBar = new NavigationBar(page);
    // Selektory pro detail produktu
    this.productNameTitle = page.locator('.name'); // Nadpis produktu
    this.productPriceContainer = page.locator('.price-container'); // Cena
    this.productDescription = page.locator('#more-information'); // Popis produktu
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  // Přidání produktu do košíku
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  // Ověření
  async verifyProductDetails(expectedName: string): Promise<void> {
    await expect(this.productNameTitle).toHaveText(expectedName, { timeout: 5000 });
    await expect(this.productPriceContainer).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }
}
