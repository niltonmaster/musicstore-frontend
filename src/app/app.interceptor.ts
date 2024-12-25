import { HttpInterceptorFn } from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};


//interceptor para jwt
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;

  const token = localStorage.getItem('token');
  if (token) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(clonedRequest);
};