import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';
import { TypeUtil } from 'src/common/utils/type.util';
import { GetBrandListReq } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOkResponse({
    description: '브랜드 리스트',
    type: () => TypeUtil.getSuccessResponseList(Brand),
  })
  findAll(@Query() query: GetBrandListReq) {
    return this.brandService.findByFilter(query);
  }

  @Get('/:name')
  @ApiOkResponse({
    description: '브랜드 검색',
    type: () => TypeUtil.getSuccessResponse(Brand),
  })
  findByName(@Param('name') name: string) {
    return this.brandService.findOne(name);
  }
}
