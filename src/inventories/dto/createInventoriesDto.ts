import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsMultipleOfHalf } from './IsMultipleOrHalfDto';

export class CreateInventoriesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @IsMultipleOfHalf()
  amount: number;

  @IsOptional()
  @IsString()
  unit: string;
}
