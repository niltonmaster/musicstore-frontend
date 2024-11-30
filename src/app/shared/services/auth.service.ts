import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { LoginApiResponse, RegisterRequestBody } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient)


  ///IMPORTANTE usar singal8 para incializar variables con tipo primitivos
  email = signal('');
  name = signal('');
  // role = '';
  rol = signal('');
  isLoggedIn = signal(false);


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


  jwtDecode() {

    const token = localStorage.getItem('token');
    if (!token)
      return;

    const jwtDecoded: any = jwtDecode(token);

    // console.log('email', jwtDecoded)
    const exp = jwtDecoded['exp']
    // console.log('exp', Date.parse(exp))

    const email = jwtDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    const name = jwtDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    const role = jwtDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    console.log('name', name)
    console.log('role', role)

    this.name.set(name)
    this.rol.set(role)
    this.email.set(email)

    this.isLoggedIn.set(true);


  }



  logout() {

    // const token = localStorage.getItem('token');


    // if (!token)
    //   return;



    // localStorage.removeItem('token')
    localStorage.clear()//importante esto borara todos los ITEMS
    this.email.set('')
    this.name.set('')
    this.rol.set('')
    this.isLoggedIn.set(false);
  }


  sendToken(email: string) {
    return this.http.post<LoginApiResponse>(this.baseUrl + 'users/RequestTokenToResetPassword', {
      email
    })
      .pipe(
        catchError((error) => {
          console.log('error' + error.error.errorMessage);
          return EMPTY;
        })
      )
  }

  //importante TENER CUIDADO AL ENVIAR EL BODY, POR EJEMPLO SI ENVIO {Body} sale error encambio asi solo es o
  register(body: RegisterRequestBody) {
    console.log('body request authservice', body)

    return this.http.post<LoginApiResponse>(this.baseUrl + 'users/register',

      body

    )
      .pipe(
        catchError((error) => {
          console.log('error' + error.error.errorMessage);
          return EMPTY;
        })
      )



    /*  return this.http.post<LoginApiResponse>(this.baseUrl + 'users/login', {
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
  */

  }


}
