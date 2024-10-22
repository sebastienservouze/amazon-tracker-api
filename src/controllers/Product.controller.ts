import {Controller, CrudController} from "@nerisma/express-extended";
import {Product} from "../entities/Product.entity";
import {ProductService} from "../services/Product.service";

@Controller('/products')
export class ProductController extends CrudController<Product> {

    constructor(private readonly productService: ProductService) {
        super(productService);
    }

}