import {Dependency} from "@nerisma/di";
import {CrudService} from "@nerisma/express-extended";
import {DataSource} from "typeorm";
import {Tracker} from "../entities/Tracker.entity";

@Dependency()
export class TrackerService extends CrudService<Tracker> {

    constructor(datasource: DataSource) {
        super(datasource, Tracker);
    }
}