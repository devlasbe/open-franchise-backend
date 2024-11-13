import { Controller, Get, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { getSuccessResponseType } from 'src/success-response/success-response.dto';
import { Brand } from './entities/brand.entity';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Get('search')
  @ApiOkResponse({
    description: '브랜드 검색',
    type: () => getSuccessResponseType(Brand, true),
  })
  findByName(@Query('brandNm') brandNm: string) {
    return this.brandService.findByName(brandNm);
  }
}
