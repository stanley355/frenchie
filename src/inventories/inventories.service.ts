import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Inventories } from './inventories.entity';
import { CreateInventoriesDto } from './dto/createInventoriesDto';
import { UpdateInventoriesDto } from './dto/updateInventoriesDto';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventories)
    private inventoriesRepository: Repository<Inventories>,
  ) {}

  async createOne(createInventoriesDto: CreateInventoriesDto) {
    const newInventoriesDto: CreateInventoriesDto = {
      name: createInventoriesDto.name.toLowerCase(),
      brand: createInventoriesDto.brand.toLowerCase(),
      amount: createInventoriesDto.amount,
      unit: createInventoriesDto.unit
        ? createInventoriesDto.unit.toLowerCase()
        : '',
      size: createInventoriesDto.size
        ? createInventoriesDto.size.toLowerCase()
        : '',
      color: createInventoriesDto.color
        ? createInventoriesDto.color.toLowerCase()
        : '',
    };
    try {
      return await this.inventoriesRepository.save(newInventoriesDto);
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
      return await this.inventoriesRepository.find({
        order: { id: 'DESC' },
        ...((name || brand || size || color) &&
          this.createFindAllWhereFilter(name, brand, size, color)),
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteOne(id: number) {
    try {
      return await this.inventoriesRepository.delete({ id });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updateOne(id: number, updateData: UpdateInventoriesDto) {
    try {
      return await this.inventoriesRepository.update(id, updateData);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: number) {
    try {
      return await this.inventoriesRepository.findOne({ where: { id } });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  populateOptionsArray(optionsArray: { label: string; value: string }[]) {
    const baseOption = [{ label: 'Semua', value: '' }];
    const newOptionsArray = baseOption.concat(optionsArray);
    return newOptionsArray;
  }

  async findAllDistinctBrand() {
    try {
      const distinctBrands = await this.inventoriesRepository.query(
        'SELECT DISTINCT brand FROM inventories;',
      );

      const optionsArray = distinctBrands.map((row: { brand: string }) => {
        return {
          label: row.brand,
          value: row.brand,
        };
      });
      return this.populateOptionsArray(optionsArray);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAllDistinctSize() {
    try {
      const distinctSize = await this.inventoriesRepository.query(
        'SELECT DISTINCT size FROM inventories',
      );

      const optionsArray = distinctSize
        .filter((row: { size: string }) => row.size)
        .map((row: { size: string }) => {
          return {
            label: row.size,
            value: row.size,
          };
        });
      return this.populateOptionsArray(optionsArray);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAllDistinctColor() {
    try {
      const distinctColors = await this.inventoriesRepository.query(
        'SELECT DISTINCT color FROM inventories;',
      );

      const optionsArray = distinctColors
        .filter((row: { color: string }) => row.color)
        .map((row: { color: string }) => {
          return {
            label: row.color,
            value: row.color,
          };
        });

      return this.populateOptionsArray(optionsArray);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
