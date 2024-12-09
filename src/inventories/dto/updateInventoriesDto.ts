import { IsNumber, IsOptional } from 'class-validator';
import { IsMultipleOfHalf } from './IsMultipleOrHalfDto';

export class UpdateInventoriesDto {
  @IsOptional()
  @IsNumber()
  @IsMultipleOfHalf()
  amount: number;
}
