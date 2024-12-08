import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { InventoriesLogsService } from './inventories-logs.service';

@Controller('inventories-logs')
export class InventoriesLogsController {
  constructor(private inventoriesLogsService: InventoriesLogsService) {}

  @Get('/findAll')
  async findAllInventoriesLogsController(
    @Query('name') name: string,
    @Query('brand') brand: string,
    @Query('size') size: string,
    @Query('color') color: string,
  ) {
    try {
      return await this.inventoriesLogsService.findAll(
        name,
        brand,
        size,
        color,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
