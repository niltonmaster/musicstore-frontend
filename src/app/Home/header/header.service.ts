import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  // constructor() { }

  searchValue$ = new Observable<string>();//Observable es como una linea de Tiempo que va emitir valor. 



}
