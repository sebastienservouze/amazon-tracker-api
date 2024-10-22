import {MetadataEntity} from "@nerisma/express-extended";
import {User} from "./User.entity";
import {Product} from "./Product.entity";
import {Entity, JoinTable, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {Scan} from "./Scan.entity";

@Entity()
export class Tracker extends MetadataEntity {

    @ManyToOne(() => User, user => user.trackers)
    user!: User;

    @OneToOne(() => Product, product => product.tracker)
    @JoinTable()
    product!: Product;

    @OneToMany(() => Scan, scan => scan.tracker)
    @JoinTable()
    scans?: Scan[];
}