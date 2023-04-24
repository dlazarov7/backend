import { createMap } from "@automapper/core";
import { AppDataSource } from "../data-source";
import { Company } from "../models/Company";
import { mapper } from "../utilities/mapper/AutoMapper";
import CompanyDto from "../dtos/CompanyDto";


export class CompanyService {

    private static instance: CompanyService;
    constructor() { };
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyService();
            createMap(mapper, Company, CompanyDto);
            createMap(mapper, CompanyDto, Company);

        }
        return this.instance;
    }

    async deleteCompany(companyName: string) {
        const toDelete = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder()
            .delete()
            .from(Company)
            .where("name=:name", { name: companyName })
            .execute()
        return toDelete;
    }

    async editCompany(companyId: number, newName: string, newCountry: string) {
        const company = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder("company")
            .update()
            .set({ name: newName, country: newCountry })
            .where("id=:id", { id: companyId })
            .execute();
        return company;
    }

    async addCompany(companyName: string, countryName: string) {
        const company = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder("company")
            .insert()
            .into(Company)
            .values({
                name: companyName,
                country: countryName
            })
            .execute();
        return company;
    }

    async getCompanyById(comapanyId: number) {
        const company = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .where("company.name=:id", { id: comapanyId })
        return company
    }

    async getAllCompanies() {
        const companies = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .getMany();

        return companies;
    }
}