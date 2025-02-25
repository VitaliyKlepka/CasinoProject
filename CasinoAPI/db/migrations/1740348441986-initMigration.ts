import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitMigration1740348441986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // create Accounts table if not exists
      await queryRunner.createTable(
        new Table({
          name: 'accounts',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'is_active',
              type: 'boolean',
              default: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );

      // create AuthSessions table if not exists
      await queryRunner.createTable(
        new Table({
          name: 'auth_sessions',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'account_id',
              type: 'int',
            },
            {
              name: 'device_id',
              type: 'varchar',
            },
            {
              name: 'payload',
              type: 'text',
            },
            {
              name: 'expires_at',
              type: 'timestamp',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('auth_sessions');
      await queryRunner.dropTable('accounts');
    }

}
