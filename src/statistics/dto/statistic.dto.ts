import { TypeUtil } from 'src/common/utils/type.util';
import { Statistic } from '../entities/statistic.entity';
import { PagenationRequest } from 'src/common/dto/pagenation.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetStatisticListRes extends TypeUtil.getSuccessResponseList(
  Statistic,
) {}

export class GetStatisticByFilterReq extends PagenationRequest {
  @IsString()
  @ApiProperty({ description: '연도', example: '2023' })
  yr: string;

  @IsString()
  @ApiProperty({ description: '카테고리', example: '치킨' })
  category: string;
}
