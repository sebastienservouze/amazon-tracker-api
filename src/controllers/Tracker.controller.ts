import {Controller} from "@nerisma/express-extended";
import {ProductService} from "../services/Product.service";

@Controller('/tracker')
export class TrackerController {

    constructor(private readonly productService: ProductService) {
    }


}