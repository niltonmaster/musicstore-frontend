import { Component, inject, Pipe } from '@angular/core';
import { SimpleHeaderComponent } from "../shared/components/simple-header/simple-header.component";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { catchError, EMPTY, pipe } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { jwtDecode } from "jwt-decode";
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SimpleHeaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FooterComponent,
    FooterComponent, RouterLink,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);

  router = inject(Router)


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])




  })




  notifications = inject(NotificationsService);

  login() {
    // console.log(this.loginForm.value)


    const email = this.loginForm.controls.email.value!;
    const password = this.loginForm.controls.password.value!;
    this.authService.login(email, password)

      /*
        //importante colocar aqui si solo deseo que sea para este compoenent,si no este PIPE colocarlo en 
          .pipe(
            catchError((error) => {
              alert(error.error.errorMessage);
              return EMPTY;
            })
          )*/

      .subscribe((response) => {
        //IMPORANTE: AQUI SOLO ENTRA CUANDO LA RESPUESTA ES CORRECTA, SI LAS CREDENCIALES SON INCORRECTA NO ENTRA AQUI
        console.log('respuesta: ', response.data.token)
        localStorage.setItem('token', response.data.token)


        console.log('jwtdecode ', jwtDecode(response.data.token))


        //DECODIFICAR TOKEN TRASLADADO A UN METODO DENTO DEL SERVICIO DE AUTH
        /*
        const jwtDecoded: any = jwtDecode(response.data.token);
        const name = jwtDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

        const role = jwtDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

        console.log('name', name)
        console.log('role', role)

        this.authService.name.set(name)
        this.authService.rol2.set(role)
        this.authService.isLoggedIn.set(true);*/

        this.authService.jwtDecode();
        this.notifications.success('Login correcto')


        const nextRoute = this.authService.rol() == "Administrator" ? '/admin' : '/customer';
        alert('inicio de sesipon correcto')
        this.router.navigate([nextRoute])//(['/home'])

      });
  }





}
