import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';
import { TypeUtil } from 'src/common/utils/type.util';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiOkResponse({
    description: '브랜드 리스트',
    type: () => TypeUtil.getSuccessResponseList(Brand),
  })
  findAll(@Query('name') name?: string, @Query('category') category?: string) {
    return this.brandService.findByFilter(name, category);
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
