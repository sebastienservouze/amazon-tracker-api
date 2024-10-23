import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729691354203 implements MigrationInterface {
    name = 'Migrations1729691354203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price_change" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "oldPrice" numeric(10,2) NOT NULL, "newPrice" numeric(10,2) NOT NULL, "productId" integer, CONSTRAINT "PK_bd582fe9e20930d358a85b18d49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amazonId" character varying NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "lowestPrice" numeric(10,2) NOT NULL, "averagePrice" numeric(10,2) NOT NULL, "highestPrice" numeric(10,2) NOT NULL, "lastScan" TIMESTAMP NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ce9f6282c9f10032820c20b84c" ON "product" ("amazonId") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variants_product" ("productId_1" integer NOT NULL, "productId_2" integer NOT NULL, CONSTRAINT "PK_0c374abf63d5b392b7c744ceb99" PRIMARY KEY ("productId_1", "productId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_52123a9d4c0b8e53185076f188" ON "product_variants_product" ("productId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_8c79256e1773bd9c18b82b3800" ON "product_variants_product" ("productId_2") `);
        await queryRunner.query(`CREATE TABLE "user_products_product" ("userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_31e9c4932027ab0d5b459b4bbe9" PRIMARY KEY ("userId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f75a259330a1b34d6c68206b42" ON "user_products_product" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e92508a7e69cb8011f4bbf9b2" ON "user_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "price_change" ADD CONSTRAINT "FK_0ea8d8b3bae310ba224f8a15578" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variants_product" ADD CONSTRAINT "FK_52123a9d4c0b8e53185076f188c" FOREIGN KEY ("productId_1") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variants_product" ADD CONSTRAINT "FK_8c79256e1773bd9c18b82b3800b" FOREIGN KEY ("productId_2") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_products_product" ADD CONSTRAINT "FK_f75a259330a1b34d6c68206b42f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_products_product" ADD CONSTRAINT "FK_8e92508a7e69cb8011f4bbf9b2e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_products_product" DROP CONSTRAINT "FK_8e92508a7e69cb8011f4bbf9b2e"`);
        await queryRunner.query(`ALTER TABLE "user_products_product" DROP CONSTRAINT "FK_f75a259330a1b34d6c68206b42f"`);
        await queryRunner.query(`ALTER TABLE "product_variants_product" DROP CONSTRAINT "FK_8c79256e1773bd9c18b82b3800b"`);
        await queryRunner.query(`ALTER TABLE "product_variants_product" DROP CONSTRAINT "FK_52123a9d4c0b8e53185076f188c"`);
        await queryRunner.query(`ALTER TABLE "price_change" DROP CONSTRAINT "FK_0ea8d8b3bae310ba224f8a15578"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e92508a7e69cb8011f4bbf9b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f75a259330a1b34d6c68206b42"`);
        await queryRunner.query(`DROP TABLE "user_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c79256e1773bd9c18b82b3800"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_52123a9d4c0b8e53185076f188"`);
        await queryRunner.query(`DROP TABLE "product_variants_product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce9f6282c9f10032820c20b84c"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "price_change"`);
    }

}
