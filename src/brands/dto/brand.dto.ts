import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PagenationRequest } from 'src/common/dto/pagenation.dto';
import { TypeUtil } from 'src/common/utils/type.util';
import { Brand } from '../entities/brand.entity';

export class GetBrandListReq extends PagenationRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '브랜드 명', required: false, example: '놀부' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '카테고리', required: false })
  category?: string;
}

export class GetBrandRes extends TypeUtil.getSuccessResponse(Brand) {}
export class GetBrandListRes extends TypeUtil.getSuccessResponseList(Brand) {}
