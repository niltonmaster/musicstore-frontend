import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth.service';
import { ResetPasswordRequestBody } from '../../shared/models/auth.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.css'
})
export class ResetPasswordDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ResetPasswordDialogComponent>);
  authService = inject(AuthService);
  router = inject(Router)
    ;
  //recibir data del principal
  readonly data = inject(MAT_DIALOG_DATA) as { email: string };//para hacer referencia: this.data.email
  // readonly animal = model(this.data.animal);


  verifyPasswords(form: NgForm) {
    const password = form.controls['newPassword']
    const confirmPassword = form.controls['confirmNewPassword']

    if (password && confirmPassword && password.value === confirmPassword.value) {
      confirmPassword.setErrors(null)

    } else {
      confirmPassword.setErrors({ asdasd: true })
    }

  }


  resetPassword(form: NgForm) {

    const { token, newPassword, confirmNewPassword, email } = form.value;

    const body: ResetPasswordRequestBody = {
      token, newPassword, confirmNewPassword, email
    }

    body.email = this.data.email;

    console.log('obj body :', body)
    console.log('email :', this.data.email)


    // const body: RegisterRequestBody = {
    //   age: Number.parseInt(this.registerForm.controls.age.value!),
    //   // confirmPassword: this.registerForm.controls.password.value!,
    //   documentNumber: this.registerForm.controls.documentNumber.value!,
    //   documentType: this.registerForm.controls.documentType.value!,
    //   email: this.registerForm.controls.email.value!,
    //   firstName: this.registerForm.controls.firstName.value!,
    //   lastName: this.registerForm.controls.lastName.value!,
    //   password: this.registerForm.controls.password.value!,
    //   confirmPassword: this.registerForm.controls.password.value!
    // }

    console.log('body request', body)



    this.authService.resetPassowrd(body).subscribe((data) => {
      alert('reset ok')
      this.router.navigate(['/login'])
      // this.router.navigate(['/login'])

    }
    )

  }

}
