import { AutoMap } from "@automapper/classes";

export default class AvgSalaryDto{
    @AutoMap()
    avgSalary:number;

    @AutoMap()
    department:string;


}