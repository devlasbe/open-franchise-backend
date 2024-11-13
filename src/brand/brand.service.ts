import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  findByName(brandNm: string) {
    const result = this.prisma.brand.findMany({
      where: {
        brandNm: {
          contains: brandNm,
        },
      },
    });
    return result;
  }

  findAll() {
    return this.prisma.brand.findMany();
  }
}
