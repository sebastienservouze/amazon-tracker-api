import {Dependency} from "@nerisma/di";
import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer, {Browser, Page} from "puppeteer";
import {logger} from "../logger/Logger";

@Dependency()
export class ScrapBrowser {

    private browser?: Browser;
    private page?: Page;

    constructor() {
        puppeteerExtra.use(stealthPlugin());
        puppeteer.launch({headless: true})
                 .then(async (browser: Browser) => {
                     this.browser = browser;
                     this.page = await this.browser?.newPage();
                     logger.info('Browser is ready');
                 });
    }

    public async goTo(url: string): Promise<Page> {
        if (!this.browser) {
            throw new Error('Browser is not ready');
        }

        if (this.page?.url() === url) {
            return this.page!;
        }

        logger.info(`Navigating to ${url}`);

        await this.page?.goto(url);
        await this.page?.waitForFunction(
            'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500'
        );

        logger.info(`Page ${url} is ready`);

        return this.page!;
    }
}