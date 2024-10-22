import {Dependency} from "@nerisma/di";
import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer, {Browser, Page} from "puppeteer";
import {logger} from "../logger/Logger";
import {ProductDiscovery} from "../models/ProductDiscovery.model";

@Dependency()
export class ScrappingService {

    private browser?: Browser;

    constructor() {
        puppeteerExtra.use(stealthPlugin());
        puppeteer.launch({headless: true})
                 .then(async (browser: Browser) => {
                     this.browser = browser;
                     logger.info('Browser is ready');
                 });
    }

    public async discover(url: string): Promise<ProductDiscovery[]> {
        if (!this.browser) {
            throw new Error('Browser is not ready');
        }

        const page = await this.browser?.newPage();
        await page?.goto(url);
        await page?.waitForFunction(
            'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500'
        );

        const discovery = new ProductDiscovery();
        discovery.url = url;
        discovery.amazonId = await this.getProductAmazonId(page);
        discovery.name = await this.getProductName(page);
        discovery.price = await this.getProductPrice(page);

        // Check if product has variants
        if (await page.$('#variation_style_name')) {
            return [discovery, ...await this.getProductVariants(page, discovery.amazonId)];
        }

        page?.close();

        return [discovery];
    }

    private async getProductAmazonId(page: Page): Promise<string> {
        let productAmazonId = await page.$eval('#asin', (el) => el.getAttribute('value'));
        if (!productAmazonId) {
            throw new Error('Product Amazon ID not found');
        }

        return productAmazonId;
    }

    private async getProductName(page: Page): Promise<string> {
        let productName;

        try {
            productName = await page.$eval('#variation_style_name .selection', (el) => el.textContent);
        }
        catch (e) {
            productName = await page.$eval('#productTitle', (el) => el.textContent);
        }

        if (!productName) {
            throw new Error('Product name not found');
        }

        return productName;
    }

    private async getProductPrice(page: Page): Promise<number> {
        let productPriceStr = await page.$eval('span:has(> .a-price-whole)', (el) => el.textContent);
        if (!productPriceStr) {
            throw new Error('Price not found');
        }

        productPriceStr = productPriceStr.replace(/\s/g, "")
                                         .replace(',', '.')
                                         .match(/\d+(?:\.\d{1,2})?/)[0];

        return parseFloat(productPriceStr);
    }

    private async getProductVariants(page: Page, baseProductAmazonId: string): Promise<ProductDiscovery[]> {
        const liElems = await page.$$('#variation_style_name li');
        if (!liElems) {
            return [];
        }

        const variants: ProductDiscovery[] = [];
        for (const el of liElems) {
            let amazonId: string = await page.evaluate((el: any) => el.getAttribute('data-csa-c-item-id'), el);
            if (!amazonId) {
                const dpUrl = await page.evaluate((el: any) => el.getAttribute('data-dp-url'), el);
                if (dpUrl) {
                    const urlFragments = dpUrl.split('/');
                    amazonId = urlFragments[2];
                }
            }

            if (amazonId === baseProductAmazonId) {
                continue;
            }

            const name: string = await el.$eval('p', (el: any) => el.textContent);

            const priceElem = await el.$('.twisterSwatchPrice');
            let price = undefined;
            if (priceElem) {
                price = parseFloat(await el.$eval('.twisterSwatchPrice', (el: any) => el.textContent.replace(',', '.')
                                                                                                    .replace(/\s/g, "")
                                                                                                    .match(/\d+(?:\.\d{1,2})?/)[0]));
            }
            const url: string = page.url().substring(0, page.url().indexOf('/dp/')) + `/dp/${amazonId}`;

            variants.push({
                amazonId,
                name,
                price,
                url
            });
        }

        return variants;
    }
}