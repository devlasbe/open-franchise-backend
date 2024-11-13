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
    console.log(context.getArgs());
    const request = context.switchToHttp().getRequest()?.url;

    return next.handle().pipe(
      map((data) => ({ request, payload: data })), // 응답 데이터를 payload 형태로 변환
    );
  }
}
