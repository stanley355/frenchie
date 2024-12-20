import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InventoriesLogs,
  InventoriesLogsAction,
} from './inventories-logs.entity';
import { Like, Repository } from 'typeorm';
import { Inventories } from '../inventories/inventories.entity';

@Injectable()
export class InventoriesLogsService {
  constructor(
    @InjectRepository(InventoriesLogs)
    private inventoriesLogsRepository: Repository<InventoriesLogs>,
  ) {}

  async deleteByInventoriesId(id: number) {
    try {
      return await this.inventoriesLogsRepository.delete({
        inventories_id: id,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  createFindAllWhereFilter(
    name?: string,
    brand?: string,
    size?: string,
    color?: string,
  ) {
    const firstMap = new Map();
    const secondMap = new Map();
    const thirdMap = new Map();
    if (name) {
      firstMap.set('name', Like(`%${name}`));
      secondMap.set('name', Like(`%${name}%`));
      thirdMap.set('name', Like(`${name}%`));
    }

    if (brand) {
      firstMap.set('brand', brand);
      secondMap.set('brand', brand);
      thirdMap.set('brand', brand);
    }

    if (size) {
      firstMap.set('size', size);
      secondMap.set('size', size);
      thirdMap.set('size', size);
    }
    if (color) {
      firstMap.set('color', color);
      secondMap.set('color', color);
      thirdMap.set('color', color);
    }
    const whereFilter = [
      Object.fromEntries(firstMap.entries()),
      Object.fromEntries(secondMap.entries()),
      Object.fromEntries(thirdMap.entries()),
    ];
    return { where: whereFilter };
  }

  async findAll(name?: string, brand?: string, size?: string, color?: string) {
    try {
      return await this.inventoriesLogsRepository.find({
        order: { id: 'DESC' },
        ...((name || brand || size || color) &&
          this.createFindAllWhereFilter(name, brand, size, color)),
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async create(
    inventories: Inventories,
    amount: number,
    action: InventoriesLogsAction,
  ) {
    try {
      const data = {
        inventories_id: inventories.id,
        name: inventories.name,
        size: inventories.size,
        color: inventories.color,
        amount,
        unit: inventories.unit,
        action,
        brand: inventories.brand,
      };

      return await this.inventoriesLogsRepository.save(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
