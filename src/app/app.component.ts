import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Home/home.component";
import { AuthService } from './shared/services/auth.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Options } from 'angular2-notifications'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SimpleNotificationsModule,
        NgxSpinnerModule //IMPORTANTE 3ER PASO PARA IMPORTAR ASI COMO SIMPLENOTIFICATION DE ARRIBA
    ], ///, HomeComponent],
    // imports: [HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'musical-events';

  authService = inject(AuthService)

  //variable de opciones para NAVIGATION2-NOTIFICACTIONS
  notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000
  }


  spinner = inject(NgxSpinnerService);


  constructor() {
    console.log('ctor appcomponent')

    this.authService.jwtDecode()

    // this.spinner.show()

  }

  ngOnInit(): void {
    // this.spinner.show()
    // setTimeout(() => {
    //   this.spinner.hide()

    // }, 3000);

  }
}
