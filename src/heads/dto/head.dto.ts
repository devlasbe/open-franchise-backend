import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TypeUtil } from 'src/common/utils/type.util';
import { Head } from '../entities/head.entity';

export class GetHeadReq {
  @ApiProperty({ description: '가맹사업기준년도' })
  @IsString()
  jngBizCrtraYr: string;

  @ApiProperty({ description: '가맹본부관리번호' })
  @IsString()
  jnghdqrtrsMnno: string;
}

export class GetHeadRes extends TypeUtil.getSuccessResponse(Head) {}
