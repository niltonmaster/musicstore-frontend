import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { HeaderService } from './header.service';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule,
    ReactiveFormsModule,//para usar observables
    RouterLink,//para usar directiva RouterLink en html
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {//implements OnInit {
  searchBarFormControl = new FormControl('');
  headerService = inject(HeaderService);

  authService = inject(AuthService)

  /**
   *
   */
  constructor() {
    // const a = new Observable<string>();
    // const b: Observable<string> = a;

    console.log('ctor header')



    const token = localStorage.getItem('token');
    /*if (token) {
      console.log('existe toke header')
      this.authService.jwtDecode()
    }
    else {
      console.log('no existe token header')
    }*/

    this.headerService.searchValue$ = this.searchBarFormControl.valueChanges.pipe(
      map((valor) => {
        valor =
          valor ? //EXISTE!!!! esto significa que el valor NO ES NULL | UNDEFINED
            valor : ''

        console.log('header searchValue$')
        return valor;
      }

        // map((x) => (x ? x : ''))

      )


    );

    // console.log('asdas', this.headerService.searchValue$)
  }

  /*
  ngOnInit(): void {


    console.log('hola nilton soy header component')
    this.searchBarFormControl.valueChanges.subscribe((value) => {
      console.log('valor:', value);


      // return response = value ? value : '';

    });
  }*/

  // constructor() { 


  // }

}
