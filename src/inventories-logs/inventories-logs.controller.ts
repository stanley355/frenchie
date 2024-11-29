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
  async findAllInventoriesLogsController(@Query('name') name: string) {
    try {
      return await this.inventoriesLogsService.findAll(name);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
