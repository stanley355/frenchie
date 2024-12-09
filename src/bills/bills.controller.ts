import {
  Body,
  Controller, Get,
  InternalServerErrorException,
  ParseArrayPipe,
  Post, Query
} from "@nestjs/common";
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
      const billItems = await this.billsItemsService.createMultiple(
        bill.id,
        createBillsDto,
      );
      const isSuccess = billItems.every(
        (billItems) => billItems.status === 'fulfilled',
      );
      return {
        status: isSuccess ? 201 : 500,
        data: isSuccess? bill : null,
        message: isSuccess ? 'success' : 'internal server error',
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/findAll')
  async findAllBills(@Query('id') id: number) {
    try {
     return await this.billsService.findAll(id);
    } catch (e) {
     throw new InternalServerErrorException(e);
    }
  }
}
