import {Dependency} from "@nerisma/di";
import {CrudService} from "@nerisma/express-extended";
import {DataSource} from "typeorm";
import {Tracker} from "../entities/Tracker.entity";
import {Scan} from "../entities/Scan.entity";

@Dependency()
export class ScanService extends CrudService<Scan> {

    constructor(datasource: DataSource) {
        super(datasource, Scan);
    }
}