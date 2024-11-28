import { Module } from '@nestjs/common';
import { InventoriesLogsService } from './inventories-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesLogs } from './inventories-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoriesLogs])],
  providers: [InventoriesLogsService],
})
export class InventoriesLogsModule {}
