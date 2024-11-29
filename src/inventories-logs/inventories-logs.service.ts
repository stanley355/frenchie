import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InventoriesLogs,
  InventoriesLogsAction,
} from './inventories-logs.entity';
import { Repository } from 'typeorm';
import { Inventories } from '../inventories/inventories.entity';
import { UpdateInventoriesDto } from '../inventories/dto/updateInventoriesDto';

@Injectable()
export class InventoriesLogsService {
  constructor(
    @InjectRepository(InventoriesLogs)
    private inventoriesLogsRepository: Repository<InventoriesLogs>,
  ) {}

  async createOne(inventories: Inventories) {
    try {
      const data = {
        inventories_id: inventories.id,
        name: inventories.name,
        size: inventories.size,
        color: inventories.color,
        amount: inventories.amount,
        unit: inventories.unit,
        action: InventoriesLogsAction.Addition,
      };
      return await this.inventoriesLogsRepository.save(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteByInventoriesId(id: number) {
    try {
      return await this.inventoriesLogsRepository.delete({
        inventories_id: id,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createOneFromUpdate(
    inventories: Inventories,
    updateData: UpdateInventoriesDto,
  ) {
    try {
      const isAddition = updateData.amount > inventories.amount;

      const data = {
        inventories_id: inventories.id,
        name: inventories.name,
        size: inventories.size,
        color: inventories.color,
        amount: isAddition
          ? updateData.amount - inventories.amount
          : inventories.amount - updateData.amount,
        unit: inventories.unit,
        action: isAddition
          ? InventoriesLogsAction.Addition
          : InventoriesLogsAction.Substraction,
      };
      return await this.inventoriesLogsRepository.save(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
