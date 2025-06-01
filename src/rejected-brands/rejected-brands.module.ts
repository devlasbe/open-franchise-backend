import { Module } from '@nestjs/common';
import { RejectedBrandsService } from './rejected-brands.service';
import { RejectedBrandsController } from './rejected-brands.controller';

@Module({
  controllers: [RejectedBrandsController],
  providers: [RejectedBrandsService],
})
export class RejectedBrandsModule {}
