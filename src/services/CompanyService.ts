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

    async deleteCompany(id: string) {
        const toDelete = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder()
            .delete()
            .from(Company)
            .where("id=:id", { id: id })
            .execute();
        return toDelete;
    }

    async editCompany(companyDto: CompanyDto) {
        const company = mapper.map(companyDto, CompanyDto, Company)
        const companyToEdit = await AppDataSource
            .getRepository(Company)
            .save(company)
        return mapper.map(companyToEdit, Company, CompanyDto);
    }

    async addCompany(companyDto: CompanyDto) {
        const company = mapper.map(companyDto, CompanyDto, Company);
        const newCompany = await AppDataSource
            .getRepository(Company)
            .save(company);

        return mapper.map(newCompany, Company, CompanyDto);
    }

    async getCompanyById(id: number) {
        const company = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .where("company.id=:id", { id: id })
            .getOne();
        return mapper.map(company, Company, CompanyDto)
    }

    async getAllCompanies() {
        const companies = await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .getMany();

        return companies.map(company => mapper.map(company, Company, CompanyDto));
    }
}