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

  createFindAllWhereFilter(name?: string, brand?: string) {
    const whereFilter = [
      {
        ...(name && { name: Like(`%${name}`) }),
        ...(brand && { brand: Like(`%${brand}`) }),
      },
      {
        ...(name && { name: Like(`%${name}%`) }),
        ...(brand && { brand: Like(`%${brand}%`) }),
      },
      {
        ...(name && { name: Like(`${name}%`) }),
        ...(brand && { brand: Like(`${brand}%`) }),
      },
    ];
    return { where: whereFilter };
  }

  async findAll(name?: string, brand?: string) {
    try {
      return await this.inventoriesRepository.find({
        order: { id: 'DESC' },
        ...((name || brand) && this.createFindAllWhereFilter(name, brand)),
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
}
