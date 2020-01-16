import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        console.log(req.url);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'test')
        })
        return next.handle(modifiedRequest);
    }
}