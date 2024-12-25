import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Home/home.component";
import { AuthService } from './shared/services/auth.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Options } from 'angular2-notifications'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule],///, HomeComponent],
  // imports: [HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'musical-events';

  authService = inject(AuthService)

  //variable de opciones para NAVIGATION2-NOTIFICACTIONS
  notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000
  }

  constructor() {
    console.log('ctor appcomponent')

    this.authService.jwtDecode()


  }
}
