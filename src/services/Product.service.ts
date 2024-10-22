import {Dependency} from "@nerisma/di";
import {CrudService} from "@nerisma/express-extended";
import {Product} from "../entities/Product.entity";
import {DataSource, FindOptionsWhere} from "typeorm";
import {Page} from '@nerisma/express-extended';

@Dependency()
export class ProductService extends CrudService<Product> {

    constructor(datasource: DataSource) {
        super(datasource, Product);
    }

    async createMany(products: Product[]): Promise<Product[]> {
        return this.repository?.save(products) ?? [];
    }
}