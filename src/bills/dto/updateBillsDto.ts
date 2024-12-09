import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBillsDto {
  @IsOptional()
  @IsNumber()
  final_price: number;
}
