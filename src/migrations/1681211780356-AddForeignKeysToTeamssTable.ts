import { MigrationInterface, QueryRunner,TableForeignKey } from "typeorm"

export class AddForeignKeysToTeamssTable1681211780356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('teams', [
            new TableForeignKey({
                name: `FK_teams_company_id_companies_id`,
                columnNames: ['company_id'],
                referencedTableName: 'companies',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("teams");
        await queryRunner.dropForeignKeys(table,table.foreignKeys);
    }

}
