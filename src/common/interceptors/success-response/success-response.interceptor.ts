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
  implements
    NestInterceptor<T, { request: string; payload: T; count?: number }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ request: string; payload: T; count?: number }> {
    const request = context.switchToHttp().getRequest()?.url;

    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array) {
          return { request, payload: data as T, count: data.length };
        }
        return { request, payload: data };
      }),
    );
  }
}
