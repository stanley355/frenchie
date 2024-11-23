import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { SupertokensService } from './supertokens.service';

@Controller('supertokens')
export class SupertokensController {
  constructor(private supertokensService: SupertokensService) {}
  @Post('/change-password')
  async changePasswordController(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      const b = await this.supertokensService.changePassword(changePasswordDto);
      // console.log(changePasswordRequestBody);
      // console.log(request.headers);
      return b;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
