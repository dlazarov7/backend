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
                            type:"int",
                            isPrimary:true,
                            isGenerated:true,
                            generationStrategy:"increment"
                        },
                        {
                            name:"name",
                            type:"varchar",
                            isUnique:true
                        },
                        {
                            name:"country",
                            type:"varchar"
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
