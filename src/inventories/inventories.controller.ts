import {
  Body,
  Controller, Get,
  InternalServerErrorException,
  Post
} from "@nestjs/common";
import { CreateInventoriesDto } from './dto/createInventoriesDto';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { InventoriesService } from "./inventories.service";

@Controller('inventories')
export class InventoriesController {
  constructor(private inventoriesLogsService: InventoriesLogsService, private inventoriesService: InventoriesService) {}

  @Post('/create')
  async createInventoriesController(
    @Body() createInventoriesDto: CreateInventoriesDto,
  ) {
    try {
      await this.inventoriesLogsService.createOne(createInventoriesDto);
      return await this.inventoriesService.createOne(createInventoriesDto)
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
