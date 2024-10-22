import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1729623458531 implements MigrationInterface {
    name = 'Init1729623458531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price_change" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "oldPrice" integer NOT NULL, "newPrice" integer NOT NULL, "productId" integer, CONSTRAINT "PK_bd582fe9e20930d358a85b18d49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amazonId" character varying NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ce9f6282c9f10032820c20b84c" ON "product" ("amazonId") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_products_product" ("userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_31e9c4932027ab0d5b459b4bbe9" PRIMARY KEY ("userId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f75a259330a1b34d6c68206b42" ON "user_products_product" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e92508a7e69cb8011f4bbf9b2" ON "user_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "price_change" ADD CONSTRAINT "FK_0ea8d8b3bae310ba224f8a15578" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_products_product" ADD CONSTRAINT "FK_f75a259330a1b34d6c68206b42f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_products_product" ADD CONSTRAINT "FK_8e92508a7e69cb8011f4bbf9b2e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_products_product" DROP CONSTRAINT "FK_8e92508a7e69cb8011f4bbf9b2e"`);
        await queryRunner.query(`ALTER TABLE "user_products_product" DROP CONSTRAINT "FK_f75a259330a1b34d6c68206b42f"`);
        await queryRunner.query(`ALTER TABLE "price_change" DROP CONSTRAINT "FK_0ea8d8b3bae310ba224f8a15578"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e92508a7e69cb8011f4bbf9b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f75a259330a1b34d6c68206b42"`);
        await queryRunner.query(`DROP TABLE "user_products_product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce9f6282c9f10032820c20b84c"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "price_change"`);
    }

}
