import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenApiModule } from './openApi/openApi.module';
import { ConfigModule } from '@nestjs/config';
import { FranchiseModule } from './franchise/franchise.module';
import { StatisticModule } from './statistic/statistic.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    HttpModule.register({ global: true }),
    OpenApiModule,
    FranchiseModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
