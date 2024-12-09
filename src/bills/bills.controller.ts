import {
  Body,
  Controller,
  InternalServerErrorException,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillsDto } from './dto/createBillsDto';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Post('/create')
  async createBillsController(
    @Body(new ParseArrayPipe({ items: CreateBillsDto, whitelist: true }))
    createBillsDto: CreateBillsDto[],
  ) {
    try {
      const itemCount = createBillsDto.length;
      const totalPrice = createBillsDto.map((billItem)=> billItem.price).reduce((a, b) => a+ b, 0);

      return await this.billsService.createDefault(itemCount, totalPrice);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
