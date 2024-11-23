import { Controller, Post, Req } from '@nestjs/common';

@Controller('supertokens')
export class SupertokensController {
  @Post('/change-password')
  findAll(@Req() request: Request): string {
    console.log(request.headers);
    return 'This action returns all cats';
  }
}
