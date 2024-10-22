import {Dependency} from "@nerisma/di";
import {CrudService} from "@nerisma/express-extended";
import {DataSource} from "typeorm";
import {PriceChange} from "../entities/PriceChange.entity";

@Dependency()
export class PriceChangeService extends CrudService<PriceChange> {

    constructor(datasource: DataSource) {
        super(datasource, PriceChange);
    }
}