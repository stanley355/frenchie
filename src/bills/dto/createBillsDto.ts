import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsMultipleOfHalf } from '../../inventories/dto/IsMultipleOrHalfDto';

export class CreateBillsDto {
  @IsOptional()
  @IsNumber()
  inventories_id: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsMultipleOfHalf()
  amount: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
