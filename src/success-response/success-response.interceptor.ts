import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor<T>
  implements NestInterceptor<T, { payload: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ payload: T }> {
    const handler = context.getHandler().name;
    return next.handle().pipe(
      map((data) => ({ handler, payload: data })), // 응답 데이터를 payload 형태로 변환
    );
  }
}
