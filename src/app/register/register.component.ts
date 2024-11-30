import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { AuthService } from '../shared/services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { RegisterRequestBody } from '../shared/models/auth.model';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SimpleHeaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FooterComponent,
    FooterComponent, RouterLink,
    ReactiveFormsModule, MatSelectModule,
    JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  currenDocument = new FormControl(0);
  // currentGenre = new FormControl(0);//como innt


  authService = inject(AuthService);

  router = inject(Router)

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    age: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),

  })


  register() {
    const body: RegisterRequestBody = {
      age: Number.parseInt(this.registerForm.controls.age.value!),
      // confirmPassword: this.registerForm.controls.password.value!,
      documentNumber: this.registerForm.controls.documentNumber.value!,
      documentType: this.registerForm.controls.documentType.value!,
      email: this.registerForm.controls.email.value!,
      firstName: this.registerForm.controls.firstName.value!,
      lastName: this.registerForm.controls.lastName.value!,
      password: this.registerForm.controls.password.value!,
      confirmPassword: this.registerForm.controls.password.value!
    }

    console.log('body request', body)

    this.authService.register(body).subscribe(() => {
      alert('registro exitoso');
      this.router.navigate(['/login'])

    })


  }
}
