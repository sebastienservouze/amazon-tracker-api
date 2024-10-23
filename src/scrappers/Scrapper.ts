import {Page} from "puppeteer";
import {ElementHandle} from "puppeteer";
import {logger} from "../logger/Logger";
import {ScrapBrowser} from "../misc/ScrapBrowser";

export abstract class Scrapper<T> {

    protected constructor(protected readonly scrappingBrowser: ScrapBrowser) {
    }

    public async scrap(url: string): Promise<T> {
        const page = await this.scrappingBrowser.goTo(url);
        return this.doScrap(page);
    }

    /**
     * Scrap the page and return the result
     * @param page
     */
    protected abstract doScrap(page: Page): Promise<T>;

    /**
     * Select text from a list of selectors,
     * the first one that returns a non-null value will be returned
     * @param page
     * @param selectors
     * @protected
     */
    protected async selectText(page: Page, selectors: string[]): Promise<string | null> {
        let text = null;
        let tries = 0;
        while (!text && tries < selectors.length) {
            try {
                text = await page.$eval(selectors[tries], (el) => el.textContent);
            } catch (e: any) {
                logger.debug(`Can't find text from selector ${selectors[tries]}`, e.message);
            }
            tries++;
        }

        return text;
    }

    /**
     * Select an attribute from a list of selectors,
     * the first one that returns a non-null value will be returned
     * @param page
     * @param selectors
     * @param attribute
     * @protected
     */
    protected async selectAttribute(page: Page, selectors: string[], attribute: string): Promise<string | null> {
        let attr = null;
        let tries = 0;
        while (!attr && tries < selectors.length) {
            try {
                attr = await page.$eval(selectors[tries], (el) => el.getAttribute(attribute));
            } catch (e: any) {
                logger.debug(`Can't find text from selector ${selectors[tries]}`, e.message);
            }
            tries++;
        }

        return attr;
    }

    /**
     * Select an element from a list of selectors,
     * the first one that returns a non-null value will be returned
     * @param page
     * @param selectors
     * @protected
     */
    protected async selectOne(page: Page, selectors: string[]): Promise<ElementHandle | null> {
        let element = null;
        let tries = 0;
        while (!element && tries < selectors.length) {
            element = await page.$(selectors[tries]);
            tries++;
        }

        if (!element) {
            logger.debug(`Can't find element from selectors ${selectors}`);
        }

        return element;
    }

    /**
     * Select elements from a selector
     * @param page
     * @param selector
     * @protected
     */
    protected async select(page: Page, selector: string): Promise<ElementHandle[]> {
        let elements: ElementHandle[] = [];
        try {
            elements = await page.$$(selector);
        } catch (e: any) {
            logger.debug(`Can't find elements from selector ${selector}`, e.message);
        }

        return elements;
    }

    protected extractPrice(priceStr: string): number {
        priceStr = priceStr.replace(/\s/g, "")
                           .replace(',', '.')
                           .match(/\d+(?:\.\d{1,2})?/)![0];

        return parseFloat(priceStr);
    }

}