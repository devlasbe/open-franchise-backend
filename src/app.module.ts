import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenApiModule } from './openApis/openApi.module';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from './statistics/statistic.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { CategoryModule } from './categories/category.module';
import { BrandModule } from './brands/brand.module';
import { StartupsModule } from './startups/startups.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    HttpModule.register({ global: true }),
    OpenApiModule,
    StatisticModule,
    CategoryModule,
    BrandModule,
    StartupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
