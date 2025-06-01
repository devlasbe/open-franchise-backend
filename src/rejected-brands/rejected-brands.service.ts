import { Injectable } from '@nestjs/common';
import { CreateRejectedBrandDto } from './dto/create-rejected-brand.dto';
import { UpdateRejectedBrandDto } from './dto/update-rejected-brand.dto';

@Injectable()
export class RejectedBrandsService {
  create(createRejectedBrandDto: CreateRejectedBrandDto) {
    return 'This action adds a new rejectedBrand';
  }

  findAll() {
    return `This action returns all rejectedBrands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rejectedBrand`;
  }

  update(id: number, updateRejectedBrandDto: UpdateRejectedBrandDto) {
    return `This action updates a #${id} rejectedBrand`;
  }

  remove(id: number) {
    return `This action removes a #${id} rejectedBrand`;
  }
}
