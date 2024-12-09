import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bills } from "./bills.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bills])],
  providers: [BillsService],
  controllers: [BillsController],
})
export class BillsModule {}
