import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeTransactionAndTotalField1628099513589
  implements MigrationInterface
{
  name = 'ChangeTransactionAndTotalField1628099513589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_1877026b1b8d8902fe6737cf0ec"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "REL_1877026b1b8d8902fe6737cf0e"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "transaction"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "orders" ADD "transaction_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "UQ_4547f22852bd9778b54dafe30e5" UNIQUE ("transaction_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_4547f22852bd9778b54dafe30e5" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_4547f22852bd9778b54dafe30e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "UQ_4547f22852bd9778b54dafe30e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "transaction_id"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "transaction" uuid`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "REL_1877026b1b8d8902fe6737cf0e" UNIQUE ("transaction")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "total" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_1877026b1b8d8902fe6737cf0ec" FOREIGN KEY ("transaction") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
