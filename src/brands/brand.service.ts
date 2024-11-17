import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBrandListReq } from './dto/brand.dto';
import { Brand } from './entities/brand.entity';

const escapeRegex = (str: string) => str.replace(/\//g, '\\/');

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(brandNm: string) {
    return this.prisma.brand.findUnique({ where: { brandNm } });
  }

  findByFilter({
    pageNo,
    pageSize,
    category,
    name,
    orderCol,
    orderSort,
  }: GetBrandListReq) {
    const buildWhereQuery = () => {
      const where: any = {};
      if (name) where.brandNm = { contains: name, mode: 'insensitive' };
      if (category) where.indutyMlsfcNm = { contains: escapeRegex(category) };
      return where;
    };
    const buildOrderQuery = () => {
      if (!orderCol || !orderSort) return;
      if (!(orderCol in ({} as Brand))) return;
      return { [orderCol]: orderSort };
    };
    const where = buildWhereQuery();
    const orderBy = buildOrderQuery();
    const result = this.prisma.brand.findMany({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      where,
      orderBy,
    });
    return result;
  }

  findAll() {
    return this.prisma.brand.findMany();
  }
}
