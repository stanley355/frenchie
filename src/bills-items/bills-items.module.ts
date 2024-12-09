import { Module } from '@nestjs/common';
import { BillsItemsService } from './bills-items.service';
import { BillsItemsController } from './bills-items.controller';

@Module({
  providers: [BillsItemsService],
  controllers: [BillsItemsController],
})
export class BillsItemsModule {}
