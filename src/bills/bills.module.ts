import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './bills.entity';
import { BillsItemsService } from '../bills-items/bills-items.service';
import { BillsItems } from '../bills-items/bills-items.entity';
import { InventoriesService } from '../inventories/inventories.service';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { Inventories } from '../inventories/inventories.entity';
import { InventoriesLogs } from '../inventories-logs/inventories-logs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bills, BillsItems, Inventories, InventoriesLogs]),
  ],
  providers: [
    BillsService,
    BillsItemsService,
    InventoriesService,
    InventoriesLogsService,
  ],
  controllers: [BillsController],
})
export class BillsModule {}
