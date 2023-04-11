import { MigrationInterface, QueryRunner,TableForeignKey } from "typeorm"

export class AddForeignKeysToEmployeesTable1681211647912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('employees', [
            new TableForeignKey({
                name: `FK_employees_team_id_teams_id`,
                columnNames: ['team_id'],
                referencedTableName: 'teams',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                name: `FK_employees_manager_id_employees_id`,
                columnNames: ['manager_id'],
                referencedTableName: 'employees',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("employees")
        await queryRunner.dropForeignKeys(table,table.foreignKeys);
    }

}
