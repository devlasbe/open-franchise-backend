import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PagenationRequest {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: '페이지 번호', example: 1 })
  pageNo: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: '가져올 데이터 수', example: 10 })
  pageSize: number;
}
