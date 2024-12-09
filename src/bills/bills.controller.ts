import {
  Body,
  Controller,
  InternalServerErrorException,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillsDto } from './dto/createBillsDto';
import { BillsItemsService } from '../bills-items/bills-items.service';

@Controller('bills')
export class BillsController {
  constructor(
    private billsService: BillsService,
    private billsItemsService: BillsItemsService,
  ) {}

  @Post('/create')
  async createBillsController(
    @Body(new ParseArrayPipe({ items: CreateBillsDto, whitelist: true }))
    createBillsDto: CreateBillsDto[],
  ) {
    try {
      const itemCount = createBillsDto.length;
      const totalPrice = createBillsDto
        .map((billItem) => billItem.price)
        .reduce((a, b) => a + b, 0);

      const bill = await this.billsService.createDefault(itemCount, totalPrice);
      return this.billsItemsService.createMultiple(bill.id, createBillsDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
