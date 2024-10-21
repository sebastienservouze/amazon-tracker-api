import {Dependency} from "@nerisma/di";
import puppeteer, {Browser} from "puppeteer";
import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import {logger} from "../logger/Logger";
import {AmazonDiscovery} from "../models/AmazonDiscovery.model";

@Dependency()
export class TrackerService {

    private browser?: Browser;

    constructor() {
        puppeteerExtra.use(stealthPlugin());
        puppeteer.launch({headless: true})
                 .then(async (browser: Browser) => {
                     this.browser = browser;
                     logger.info('Browser is ready');
                 });
    }


    public async discover(url: string): Promise<AmazonDiscovery> {
        if (!this.browser) {
            throw new Error('Browser is not ready');
        }

        const page = await this.browser?.newPage();
        await page?.goto(url);
        await page?.waitForFunction(
            'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500'
        );

        const productPriceElem = await page.$('span:has(> .a-price-whole)');
        const productNameElem = await page.$('#productTitle');

        return {
            productName: await productNameElem?.evaluate((el) => el.textContent),
            productPrice: await productPriceElem?.evaluate((el) => el.textContent)
        };
    }

}