import {Dependency} from "@nerisma/di";
import {CrudService} from "@nerisma/express-extended";
import {Product} from "../entities/Product.entity";
import {DataSource} from "typeorm";
import {ProductScrapper} from "../scrappers/Product.scrapper";
import {logger} from "../logger/Logger";

@Dependency()
export class ProductService extends CrudService<Product> {

    constructor(datasource: DataSource, private readonly productScrapper: ProductScrapper) {
        super(datasource, Product);
    }

    async createMany(products: Product[]): Promise<Product[]> {
        return this.repository?.save(products) ?? [];
    }

    async scrap(url: string): Promise<Partial<Product>> {
        const amazonId = url.split('/')[5];
        const existingProduct = await this.repository?.findOne({
            where: {amazonId},
            relations: ['variants']
        });

        if (existingProduct) {
            logger.info(`Product ${existingProduct.name} already exists`);
            return existingProduct;
        }

        return await this.productScrapper.scrap(url);
    }
}