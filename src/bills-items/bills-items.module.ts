import { Module } from '@nestjs/common';
import { BillsItemsService } from './bills-items.service';
import { BillsItemsController } from './bills-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsItems } from './bills-items.entity';
import { Inventories } from '../inventories/inventories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillsItems, Inventories])],
  providers: [BillsItemsService],
  controllers: [BillsItemsController],
})
export class BillsItemsModule {}
