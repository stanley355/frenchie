import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './bills.entity';
import { BillsItemsService } from '../bills-items/bills-items.service';
import { BillsItems } from '../bills-items/bills-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bills, BillsItems])],
  providers: [BillsService, BillsItemsService],
  controllers: [BillsController],
})
export class BillsModule {}
