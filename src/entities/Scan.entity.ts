import {MetadataEntity} from "@nerisma/express-extended";
import {User} from "./User.entity";
import {Product} from "./Product.entity";
import {Column, JoinTable, ManyToOne, OneToOne} from "typeorm";
import {Tracker} from "./Tracker.entity";


export class Scan extends MetadataEntity {

    @Column()
    price!: number;

    @ManyToOne(() => Tracker, tracker => tracker.scans)
    tracker!: Tracker
}