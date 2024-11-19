import { Module } from '@nestjs/common';
import { HeadsService } from './heads.service';
import { HeadsController } from './heads.controller';

@Module({
  controllers: [HeadsController],
  providers: [HeadsService],
})
export class HeadsModule {}
