import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Inventories } from './inventories.entity';
import { CreateInventoriesDto } from './dto/createInventoriesDto';
import { UpdateInventoriesDto } from './dto/updateInventoriesDto';
import { distinct } from 'rxjs';

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

  createFindAllWhereFilter(query?: string) {
    const whereFilter = [
      { name: Like(`%${query}`) },
      { brand: Like(`%${query}`) },
      { name: Like(`%${query}%`) },
      { brand: Like(`%${query}%`) },
      { name: Like(`${query}%`) },
      { brand: Like(`${query}%`) },
    ];
    return { where: whereFilter };
  }

  async findAll(query?: string) {
    try {
      return await this.inventoriesRepository.find({
        order: { id: 'DESC' },
        ...(query && this.createFindAllWhereFilter(query)),
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

  async findAllDistinctBrand() {
    try {
      const distinctBrands = await this.inventoriesRepository.query(
        'SELECT DISTINCT brand FROM inventories;',
      );

      return distinctBrands.map((row: { brand: string }) => row.brand);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
