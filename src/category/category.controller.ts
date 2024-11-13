import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { getSuccessResponseType } from 'src/success-response/success-response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({
    description: '카테고리 전체 리스트',
    type: () => getSuccessResponseType(Category, true),
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('save')
  save() {
    return this.categoryService.save();
  }
}
