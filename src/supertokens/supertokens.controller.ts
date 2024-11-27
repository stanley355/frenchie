import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { SupertokensService } from './supertokens.service';

@Controller('supertokens')
export class SupertokensController {
  constructor(private supertokensService: SupertokensService) {}
  @Post('/change-password')
  async changePasswordController(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      return await this.supertokensService.changePassword(changePasswordDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
