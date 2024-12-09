import { Module } from '@nestjs/common';
import { BillsItemsService } from './bills-items.service';
import { BillsItemsController } from './bills-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsItems } from './bills-items.entity';
import { Inventories } from '../inventories/inventories.entity';
import { InventoriesService } from '../inventories/inventories.service';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { InventoriesLogs } from '../inventories-logs/inventories-logs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillsItems, Inventories, InventoriesLogs]),
  ],
  providers: [BillsItemsService, InventoriesService, InventoriesLogsService],
  controllers: [BillsItemsController],
})
export class BillsItemsModule {}
