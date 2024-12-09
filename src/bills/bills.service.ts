import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bills } from './bills.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bills)
    private billsRepository: Repository<Bills>,
  ) {}

  async createDefault(
    item_count: number,
    total_price: number,
  ) {
    try {
      const defaultData = { item_count, total_price, final_price: total_price};
      return await this.billsRepository.save(defaultData);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
