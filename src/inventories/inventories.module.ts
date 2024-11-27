import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventories } from './inventories.entity';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inventories])],
  providers: [InventoriesService],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
