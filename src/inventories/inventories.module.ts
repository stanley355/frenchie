import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventories } from './inventories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventories])],
})
export class InventoriesModule {}
