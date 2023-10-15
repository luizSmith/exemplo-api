import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class CustomErrorInterceptor implements NestInterceptor {

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<unknown> {
        return next.handle().pipe(
            catchError((err) => {
                return throwError(() => err);
            })
        );
    }
}