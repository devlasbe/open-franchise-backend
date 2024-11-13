import { IsNumber, IsString } from 'class-validator';

export class Statistic {
  // 브랜드명
  @IsString()
  brandNm: string;

  // 법인명
  @IsString()
  corpNm: string;

  //기준년도
  @IsString()
  yr: string;

  // 가맹점수
  @IsNumber()
  frcsCnt: number;

  // 신규가맹점등록수
  @IsNumber()
  newFrcsRgsCnt: number;

  //계약종료수
  @IsNumber()
  ctrtEndCnt: number;

  // 계약해지수
  @IsNumber()
  ctrtCncltnCnt: number;

  // 명의변경수
  @IsNumber()
  nmChgCnt: number;

  // 평균매출금액
  @IsNumber()
  avrgSlsAmt: number;

  // 면적단위평균매출금액
  @IsNumber()
  arUnitAvrgSlsAmt: number;
}
