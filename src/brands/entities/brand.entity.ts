import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Brand {
  @IsString()
  @ApiProperty({ description: '법인명' })
  corpNm: string;

  @IsString()
  @ApiProperty({ description: '브랜드명' })
  brandNm: string;

  @IsString()
  @ApiProperty({ description: '업종대분류명' })
  indutyLclasNm: string;

  @IsString()
  @ApiProperty({ description: '업종중분류명' })
  indutyMlsfcNm: string;
}
