import { MigrationInterface, QueryRunner } from 'typeorm';

export default class FirstMigration1628014375980 implements MigrationInterface {
  name = 'FirstMigration1628014375980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" character varying NOT NULL, "complement" character varying, "reference_point" character varying, "alias" character varying, "default" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_7069e03339ee0685d2826a2a771" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "avatar_social_media" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "acquirer_id" character varying NOT NULL, "acquirer_name" character varying NOT NULL, "acquirer_response_code" character varying NOT NULL, "transaction_amount" integer NOT NULL, "status" character varying NOT NULL, "refuse_reason" character varying, "status_reason" character varying NOT NULL, "authorization_code" character varying, "tid" integer NOT NULL, "payment_method" character varying NOT NULL, "card_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "delivery" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "transaction" uuid, "billing_address_id" uuid, "shipping_address_id" uuid, CONSTRAINT "REL_1877026b1b8d8902fe6737cf0e" UNIQUE ("transaction"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid, CONSTRAINT "PK_d4c057ba4855161f1ba9542fa47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "cost_price" double precision NOT NULL, "sale_price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "responsibility" character varying NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store_adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" character varying NOT NULL, "complement" character varying, "reference_point" character varying, "lat" double precision, "long" double precision, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "REL_7931db99260537195e62120fa8" UNIQUE ("store_id"), CONSTRAINT "PK_e586977d4c4520c445d3e353782" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stores_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "PK_a2d6374035febd0d1d28ea90adc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "cnpj" character varying NOT NULL, "image_logo" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_9e144a67be49e5bba91195ef5d" UNIQUE ("user_id"), CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`,
    );
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
      `CREATE TABLE "orders_status" ("order_id" uuid NOT NULL, "status_id" uuid NOT NULL, CONSTRAINT "PK_6c4cfcc9ea71dcffbb5adc7dc07" PRIMARY KEY ("order_id", "status_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f75b73782e6553e90b88c3404" ON "orders_status" ("order_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97f20482064923f539d8d0dc1e" ON "orders_status" ("status_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_products" ("product_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_99a8246a1c03587ec10bd93836b" PRIMARY KEY ("product_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd4647bd19e92294b58a536798" ON "categories_products" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18751735d6d4936849dafa4d75" ON "categories_products" ("category_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_18751735d6d4936849dafa4d75"`);
    await queryRunner.query(`DROP INDEX "IDX_cd4647bd19e92294b58a536798"`);
    await queryRunner.query(`DROP TABLE "categories_products"`);
    await queryRunner.query(`DROP INDEX "IDX_97f20482064923f539d8d0dc1e"`);
    await queryRunner.query(`DROP INDEX "IDX_8f75b73782e6553e90b88c3404"`);
    await queryRunner.query(`DROP TABLE "orders_status"`);
    await queryRunner.query(`DROP INDEX "IDX_fb80556e7094f36efa5757ff40"`);
    await queryRunner.query(`DROP INDEX "IDX_f12c825bee2af1f94af491481f"`);
    await queryRunner.query(`DROP TABLE "favorities_users_products"`);
    await queryRunner.query(`DROP TABLE "user_tokens"`);
    await queryRunner.query(`DROP TABLE "stores"`);
    await queryRunner.query(`DROP TABLE "stores_images"`);
    await queryRunner.query(`DROP TABLE "store_adresses"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "products_photos"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_adresses"`);
  }
}
