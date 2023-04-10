import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Companies1681127165473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name:"companies",
                    columns:[
                        {
                            name:"id",
                            type:"number",
                            isPrimary:true,
                            isGenerated:true,
                            generationStrategy:"increment"
                        },
                        {
                            name:"name",
                            type:"string",
                            isUnique:true
                        },
                        {
                            name:"country",
                            type:"string"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companies",true)
    }

}
