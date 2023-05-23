import { $, $$, expect } from '@wdio/globals';
import Helpers from '../helpers/Helpers';

class SearchItemsPage {
  get searchTitle(): Promise<WebdriverIO.Element> {
    return $('h1.ui-search-breadcrumb__title');
  }

  get nextButton(): Promise<WebdriverIO.Element> {
    return $(
      '.andes-pagination__button.andes-pagination__button--next.shops__pagination-button',
    );
  }

  get itemTitles(): Promise<WebdriverIO.Element[]> {
    return $$('a.ui-search-item__group__element');
  }

  get itemPrices(): Promise<WebdriverIO.Element[]> {
    return $$(
      '//div[@class="ui-search-item__group__element ui-search-price__part-without-link shops__items-group-details"]//span[@class="price-tag ui-search-price__part shops__price-part"]//span[@class="price-tag-amount"]',
    );
  }

  get currentPage(): Promise<WebdriverIO.Element[]> {
    return $('span.andes-pagination__link');
  }

  async isSearchTitle(title: string): Promise<void> {
    await expect(this.searchTitle).toHaveText(title);
  }

  async clickNextButton(): Promise<void> {
    await Helpers.click(this.nextButton);
  }

  async getItemTitles(): Promise<string[]> {
    const items: WebdriverIO.Element[] = await this.itemTitles;
    const titles: Promise<string>[] = items.map((item: WebdriverIO.Element) =>
      item.getAttribute('title'),
    );
    return Promise.all(titles);
  }

  async getItemLinks(): Promise<string[]> {
    const items: WebdriverIO.Element[] = await this.itemTitles;
    const href: Promise<string>[] = items.map((item: WebdriverIO.Element) =>
      item.getAttribute('href'),
    );
    return Promise.all(href);
  }

  async getItemPrices(): Promise<string[]> {
    const items: WebdriverIO.Element[] = await this.itemPrices;
    const prices: Promise<string>[] = items.map((item: WebdriverIO.Element) =>
      item.getText(),
    );
    return Promise.all(prices);
  }

  async isCurrentPage(page: number): Promise<void> {
    const currentPage: WebdriverIO.Element = await this.currentPage;
    await currentPage.scrollIntoView();
    expect(this.currentPage).toHaveText(page.toString());
  }
}

export default new SearchItemsPage();
