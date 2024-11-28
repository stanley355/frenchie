import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupertokensService } from './supertokens/supertokens.service';
import { SupertokensController } from './supertokens/supertokens.controller';
import { ConfigModule } from '@nestjs/config';
import { SupertokensMiddleware } from './supertokens/supertokens.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesModule } from './inventories/inventories.module';
import * as process from 'node:process';
import { Inventories } from './inventories/inventories.entity';
import { InventoriesLogsModule } from './inventories-logs/inventories-logs.module';
import { InventoriesLogs } from './inventories-logs/inventories-logs.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [Inventories, InventoriesLogs],
      synchronize: true,
    }),
    InventoriesModule,
    InventoriesLogsModule,
  ],
  controllers: [AppController, SupertokensController],
  providers: [AppService, SupertokensService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SupertokensMiddleware).forRoutes('*');
  }
}
