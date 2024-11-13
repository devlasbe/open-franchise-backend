import { mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T> {
  @ApiProperty({ description: '응답 데이터' })
  payload: T;
  @ApiProperty({ description: '호출된 URI' })
  request: string;
}

type Constructor<T = object> = new (...args: any[]) => T;

export function getSuccessResponseType<T extends Constructor>(
  Base: T,
  isArray?: boolean,
) {
  class Success {
    @ApiProperty({ type: isArray ? [Base] : Base, description: '응답 데이터' })
    payload: T;
    @ApiProperty({ description: '호출된 URI' })
    request: string;
  }
  return class SuccessResponse extends mixin(Success) {};
}
