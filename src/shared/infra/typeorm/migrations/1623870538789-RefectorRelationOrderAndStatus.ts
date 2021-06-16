import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RefectorRelationOrderAndStatus1623870538789
  implements MigrationInterface
{
  name = 'RefectorRelationOrderAndStatus1623870538789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP CONSTRAINT "FK_97f20482064923f539d8d0dc1e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP CONSTRAINT "FK_8f75b73782e6553e90b88c3404d"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_8f75b73782e6553e90b88c3404"`);
    await queryRunner.query(`DROP INDEX "IDX_97f20482064923f539d8d0dc1e"`);
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_8f75b73782e6553e90b88c3404d" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_97f20482064923f539d8d0dc1e8" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "orders_status" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97f20482064923f539d8d0dc1e" ON "orders_status" ("status_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f75b73782e6553e90b88c3404" ON "orders_status" ("order_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_8f75b73782e6553e90b88c3404d" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_status" ADD CONSTRAINT "FK_97f20482064923f539d8d0dc1e8" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
