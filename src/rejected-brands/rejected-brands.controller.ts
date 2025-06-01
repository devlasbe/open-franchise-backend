import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RejectedBrandsService } from './rejected-brands.service';
import { CreateRejectedBrandDto } from './dto/create-rejected-brand.dto';
import { UpdateRejectedBrandDto } from './dto/update-rejected-brand.dto';

@Controller('rejected-brands')
export class RejectedBrandsController {
  constructor(private readonly rejectedBrandsService: RejectedBrandsService) {}

  @Post()
  create(@Body() createRejectedBrandDto: CreateRejectedBrandDto) {
    return this.rejectedBrandsService.create(createRejectedBrandDto);
  }

  @Get()
  findAll() {
    return this.rejectedBrandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rejectedBrandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRejectedBrandDto: UpdateRejectedBrandDto) {
    return this.rejectedBrandsService.update(+id, updateRejectedBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rejectedBrandsService.remove(+id);
  }
}
