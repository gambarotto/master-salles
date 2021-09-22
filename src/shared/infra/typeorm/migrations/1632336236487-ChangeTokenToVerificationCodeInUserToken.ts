import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeTokenToVerificationCodeInUserToken1632336236487
  implements MigrationInterface
{
  name = 'ChangeTokenToVerificationCodeInUserToken1632336236487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" DROP CONSTRAINT "FK_fb80556e7094f36efa5757ff40f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" DROP CONSTRAINT "FK_f12c825bee2af1f94af491481fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" DROP CONSTRAINT "FK_8f75b73782e6553e90b88c3404d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" DROP CONSTRAINT "FK_97f20482064923f539d8d0dc1e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" DROP CONSTRAINT "FK_cd4647bd19e92294b58a536798c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" DROP CONSTRAINT "FK_18751735d6d4936849dafa4d751"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_tokens" RENAME COLUMN "token" TO "verification_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."products" ALTER COLUMN "package" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_tokens" DROP COLUMN "verification_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_tokens" ADD "verification_code" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" ADD CONSTRAINT "FK_f12c825bee2af1f94af491481fc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" ADD CONSTRAINT "FK_fb80556e7094f36efa5757ff40f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" ADD CONSTRAINT "FK_8f75b73782e6553e90b88c3404d" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" ADD CONSTRAINT "FK_97f20482064923f539d8d0dc1e8" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" ADD CONSTRAINT "FK_cd4647bd19e92294b58a536798c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" ADD CONSTRAINT "FK_18751735d6d4936849dafa4d751" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" DROP CONSTRAINT "FK_18751735d6d4936849dafa4d751"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" DROP CONSTRAINT "FK_cd4647bd19e92294b58a536798c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" DROP CONSTRAINT "FK_97f20482064923f539d8d0dc1e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" DROP CONSTRAINT "FK_8f75b73782e6553e90b88c3404d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" DROP CONSTRAINT "FK_fb80556e7094f36efa5757ff40f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" DROP CONSTRAINT "FK_f12c825bee2af1f94af491481fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_tokens" DROP COLUMN "verification_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_tokens" ADD "verification_code" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."products" ALTER COLUMN "package" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_tokens" RENAME COLUMN "verification_code" TO "token"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" ADD CONSTRAINT "FK_18751735d6d4936849dafa4d751" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."categories_products" ADD CONSTRAINT "FK_cd4647bd19e92294b58a536798c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" ADD CONSTRAINT "FK_97f20482064923f539d8d0dc1e8" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."orders_status" ADD CONSTRAINT "FK_8f75b73782e6553e90b88c3404d" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" ADD CONSTRAINT "FK_f12c825bee2af1f94af491481fc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."favorities_users_products" ADD CONSTRAINT "FK_fb80556e7094f36efa5757ff40f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
