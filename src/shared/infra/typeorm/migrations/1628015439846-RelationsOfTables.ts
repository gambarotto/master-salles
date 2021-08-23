import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationsOfTables1628015439846
  implements MigrationInterface
{
  name = 'RelationsOfTables1628015439846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_adresses" ADD CONSTRAINT "FK_ded93b7cc9ec9349786afa0e226" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_1877026b1b8d8902fe6737cf0ec" FOREIGN KEY ("transaction") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_d5bda805951a38147cb93726a77" FOREIGN KEY ("billing_address_id") REFERENCES "user_adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_67b8be57fc38bda573d2a8513ec" FOREIGN KEY ("shipping_address_id") REFERENCES "user_adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_photos" ADD CONSTRAINT "FK_3bbf16971348278627cffa1da17" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_adresses" ADD CONSTRAINT "FK_7931db99260537195e62120fa8d" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores_images" ADD CONSTRAINT "FK_5087781a79c698f73cdf41ed70e" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" ADD CONSTRAINT "FK_f12c825bee2af1f94af491481fc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" ADD CONSTRAINT "FK_fb80556e7094f36efa5757ff40f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_8f75b73782e6553e90b88c3404d" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_97f20482064923f539d8d0dc1e8" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" ADD CONSTRAINT "FK_cd4647bd19e92294b58a536798c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" ADD CONSTRAINT "FK_18751735d6d4936849dafa4d751" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_products" DROP CONSTRAINT "FK_18751735d6d4936849dafa4d751"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" DROP CONSTRAINT "FK_cd4647bd19e92294b58a536798c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP CONSTRAINT "FK_97f20482064923f539d8d0dc1e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP CONSTRAINT "FK_8f75b73782e6553e90b88c3404d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" DROP CONSTRAINT "FK_fb80556e7094f36efa5757ff40f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorities_users_products" DROP CONSTRAINT "FK_f12c825bee2af1f94af491481fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores_images" DROP CONSTRAINT "FK_5087781a79c698f73cdf41ed70e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_adresses" DROP CONSTRAINT "FK_7931db99260537195e62120fa8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_photos" DROP CONSTRAINT "FK_3bbf16971348278627cffa1da17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_67b8be57fc38bda573d2a8513ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_d5bda805951a38147cb93726a77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_1877026b1b8d8902fe6737cf0ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_adresses" DROP CONSTRAINT "FK_ded93b7cc9ec9349786afa0e226"`,
    );
  }
}
