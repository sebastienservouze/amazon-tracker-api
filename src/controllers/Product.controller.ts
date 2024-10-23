import {Controller, CrudController, Get, Post} from "@nerisma/express-extended";
import {Product} from "../entities/Product.entity";
import {ProductService} from "../services/Product.service";
import {Request, Response} from "express";

@Controller('/products')
export class ProductController extends CrudController<Product> {

    constructor(private readonly productService: ProductService) {
        super(productService);
    }

    @Post('/scrap')
    public async scrap(req: Request, res: Response) {
        if (!req.body.url) {
            return res.status(400).json({message: 'URL is required'});
        }

        try {
            const product = await this.productService.scrap(req.body.url as string);
            return res.status(200).json(product);
        } catch (e: any) {
            return res.status(500).json({message: `Error while discovering product: ${e.message}`});
        }
    }
}