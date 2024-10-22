import {Column, Entity, OneToMany} from "typeorm";
import {AuthRole} from "../enums/AuthRole.enum";
import {MetadataEntity} from "@nerisma/express-extended";
import {Tracker} from "./Tracker.entity";


@Entity()
export class User extends MetadataEntity {

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({default: AuthRole.GUEST})
    role!: string;

    /* Relations */

    @OneToMany(() => Tracker, tracker => tracker.user)
    trackers?: Tracker[];
}