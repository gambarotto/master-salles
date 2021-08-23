import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatePaymentCards1629394858448
  implements MigrationInterface
{
  name = 'CreatePaymentCards1629394858448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card_id" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_c1047d29f1a1e4af3ff74ecef52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_cards" ADD CONSTRAINT "FK_0fd3859231b68ee0f89b4d6a866" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_cards" DROP CONSTRAINT "FK_0fd3859231b68ee0f89b4d6a866"`,
    );
    await queryRunner.query(`DROP TABLE "payment_cards"`);
  }
}
