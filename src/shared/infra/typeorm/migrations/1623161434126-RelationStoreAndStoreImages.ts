import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationStoreAndStoreImages1623161434126
  implements MigrationInterface
{
  name = 'RelationStoreAndStoreImages1623161434126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stores_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "PK_a2d6374035febd0d1d28ea90adc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores_images" ADD CONSTRAINT "FK_5087781a79c698f73cdf41ed70e" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stores_images" DROP CONSTRAINT "FK_5087781a79c698f73cdf41ed70e"`,
    );
    await queryRunner.query(`DROP TABLE "stores_images"`);
  }
}
