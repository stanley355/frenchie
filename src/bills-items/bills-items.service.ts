import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillsItems } from './bills-items.entity';
import { CreateBillsDto } from '../bills/dto/createBillsDto';

@Injectable()
export class BillsItemsService {
  constructor(
    @InjectRepository(BillsItems)
    private billsItemsRepository: Repository<BillsItems>,
  ) {}

  async createMultiple(bills_id: number, createBillsDto: CreateBillsDto[]) {
    try {
      const billsItemsMap = createBillsDto.map(
        async (billItem) =>
          await this.billsItemsRepository.save({ bills_id, ...billItem }),
      );

      return Promise.allSettled(billsItemsMap);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
