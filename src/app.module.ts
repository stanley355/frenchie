import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupertokensService } from './supertokens/supertokens.service';
import { SupertokensController } from './supertokens/supertokens.controller';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env"})],
  controllers: [AppController, SupertokensController],
  providers: [AppService, SupertokensService],
})
export class AppModule {}
