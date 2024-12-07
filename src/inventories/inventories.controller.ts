import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateInventoriesDto } from './dto/createInventoriesDto';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { InventoriesService } from './inventories.service';
import { TCreateInventoriesResponse } from './types/TCreateInventoriesResponse';
import { UpdateInventoriesDto } from './dto/updateInventoriesDto';

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
      const inventoriesLogs =
        await this.inventoriesLogsService.createNewAddition(inventories);
      return {
        id: inventoriesLogs.inventories_id,
        name: inventoriesLogs.name,
        size: inventoriesLogs.size,
        color: inventoriesLogs.color,
        amount: inventoriesLogs.amount,
        unit: inventoriesLogs.unit,
        brand: inventoriesLogs.brand,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/findAll')
  async findAllInventoriesController(
    @Query('name') name: string,
    @Query('brand') brand: string,
    @Query('size') size: string,
    @Query('color') color: string,
  ) {
    try {
      return await this.inventoriesService.findAll(name, brand, size, color);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Delete('/:id')
  async deleteInventoriesController(@Param('id') id: number) {
    try {
      const inventoriesLogs =
        await this.inventoriesLogsService.deleteByInventoriesId(id);
      const inventories = await this.inventoriesService.deleteOne(id);
      return {
        inventoriesLogs,
        inventories,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Put('/:id')
  async updateInventoriesController(
    @Param('id') id: number,
    @Body() updateInventoriesDto: UpdateInventoriesDto,
  ) {
    try {
      if (updateInventoriesDto.amount) {
        const inventories = await this.inventoriesService.findOne(id);
        if (inventories.amount !== updateInventoriesDto.amount) {
          await this.inventoriesLogsService.createOneFromUpdate(
            inventories,
            updateInventoriesDto,
          );
        }
      }
      return await this.inventoriesService.updateOne(id, updateInventoriesDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/findAllBrands')
  async findAllInventoriesBrandsController() {
    try {
      return await this.inventoriesService.findAllDistinctBrand();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/findAllSize')
  async findAllInventoriesSizeController() {
    try {
      return await this.inventoriesService.findAllDistinctSize();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/findAllColor')
  async findAllInventoriesColorController() {
    try {
      return await this.inventoriesService.findAllDistinctColor();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
