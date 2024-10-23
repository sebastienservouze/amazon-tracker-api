import {Scrapper} from "./Scrapper";
import {Page} from "puppeteer";
import {Dependency} from "@nerisma/di";
import {Product} from "../entities/Product.entity";
import {ScrapBrowser} from "../misc/ScrapBrowser";


@Dependency()
export class ProductScrapper extends Scrapper<Partial<Product>> {

    private readonly AMAZON_URL = 'https://www.amazon.fr';

    constructor(protected readonly scrappingBrowser: ScrapBrowser) {
        super(scrappingBrowser);
    }

    override async doScrap(page: Page): Promise<Partial<Product>> {
        const amazonId = this.extractAmazonIdFromUrl(page.url());
        const simplifiedUrl = this.AMAZON_URL + '/dp/' + amazonId;

        const productName = await this.selectText(page, ['#variation_style_name .selection', '#productTitle']);
        if (!productName) {
            throw new Error('Product name not found');
        }

        const productPriceRaw = await this.selectText(page, ['span:has(> .a-price-whole)']);
        if (!productPriceRaw) {
            throw new Error('Product price not found');
        }
        const productPrice = this.extractPrice(productPriceRaw);

        const variants = await this.getVariants(page.url(), productName);

        return {
            url: simplifiedUrl,
            amazonId: amazonId,
            name: productName,
            price: productPrice,
            lastScan: new Date(),
            averagePrice: productPrice,
            lowestPrice: productPrice,
            highestPrice: productPrice,
            variants: variants as Product[]
        };
    }

    async getVariants(url: string, originalProductName: string): Promise<Partial<Product>[]> {
        const variants: Partial<Product>[] = [];
        const page = await this.scrappingBrowser.goTo(url);

        const liElems = await this.select(page, '#variation_style_name li');
        if (!liElems) {
            return [];
        }

        for (const li of liElems) {
            const variant: Partial<Product> = {}
            variant.name = await li.$eval('p', (el: any) => el.textContent);

            if (variant.name === originalProductName) {
                continue;
            }

            variant.url = 'https://www.amazon.fr' + await page.evaluate((el: any) => el.getAttribute('data-dp-url'), li);
            variant.amazonId = this.extractAmazonIdFromUrl(variant.url);

            variants.push(variant);
        }

        return variants;
    }

    private extractAmazonIdFromUrl(url: string): string {
        const fragmentUrl = url.split('/');
        const dpIndex = fragmentUrl.indexOf('dp');

        return fragmentUrl[dpIndex + 1];
    }
}