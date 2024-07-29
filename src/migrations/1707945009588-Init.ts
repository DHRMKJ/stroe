import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1707945009588 implements MigrationInterface {
  name = 'Init1707945009588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "account_sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "ip_address" text NOT NULL,
                "valid_till" TIMESTAMP NOT NULL,
                "account_id" uuid NOT NULL,
                CONSTRAINT "PK_2cd6ab4022fd3aa1e90ca61e3fb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "accounts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "google_user_id" text NOT NULL,
                "email" text NOT NULL,
                CONSTRAINT "UQ_b1dea4d0e8fa91e5376847ce769" UNIQUE ("google_user_id"),
                CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"),
                CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "account_sessions"
            ADD CONSTRAINT "FK_089c9da3ef4217f28a7df00dbc6" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "account_sessions" DROP CONSTRAINT "FK_089c9da3ef4217f28a7df00dbc6"
        `);
    await queryRunner.query(`
            DROP TABLE "accounts"
        `);
    await queryRunner.query(`
            DROP TABLE "account_sessions"
        `);
  }
}
