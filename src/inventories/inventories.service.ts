import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Inventories } from './inventories.entity';
import { CreateInventoriesDto } from './dto/createInventoriesDto';

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
        order: { updated_at: 'DESC' },
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
}
