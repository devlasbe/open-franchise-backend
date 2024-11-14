import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { GetStatisticListRes } from './dto/statistic.dto';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get(':name')
  @ApiParam({ name: 'name', type: String, description: '브랜드 명' })
  @ApiOkResponse({
    description: '브랜드 이름에 해당하는 모든 연도의 매출 정보 리스트',
    type: GetStatisticListRes,
  })
  findAll(@Param('name') name: string) {
    return this.statisticService.findAll(name);
  }
}
