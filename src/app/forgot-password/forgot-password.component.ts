import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SimpleHeaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FooterComponent,
    FooterComponent, RouterLink,
    FormsModule,
    // ReactiveFormsModule,//IMPORTANTE AQUI NO USAREMOS REACTIVE FORMSMODULE SINO TEMPLATE
    JsonPipe],

  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  authService = inject(AuthService);

  router = inject(Router)

  matDialog = inject(MatDialog)


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])




  })


  sendToken(email: string) {
    console.log('email enviado', email)
    this.matDialog.open(ResetPasswordDialogComponent);

    // return;
    this.authService.sendToken(email).subscribe(() => {
      alert('token enviado')

      //logica para abrir modal


    })



  };

}
