import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationUserFavoriteProduct1622665493925
  implements MigrationInterface
{
  name = 'RelationUserFavoriteProduct1622665493925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorities_users_products" ("user_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_09c5fe71074116caf716e61c720" PRIMARY KEY ("user_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f12c825bee2af1f94af491481f" ON "favorities_users_products" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb80556e7094f36efa5757ff40" ON "favorities_users_products" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" ADD CONSTRAINT "FK_f12c825bee2af1f94af491481fc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" ADD CONSTRAINT "FK_fb80556e7094f36efa5757ff40f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" DROP CONSTRAINT "FK_fb80556e7094f36efa5757ff40f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" DROP CONSTRAINT "FK_f12c825bee2af1f94af491481fc"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_fb80556e7094f36efa5757ff40"`);
    await queryRunner.query(`DROP INDEX "IDX_f12c825bee2af1f94af491481f"`);
    await queryRunner.query(`DROP TABLE "favorities_users_products"`);
  }
}
