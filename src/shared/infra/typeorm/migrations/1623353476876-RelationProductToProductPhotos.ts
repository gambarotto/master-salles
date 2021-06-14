import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationProductToProductPhotos1623353476876
  implements MigrationInterface
{
  name = 'RelationProductToProductPhotos1623353476876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid, CONSTRAINT "PK_d4c057ba4855161f1ba9542fa47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_photos" ADD CONSTRAINT "FK_3bbf16971348278627cffa1da17" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_photos" DROP CONSTRAINT "FK_3bbf16971348278627cffa1da17"`,
    );
    await queryRunner.query(`DROP TABLE "products_photos"`);
  }
}
