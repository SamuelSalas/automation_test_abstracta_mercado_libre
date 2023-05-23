class Helpers {
  static async typeValue(
    element: Promise<WebdriverIO.Element>,
    value: string,
  ): Promise<void> {
    const elem: WebdriverIO.Element = await element;
    await elem.waitForDisplayed();
    await elem.setValue(value);
  }

  static async click(element: Promise<WebdriverIO.Element>): Promise<void> {
    const elem: WebdriverIO.Element = await element;
    await elem.waitForDisplayed();
    await elem.click();
  }
}

export default Helpers;
