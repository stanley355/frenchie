import { Module } from '@nestjs/common';
import { InventoriesLogsService } from './inventories-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesLogs } from './inventories-logs.entity';
import { InventoriesLogsController } from './inventories-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InventoriesLogs])],
  providers: [InventoriesLogsService],
  controllers: [InventoriesLogsController],
})
export class InventoriesLogsModule {}
