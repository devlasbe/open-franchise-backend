import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenApiModule } from './openApi/openApi.module';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from './statistic/statistic.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    HttpModule.register({ global: true }),
    OpenApiModule,
    StatisticModule,
    CategoryModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
