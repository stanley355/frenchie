import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillsItems } from './bills-items.entity';
import { CreateBillsDto } from '../bills/dto/createBillsDto';
import { InventoriesService } from '../inventories/inventories.service';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { InventoriesLogsAction } from '../inventories-logs/inventories-logs.entity';

@Injectable()
export class BillsItemsService {
  constructor(
    @InjectRepository(BillsItems)
    private billsItemsRepository: Repository<BillsItems>,
    private inventoriesService: InventoriesService,
    private inventoriesLogsService: InventoriesLogsService,
  ) {}

  async createOne(bills_id: number, createBillsDto: CreateBillsDto) {
    try {
      if (createBillsDto.inventories_id) {
        const inventory = await this.inventoriesService.subtractAmount(
          createBillsDto.inventories_id,
          createBillsDto.amount,
        );
        const inventoryLog = await this.inventoriesLogsService.create(
          inventory,
          createBillsDto.amount,
          InventoriesLogsAction.Substraction,
        );
        return await this.billsItemsRepository.save({
          bills_id,
          inventories_logs_id: inventoryLog.id,
          ...createBillsDto,
        });
      }
      return await this.billsItemsRepository.save({
        bills_id,
        ...createBillsDto,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createMultiple(bills_id: number, createBillsDto: CreateBillsDto[]) {
    try {
      const billsItemsMap = createBillsDto.map(
        async (billItem) => await this.createOne(bills_id, billItem),
      );

      return Promise.allSettled(billsItemsMap);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteByBillsId(bills_id: number) {
    try {
      return this.billsItemsRepository.delete({ bills_id });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
