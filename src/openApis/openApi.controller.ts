import { Controller, Get, Query } from '@nestjs/common';
import { OpenApiService } from './openApi.service';
import { AxiosError } from 'axios';

@Controller('openApi')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('statistic')
  async statistic(@Query('yr') yr: number) {
    const params = { numOfRows: 1000, pageNo: 1, yr: yr };
    await this.openApiService.callStatistic(params);
    return { message: '성공' };
  }

  @Get('startup')
  async startup(@Query('yr') yr: number) {
    const params = { numOfRows: 1000, pageNo: 1, yr: yr };
    await this.openApiService.callStartup(params);
    return { message: '성공' };
  }
}
