import { Component, inject, Pipe } from '@angular/core';
import { SimpleHeaderComponent } from "../shared/components/simple-header/simple-header.component";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { catchError, EMPTY, pipe } from 'rxjs';
// import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SimpleHeaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FooterComponent,
    FooterComponent, RouterLink,
    ReactiveFormsModule,
    // JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])




  })


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
      });
  }





}
