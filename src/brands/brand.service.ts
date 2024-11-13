import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(brandNm: string) {
    return this.prisma.brand.findUnique({ where: { brandNm } });
  }

  findByFilter(brandNm?: string, category?: string) {
    const buildWhereQuery = () => {
      const where: any = {};
      if (brandNm) where.brandNm = { contains: brandNm };
      if (category) where.indutyMlsfcNm = category;
      return where;
    };
    const where = buildWhereQuery();
    console.log(brandNm, category, where);
    const result = this.prisma.brand.findMany({ where });
    return result;
  }

  findAll() {
    return this.prisma.brand.findMany();
  }
}
