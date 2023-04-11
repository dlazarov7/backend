import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Employees1681125723195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "employees",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name:"manager_id",
                            type:"int",
                            isNullable:false
                        },
                        {
                            name:"team_id",
                            type:"int" ,
                            isNullable:false                     
                           
                        },
                        {
                            name:"first_name",
                            type:"varchar",
                            isNullable:false

                        },
                        {
                            name:"last_name",
                            type:"varchar",
                            isNullable:false
                        },
                        {
                            name:"username",
                            type:"varchar",
                            isUnique:true,
                            isNullable:false
                        },
                        {
                            name:"email",
                            type:"varchar",
                            isUnique:true,
                            isNullable:false
                        },
                        {
                            name:"position",
                            type:"varchar",
                            isNullable:true
                        },
                        {
                            name:"salary",
                            type:'double precision',
                            isNullable:true
                        },
                        {
                            name:"startDate",
                            type:"timestamp",
                            isNullable:false
                        },
                        {
                            name:"endDate",
                            type:"timestamp",
                            isNullable:true
                        }
                            

                    ]
                }
            )
        )

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("employees")
        await queryRunner.dropForeignKeys(table,table.foreignKeys);
        await queryRunner.dropTable(table, true);
    }

}
