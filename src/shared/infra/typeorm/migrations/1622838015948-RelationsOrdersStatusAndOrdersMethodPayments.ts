import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationsOrdersStatusAndOrdersMethodPayments1622838015948
  implements MigrationInterface
{
  name = 'RelationsOrdersStatusAndOrdersMethodPayments1622838015948';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE "orders" ADD "method_payment_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_204b2d544c8369b858cdc703907" FOREIGN KEY ("method_payment_id") REFERENCES "methods_payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_8f75b73782e6553e90b88c3404d" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_97f20482064923f539d8d0dc1e8" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP CONSTRAINT "FK_97f20482064923f539d8d0dc1e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP CONSTRAINT "FK_8f75b73782e6553e90b88c3404d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_204b2d544c8369b858cdc703907"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "method_payment_id"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_97f20482064923f539d8d0dc1e"`);
    await queryRunner.query(`DROP INDEX "IDX_8f75b73782e6553e90b88c3404"`);
    await queryRunner.query(`DROP TABLE "orders_status"`);
  }
}
