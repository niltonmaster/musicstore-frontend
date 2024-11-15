import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { LoginApiResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl = environment.baseUrl;
  http = inject(HttpClient)

  constructor() { }


  login(email: string, password: string) {
    console.log('inside login service', email, '-', password)
    return this.http.post<LoginApiResponse>(this.baseUrl + 'users/login', {
      username: email,
      password: password
    })

      //importante colocar aqui si solo deseo que sea para este compoenent,si no este PIPE colocarlo en 
      .pipe(
        catchError((error) => {
          alert(error.error.errorMessage);
          return EMPTY;
        })
      )

  }
}
