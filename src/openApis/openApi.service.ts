import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  StatisticResponseDto,
  OpenApiRequestDto,
  StartupResponseDto,
} from './dto/openApi.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Brand } from 'src/brands/entities/brand.entity';
import { Statistic, Startup } from '@prisma/client';

interface ApiCallConfig<T, R> {
  endpoint: string;
  params: Record<string, any>;
  transformResponse?: (data: T[]) => R[];
}

@Injectable()
export class OpenApiService {
  private readonly logger = new Logger(OpenApiService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}
  private key = this.configService.get<string>('OPENAPI_KEY');

  private async fetchAndSaveData<T, R>(
    config: ApiCallConfig<T, R>,
    saveFunction: (data: R[]) => Promise<{ count: number }>,
  ) {
    const { endpoint, params, transformResponse } = config;
    let pageNo = params.pageNo;
    const numOfRows = params.numOfRows;

    while (true) {
      const requestAmount = pageNo * numOfRows;

      try {
        const response = await this.httpService.axiosRef.get<{
          totalCount: number;
          items: T[];
        }>(endpoint, {
          params: {
            ...params,
            pageNo,
            serviceKey: this.key,
            resultType: 'json',
          },
        });

        const totalCount: number = response?.data.totalCount ?? 0;
        if (!response?.data?.items?.length) {
          throw new HttpException('공공데이터가 없습니다.', 404);
        }

        const items = transformResponse
          ? transformResponse(response.data.items)
          : (response.data.items as unknown as R[]);

        const result = await saveFunction(items);

        this.logger.log(
          `${(pageNo - 1) * numOfRows + 1}~${pageNo * numOfRows} / total: ${totalCount} / saved ${result.count}`,
        );

        pageNo = pageNo + 1;
        if (requestAmount >= totalCount) break;
      } catch (error) {
        this.logger.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
      }
    }
  }

  async callBrand({ pageNo, numOfRows, yr }: OpenApiRequestDto) {
    const endpoint =
      'https://apis.data.go.kr/1130000/FftcBrandRlsInfo2_Service/getBrandinfo';

    await this.fetchAndSaveData<Brand & { corpNm: string }, Brand>(
      {
        endpoint,
        params: { pageNo, numOfRows, jngBizCrtraYr: yr },
        transformResponse: (items) => items.map(({ corpNm, ...rest }) => rest),
      },
      (data) => this.prisma.brand.createMany({ data, skipDuplicates: true }),
    );
  }

  async callStatistic({ pageNo, numOfRows, yr }: OpenApiRequestDto) {
    const endpoint = this.configService.get<string>(
      'OPENAPI_STATISTIC_ENDPOINT',
    );

    await this.fetchAndSaveData<StatisticResponseDto['items'][0], Statistic>(
      {
        endpoint,
        params: { pageNo, numOfRows, yr },
      },
      (data) =>
        this.prisma.statistic.createMany({ data, skipDuplicates: true }),
    );
  }

  async callStartup({ pageNo, numOfRows, yr }: OpenApiRequestDto) {
    const endpoint = this.configService.get<string>('OPENAPI_STARTUP_ENDPOINT');

    await this.fetchAndSaveData<StartupResponseDto['items'][0], Startup>(
      {
        endpoint,
        params: { pageNo, numOfRows, yr },
      },
      (data) => this.prisma.startup.createMany({ data, skipDuplicates: true }),
    );
  }
}
