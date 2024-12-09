import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bills } from './bills.entity';
import { UpdateBillsDto } from './dto/updateBillsDto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bills)
    private billsRepository: Repository<Bills>,
  ) {}

  async createDefault(item_count: number, total_price: number) {
    try {
      const defaultData = { item_count, total_price, final_price: total_price };
      return await this.billsRepository.save(defaultData);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(id?: number) {
    try {
      return await this.billsRepository.find({
        order: { id: 'DESC' },
        take: 100,
        ...(id && { where: { id } }),
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updateOne(id: number, updateData: UpdateBillsDto) {
    try {
      return await this.billsRepository.update(id, updateData);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteOne(id: number) {
    try {
      return await this.billsRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
