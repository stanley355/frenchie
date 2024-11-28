import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventories } from './inventories.entity';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { InventoriesLogsService } from '../inventories-logs/inventories-logs.service';
import { InventoriesLogs } from '../inventories-logs/inventories-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventories, InventoriesLogs])],
  providers: [InventoriesService, InventoriesLogsService],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
