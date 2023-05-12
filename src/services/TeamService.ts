import { createMap, forMember, mapFrom } from "@automapper/core";
import { AppDataSource } from "../data-source";
import { Team } from "../models/Team";
import { mapper } from "../utilities/mapper/AutoMapper";
import TeamDto from "../dtos/TeamDto";
import { Company } from "../models/Company";
import CompanyDto from "../dtos/CompanyDto";


export class TeamService {
    private static instance: TeamService;
    constructor() { };
    static getInstance() {
        if (!this.instance) {
            this.instance = new TeamService();
            createMap(mapper, Team, TeamDto);
            createMap(mapper, TeamDto, Team, forMember(
                destination => destination.company,
                mapFrom(src => mapper.map(src.company, Company, CompanyDto))
            ));
        }
        return this.instance;
    }

    async getAllTeams() {
        const teams = await AppDataSource
            .getRepository(Team)
            .createQueryBuilder("team")
            .getMany()
            
        return teams;
    }
}