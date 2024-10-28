import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { HeaderService } from './header.service';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

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

  /**
   *
   */
  constructor() {
    // const a = new Observable<string>();
    // const b: Observable<string> = a;


    this.headerService.searchValue$ = this.searchBarFormControl.valueChanges.pipe(
      map((valor) => {
        valor =
          valor ? //EXISTE!!!! esto significa que el valor NO ES NULL | UNDEFINED
            valor : ''

        return valor;
      }

        // map((x) => (x ? x : ''))

      )


    );

    console.log('asdas', this.headerService.searchValue$)
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
