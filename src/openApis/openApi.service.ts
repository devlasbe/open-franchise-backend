import { HttpException, Injectable } from '@nestjs/common';
import {
  StatisticResponseDto,
  OpenApiRequestDto,
  StartupResponseDto,
  OpenApiResponseDto,
} from './dto/openApi.dto';
import { ConfigService } from '@nestjs/config';
import { Statistic } from 'src/statistics/entities/statistic.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Brand } from 'src/brands/entities/brand.entity';

@Injectable()
export class OpenApiService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async insertAllData(
    { numOfRows, pageNo: beforePageNo, yr }: OpenApiRequestDto,
    api: (params: OpenApiRequestDto) => Promise<OpenApiResponseDto<any>>,
  ) {
    let pageNo = beforePageNo;
    while (true) {
      const response = await api({
        numOfRows,
        pageNo,
        yr,
      });
      const requestAmount = pageNo * numOfRows;
      const totalCount: number = response?.totalCount ?? 0;
      console.log(
        (pageNo - 1) * numOfRows +
          1 +
          ' ~ ' +
          pageNo * numOfRows +
          'Total Count: ' +
          totalCount,
      );
      pageNo = pageNo + 1;
      if (requestAmount > totalCount) break;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  async callBrand({ pageNo: beforePageNo, numOfRows, yr }: OpenApiRequestDto) {
    let pageNo = beforePageNo;

    const endPoint = this.configService.get<string>(
      'OPENAPI_STATISTIC_ENDPOINT',
    );
    const key = this.configService.get<string>('OPENAPI_KEY');

    while (true) {
      const requestAmount = pageNo * numOfRows;

      const response =
        await this.httpService.axiosRef.get<StatisticResponseDto>(endPoint, {
          params: {
            resultType: 'json',
            serviceKey: key,
            pageNo,
            numOfRows,
            yr,
          },
        });

      const totalCount: number = response?.data.totalCount ?? 0;

      const brandList = new Array<Brand>();
      const statisticsList = new Array<Statistic>();

      response.data.items.forEach((item) => {
        const { brandNm, corpNm, indutyLclasNm, indutyMlsfcNm, ...rest } = item;
        brandList.push({ brandNm, corpNm, indutyLclasNm, indutyMlsfcNm });
        statisticsList.push(item);
      });
      if (!response?.data?.items.length)
        throw new HttpException('공공데이터가 없습니다.', 404);

      const insertBrandResult = await this.prisma.brand.createMany({
        data: brandList,
        skipDuplicates: true,
      });
      const insertStatisticResult = await this.prisma.statistic.createMany({
        data: statisticsList,
        skipDuplicates: true,
      });
      console.log(
        `${(pageNo - 1) * numOfRows + 1}~${pageNo * numOfRows} / total: ${totalCount} / saved brand, statistic: ${insertBrandResult.count} ${insertStatisticResult.count}`,
      );
      pageNo = pageNo + 1;
      if (requestAmount > totalCount) break;
    }
  }

  async callStatistic({
    pageNo: beforePageNo,
    numOfRows,
    yr,
  }: OpenApiRequestDto) {
    let pageNo = beforePageNo;

    const endPoint = this.configService.get<string>(
      'OPENAPI_STATISTIC_ENDPOINT',
    );
    const key = this.configService.get<string>('OPENAPI_KEY');

    while (true) {
      const requestAmount = pageNo * numOfRows;

      const response =
        await this.httpService.axiosRef.get<StatisticResponseDto>(endPoint, {
          params: {
            resultType: 'json',
            serviceKey: key,
            pageNo,
            numOfRows,
            yr,
          },
        });

      const totalCount: number = response?.data.totalCount ?? 0;

      const brandList = new Array<Brand>();
      const statisticsList = new Array<Statistic>();

      response.data.items.forEach((item) => {
        const { brandNm, corpNm, indutyLclasNm, indutyMlsfcNm, ...rest } = item;
        brandList.push({ brandNm, corpNm, indutyLclasNm, indutyMlsfcNm });
        statisticsList.push(item);
      });
      if (!response?.data?.items.length)
        throw new HttpException('공공데이터가 없습니다.', 404);

      const insertBrandResult = await this.prisma.brand.createMany({
        data: brandList,
        skipDuplicates: true,
      });
      const insertStatisticResult = await this.prisma.statistic.createMany({
        data: statisticsList,
        skipDuplicates: true,
      });
      console.log(
        `${(pageNo - 1) * numOfRows + 1}~${pageNo * numOfRows} / total: ${totalCount} / saved brand, statistic: ${insertBrandResult.count} ${insertStatisticResult.count}`,
      );
      pageNo = pageNo + 1;
      if (requestAmount > totalCount) break;
    }
  }

  async callStartup({ pageNo, numOfRows, yr }: OpenApiRequestDto) {
    const endPoint = this.configService.get<string>('OPENAPI_STARTUP_ENDPOINT');
    const key = this.configService.get<string>('OPENAPI_KEY');
    const response = await this.httpService.axiosRef.get<StartupResponseDto>(
      endPoint,
      {
        params: {
          resultType: 'json',
          serviceKey: key,
          pageNo,
          numOfRows,
          yr,
        },
      },
    );
    if (!response?.data?.items.length)
      throw new HttpException('공공데이터가 없습니다.', 404);

    await this.prisma.startup.createMany({
      data: response.data.items,
      skipDuplicates: true,
    });

    return response.data;
  }
}

/**

{
    "resultCode": "00",
    "resultMsg": "NORMAL SERVICE",
    "numOfRows": "1",
    "pageNo": "1",
    "totalCount": 10185,
    "items": [
        {
            "yr": "2022",
            "indutyLclasNm": "외식",
            "indutyMlsfcNm": "한식",
            "corpNm": "(주)장충동왕족발",
            "brandNm": "논보달",
            "frcsCnt": 0,
            "newFrcsRgsCnt": 0,
            "ctrtEndCnt": 0,
            "ctrtCncltnCnt": 0,
            "nmChgCnt": 0,
            "avrgSlsAmt": 0,
            "arUnitAvrgSlsAmt": 0
        }
    ]
}

 */
