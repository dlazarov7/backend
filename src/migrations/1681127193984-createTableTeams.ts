import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Teams1681127193984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "teams",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isGenerated: true,
                            generationStrategy: "increment",
                            isPrimary: true
                        },
                        {
                            name: "company_id",
                            type: "int",
                            //foreignKeyConstraintName: "company_id_fk"

                        },
                        {
                            name: "name",
                            type: "varchar"
                        },
                        {
                            name: "department",
                            type: "varchar",
                        },
                        {
                            name: "description",
                            type: "varchar",
                            isNullable: true
                        }

                    ]
                })
        )
     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("teams");
        await queryRunner.dropForeignKeys(table,table.foreignKeys);
        await queryRunner.dropTable(table, true);
    }

}
