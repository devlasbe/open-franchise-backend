import { HttpException, Injectable } from '@nestjs/common';
import {
  StatisticResponseDto,
  OpenApiRequestDto,
  StartupResponseDto,
  InteriorResponseDto,
  OpenApiResponseDto,
} from './dto/openApi.dto';
import { ConfigService } from '@nestjs/config';
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
  private key = this.configService.get<string>('OPENAPI_KEY');

  async callBrand({ pageNo: beforePageNo, numOfRows, yr }: OpenApiRequestDto) {
    try {
      let pageNo = beforePageNo;
      const endPoint =
        'https://apis.data.go.kr/1130000/FftcBrandRlsInfo2_Service/getBrandinfo';

      while (true) {
        const requestAmount = pageNo * numOfRows;
        const response = await this.httpService.axiosRef.get<
          OpenApiResponseDto<Brand>
        >(endPoint, {
          params: {
            resultType: 'json',
            serviceKey: this.key,
            pageNo,
            numOfRows,
            jngBizCrtraYr: yr,
          },
        });
        const totalCount: number = response?.data.totalCount ?? 0;
        if (!response?.data?.items.length) {
          throw new HttpException('공공데이터가 없습니다.', 404);
        }

        const insertBrandResult = await this.prisma.brand.createMany({
          data: response.data.items,
          skipDuplicates: true,
        });
        console.log(
          `${(pageNo - 1) * numOfRows + 1}~${pageNo * numOfRows} / total: ${totalCount} / saved ${insertBrandResult.count}`,
        );
        pageNo = pageNo + 1;
        if (requestAmount > totalCount) break;
      }
    } catch (error) {
      console.log(error);
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

    while (true) {
      const requestAmount = pageNo * numOfRows;
      const response =
        await this.httpService.axiosRef.get<StatisticResponseDto>(endPoint, {
          params: {
            resultType: 'json',
            serviceKey: this.key,
            pageNo,
            numOfRows,
            yr,
          },
        });

      const totalCount: number = response?.data.totalCount ?? 0;
      if (!response?.data?.items.length)
        throw new HttpException('공공데이터가 없습니다.', 404);

      const insertStatisticResult = await this.prisma.statistic.createMany({
        data: response.data.items,
        skipDuplicates: true,
      });
      console.log(
        `${(pageNo - 1) * numOfRows + 1}~${pageNo * numOfRows} / total: ${totalCount} / saved ${insertStatisticResult.count}`,
      );
      pageNo = pageNo + 1;
      if (requestAmount > totalCount) break;
    }
  }

  async callStartup({
    pageNo: beforePageNo,
    numOfRows,
    yr,
  }: OpenApiRequestDto) {
    let pageNo = beforePageNo;

    const endPoint = this.configService.get<string>('OPENAPI_STARTUP_ENDPOINT');

    while (true) {
      const requestAmount = pageNo * numOfRows;

      const response = await this.httpService.axiosRef.get<StartupResponseDto>(
        endPoint,
        {
          params: {
            resultType: 'json',
            serviceKey: this.key,
            pageNo,
            numOfRows,
            yr,
          },
        },
      );

      const totalCount: number = response?.data.totalCount ?? 0;

      if (!response?.data?.items.length)
        throw new HttpException('공공데이터가 없습니다.', 404);

      const result = await this.prisma.startup.createMany({
        data: response.data.items,
        skipDuplicates: true,
      });
      console.log(
        `${(pageNo - 1) * numOfRows + 1}~${pageNo * numOfRows} / total: ${totalCount} / saved ${result.count}`,
      );
      pageNo = pageNo + 1;
      if (requestAmount > totalCount) break;
    }
  }
}
