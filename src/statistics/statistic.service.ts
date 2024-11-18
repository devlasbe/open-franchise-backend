import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetStatisticByFilterReq } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(name: string) {
    return this.prisma.statistic.findMany({
      where: { brandNm: { equals: name } },
    });
  }

  findByFilter({
    pageNo,
    pageSize,
    yr,
    category,
    orderCol,
    orderSort,
  }: GetStatisticByFilterReq) {
    const buildOrderQuery = () => {
      if (!orderCol || !orderSort) return;
      if (typeof orderCol) return { [orderCol]: orderSort };
    };
    const orderBy = buildOrderQuery();
    const result = this.prisma.statistic.findMany({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      where: { yr, indutyMlsfcNm: category },
      orderBy,
    });
    return result;
  }
}
