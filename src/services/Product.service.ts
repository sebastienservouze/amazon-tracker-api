import {Dependency} from "@nerisma/di";
import {CrudService} from "@nerisma/express-extended";
import {Product} from "../entities/Product.entity";
import {DataSource} from "typeorm";

@Dependency()
export class ProductService extends CrudService<Product> {

    constructor(datasource: DataSource) {
        super(datasource, Product);
    }

    async createMany(products: Product[]): Promise<Product[]> {
        return this.repository?.save(products) ?? [];
    }
}