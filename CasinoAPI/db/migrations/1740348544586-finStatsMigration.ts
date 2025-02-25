import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class FinStatsMigration1740401094586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // create fin_stats table if not exists
      await queryRunner.createTable(
        new Table({
          name: 'fin_stats',
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
              isNullable: false,
            },
            {
              name: 'credits',
              type: 'decimal',
              isNullable: false,
              default: 0,
            },
            {
              name: 'ballance',
              type: 'decimal',
              isNullable: false,
              default: 0,
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
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('fin_stats');
    }

}
