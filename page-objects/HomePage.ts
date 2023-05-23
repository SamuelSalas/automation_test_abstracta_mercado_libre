import Helpers from '../helpers/Helpers';
import { $, browser } from '@wdio/globals';

class HomePage {
  get searchBar(): Promise<WebdriverIO.Element> {
    return $('#cb1-edit');
  }

  get searchButton(): Promise<WebdriverIO.Element> {
    return $('.nav-search-btn');
  }

  get acceptCookiesButton(): Promise<WebdriverIO.Element> {
    return $('button[data-testid="action:understood-button"]');
  }

  get laterLocationButton(): Promise<WebdriverIO.Element> {
    return $(
      '.onboarding-cp-button.andes-button.andes-button--transparent.andes-button--small',
    );
  }

  async open(): Promise<void> {
    await browser.url('/');
  }

  async typeSearchValue(value: string): Promise<void> {
    await Helpers.typeValue(this.searchBar, value);
  }

  async clickSearchButton(): Promise<void> {
    await Helpers.click(this.searchButton);
  }

  async clickAcceptCookiesButton(): Promise<void> {
    await Helpers.click(this.acceptCookiesButton);
  }

  async clickLaterLocationButton(): Promise<void> {
    await Helpers.click(this.laterLocationButton);
  }
}

export default new HomePage();
