import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PagenationRequest } from 'src/common/dto/pagenation.dto';

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
