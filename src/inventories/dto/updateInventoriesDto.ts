import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsMultipleOfHalf } from './IsMultipleOrHalfDto';

export class UpdateInventoriesDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsNumber()
  @IsMultipleOfHalf()
  amount: number;

  @IsOptional()
  @IsString()
  unit: string;
}
