import { IsString } from 'class-validator';

export class Franchise {
  // 법인명
  @IsString()
  corpNm: string;

  // 브랜드명
  @IsString()
  brandNm: string;

  // 업종대분류명
  @IsString()
  indutyLclasNm: string;

  // 업종중분류명
  @IsString()
  indutyMlsfcNm: string;
}
