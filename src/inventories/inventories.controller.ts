import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateInventoriesDto } from './dto/createInventoriesDto';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { InventoriesService } from './inventories.service';
import { TCreateInventoriesResponse } from "./types/TCreateInventoriesResponse";

@Controller('inventories')
export class InventoriesController {
  constructor(
    private inventoriesLogsService: InventoriesLogsService,
    private inventoriesService: InventoriesService,
  ) {}

  @Post('/create')
  async createInventoriesController(
    @Body() createInventoriesDto: CreateInventoriesDto,
  ): Promise<TCreateInventoriesResponse> {
    try {
      const inventories =
        await this.inventoriesService.createOne(createInventoriesDto);
      const inventoriesLogs = await this.inventoriesLogsService.createOne(inventories);
      return  {
        id: inventoriesLogs.inventories_id,
        name: inventoriesLogs.name,
        size: inventoriesLogs.size,
        color: inventoriesLogs.color,
        amount: inventoriesLogs.amount,
        unit: inventoriesLogs.unit
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/findAll')
  async findAllInventoriesController() {
    try {
      return await this.inventoriesService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
