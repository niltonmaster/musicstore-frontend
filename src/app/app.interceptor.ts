import { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs';

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


//IMPORTANTE interceptor para ngxspiner

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  return next(req).pipe(

    tap(() => {
      spinner.show()
    }),//importante para 

    finalize(() => {
      spinner.hide();
    })

  );

};
