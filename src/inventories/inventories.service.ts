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
    try {
      return await this.inventoriesRepository.save(createInventoriesDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(name?: string) {
    try {
      return await this.inventoriesRepository.find({
        order: { id: 'DESC' },
        ...(name && {
          where: [
            { name: Like(`%${name}`) },
            { name: Like(`${name}%`) },
            { name: Like(`%${name}%`) },
          ],
        }),
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
