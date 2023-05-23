import HomePage from '../pageObjects/HomePage';
import SearchItemsPage from '../pageObjects/SearchItemsPage';
import { Item } from '../types/item.types';

import { Parser } from '@json2csv/plainjs';
import fs from 'fs-extra';

describe('Main Test', () => {
  const items: Item[] = [];
  let itemsLinks: string[];
  let itemsTitles: string[];
  let itemsPrices: string[];

  before(async () => {
    await HomePage.open();
  });

  it('Should Search Camisetas', async () => {
    await HomePage.clickLaterLocationButton();
    await HomePage.clickAcceptCookiesButton();
    await HomePage.typeSearchValue('camisetas');
    await HomePage.clickSearchButton();
    await SearchItemsPage.isSearchTitle('Camisetas');
  });

  it('Should Return items required values', async () => {
    for (let i = 0; i < 3; i++) {
      await SearchItemsPage.isCurrentPage(i + 1);
      itemsLinks = await SearchItemsPage.getItemLinks();
      itemsTitles = await SearchItemsPage.getItemTitles();
      itemsPrices = await SearchItemsPage.getItemPrices();

      for (let i = 0; i < itemsLinks.length; i++) {
        items.push({
          title: itemsTitles[i],
          link: itemsLinks[i],
          price: itemsPrices[i].replace(/(\r\n|\n|\r)/gm, ''),
        });
      }

      await SearchItemsPage.clickNextButton();
    }

    await SearchItemsPage.isCurrentPage(4);
  });

  it('Should create new csv file', async () => {
    try {
      const parser: Parser = new Parser();
      const csv: string = parser.parse(items);
      const writeStream = fs.createWriteStream('results.csv');
      writeStream.write(csv);
      writeStream.end();
    } catch (err) {
      console.error(err);
    }
  });
});
