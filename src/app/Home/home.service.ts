import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HomeApiResponse } from './HomeApiResponse.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = environment.baseUrl;


  //usar hhtpClient:
  // para usar hay que condigurar en app.config.ts
  http = inject(HttpClient)

  // constructor() {
  //   this.http.

  // }

  getData() {
    // return this.http.get<HomeApiResponse>("https://localhost:7197/api/home");
    return this.http.get<HomeApiResponse>(this.baseUrl + "home");

  }




}
