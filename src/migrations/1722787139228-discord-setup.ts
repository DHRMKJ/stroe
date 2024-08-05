import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscordSetup1722787139228 implements MigrationInterface {
    name = 'DiscordSetup1722787139228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP CONSTRAINT "UQ_b1dea4d0e8fa91e5376847ce769"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "google_user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "account_sessions"
            ADD "last_logged_in" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "username" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "global_name" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "discord_id" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD CONSTRAINT "UQ_01218d4c17d7d41ca8b4f860df4" UNIQUE ("discord_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "accent_color" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "banner_color" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "verified" boolean NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "avatar_id" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "mfa_enabled" boolean NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "locale" text NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "locale"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "mfa_enabled"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "avatar_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "verified"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "banner_color"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "accent_color"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP CONSTRAINT "UQ_01218d4c17d7d41ca8b4f860df4"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "discord_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "global_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "account_sessions" DROP COLUMN "last_logged_in"
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD "google_user_id" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "accounts"
            ADD CONSTRAINT "UQ_b1dea4d0e8fa91e5376847ce769" UNIQUE ("google_user_id")
        `);
    }

}
