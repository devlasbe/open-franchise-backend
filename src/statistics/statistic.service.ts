import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(name: string) {
    return this.prisma.statistic.findMany({
      where: { brandNm: { equals: name } },
    });
  }
}
