import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log('interceptor', error);
        // 예외가 HttpException인 경우
        if (error.response) {
          console.log(error.response);
          const statusCode = error.getStatus();
          const message = error.message;
          const handler = context.getHandler().name;
          const response = error.response;
          return throwError(
            () =>
              new HttpException(
                {
                  handler,
                  statusCode,
                  message: message,
                  response,
                },
                statusCode,
              ),
          );
        }
        console.log('exception');
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: 500,
                message: '내부 서버 오류가 발생했습니다',
                error: error.message,
              },
              500,
            ),
        );
      }),
    );
  }
}
