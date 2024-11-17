import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Statistic {
  @IsString()
  @ApiProperty({ description: '브랜드명' })
  brandNm: string;

  @IsString()
  @ApiProperty({ description: '법인명' })
  corpNm: string;

  @IsString()
  @ApiProperty({ description: '기준년도' })
  yr: string;

  @IsString()
  @ApiProperty({ description: '업종대분류명' })
  indutyLclasNm: string;

  @IsString()
  @ApiProperty({ description: '업종중분류명' })
  indutyMlsfcNm: string;

  @IsNumber()
  @ApiProperty({ description: '가맹점수' })
  frcsCnt: number;

  @IsNumber()
  @ApiProperty({ description: '신규가맹점등록수' })
  newFrcsRgsCnt: number;

  @IsNumber()
  @ApiProperty({ description: '계약종료수' })
  ctrtEndCnt: number;

  // 계약해지수
  @IsNumber()
  @ApiProperty({ description: '계약해지수' })
  ctrtCncltnCnt: number;

  @IsNumber()
  @ApiProperty({ description: '명의변경수' })
  nmChgCnt: number;

  @IsNumber()
  @ApiProperty({ description: '평균매출금액' })
  avrgSlsAmt: number;

  @IsNumber()
  @ApiProperty({ description: '면적단위평균매출금액' })
  arUnitAvrgSlsAmt: number;
}
