import {Controller, CrudController, Get} from "@nerisma/express-extended";
import {Product} from "../entities/Product.entity";
import {ProductService} from "../services/Product.service";
import {Page} from "@nerisma/express-extended";
import {Request, Response} from "express";

@Controller('/products')
export class ProductController extends CrudController<Product> {

    constructor(private readonly productService: ProductService) {
        super(productService);
    }

}