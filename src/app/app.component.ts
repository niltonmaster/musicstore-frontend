import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Home/home.component";
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],///, HomeComponent],
  // imports: [HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'musical-events';

  authService = inject(AuthService)

  constructor() {
    console.log('ctor appcomponent')

    this.authService.jwtDecode()


  }
}
