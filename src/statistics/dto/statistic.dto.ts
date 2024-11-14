import { TypeUtil } from 'src/common/utils/type.util';
import { Statistic } from '../entities/statistic.entity';

export class GetStatisticListRes extends TypeUtil.getSuccessResponseList(
  Statistic,
) {}
