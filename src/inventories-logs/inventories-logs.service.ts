import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoriesLogs } from "./inventories-logs.entity";
import { Repository } from "typeorm";
import { CreateInventoriesDto } from "../inventories/dto/createInventoriesDto";

@Injectable()
export class InventoriesLogsService {
  constructor(
    @InjectRepository(InventoriesLogs)
    private inventoriesLogsRepository: Repository<InventoriesLogs>,
  ) {}

  async createOne(createInventoriesDto: CreateInventoriesDto) {
    try {
      return await this.inventoriesLogsRepository.save(createInventoriesDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
     }
  }
}
