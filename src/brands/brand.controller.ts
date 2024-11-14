import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetBrandListReq, GetBrandListRes, GetBrandRes } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOkResponse({
    description: '브랜드 리스트',
    type: GetBrandListRes,
  })
  findAll(@Query() query: GetBrandListReq) {
    return this.brandService.findByFilter(query);
  }

  @Get('/:name')
  @ApiOkResponse({
    description: '브랜드 검색',
    type: GetBrandRes,
  })
  findByName(@Param('name') name: string) {
    return this.brandService.findOne(name);
  }
}
