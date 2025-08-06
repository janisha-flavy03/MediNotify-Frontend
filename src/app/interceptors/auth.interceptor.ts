import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    console.log('✅ AuthInterceptor running');
    console.log('🔐 Token:', token);
    console.log('📨 Request URL:', req.url);

    // ❌ Only skip token for login
    if (req.url.includes('/api/Auth/login')) {
      console.log('🔓 Login request – skipping token');
      return next.handle(req);
    }

    // ✅ Add token for everything else (including /register)
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('✅ Token attached to request:', cloned);
      return next.handle(cloned);
    }

    console.warn('⚠️ No token found — request sent without Authorization');
    return next.handle(req);
  }
}
