import { Controller, Get } from '@nestjs/common';
import { OpenApiService } from './openApi.service';
import { AxiosError } from 'axios';

@Controller('openApi')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('statistic')
  async statistic() {
    const params = { numOfRows: 1000, pageNo: 1, yr: 2021 };
    await this.openApiService.insertAllData(params, () =>
      this.openApiService.callStatistic(params),
    );
    return { message: '성공' };
  }

  @Get('startup')
  async startup() {
    const numOfRows = 1000;
    let pageNo = 1;
    const yr = 2023;
    try {
      while (true) {
        console.log((pageNo - 1) * numOfRows + 1 + ' ~ ' + pageNo * numOfRows);
        const response = await this.openApiService.callStartup({
          numOfRows,
          pageNo,
          yr,
        });
        pageNo = pageNo + 1;
        const requestAmount = pageNo * numOfRows;
        const totalCount: number = response?.totalCount ?? 0;
        if (requestAmount > totalCount) break;
      }
      return { message: '성공' };
    } catch (beforeError) {
      const error = beforeError as AxiosError;
      return { message: error.message };
    }
  }
}
