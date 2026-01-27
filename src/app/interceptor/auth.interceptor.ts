import { HttpInterceptorFn } from '@angular/common/http';
import {Router} from '@angular/router';
import {inject} from '@angular/core';
import UserInfo from '../models/UserInfo';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user: UserInfo = JSON.parse(localStorage.getItem('user') || '{}');
  if (Object.hasOwn(user, 'email')) {
    if (Date.now() >= user.expirationTime) {
      const router = inject(Router);
      router.navigate(["/"]);
    } else {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      return next(newReq);
    }
  }
  return next(req);
};
