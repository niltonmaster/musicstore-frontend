import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BuyTicketApiResponse, GetConcertByIdApiResponse } from '../models/concert.model';
import { catchError, EMPTY } from 'rxjs';
import { SaleApiResponse } from '../models/sale.model';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  private http = inject(HttpClient)
  private baseUrl = environment.baseUrl;

  notificationsService = inject(NotificationsService)


  constructor() { }


  //IMPORTANTE EL ID NO VA COMO PARAMETRO SINO COMO PARTE DE LA RUTA 
  getConcertById(id: string) {

    return this.http.get<GetConcertByIdApiResponse>(
      this.baseUrl + 'concerts/' + id

    )
      //importante colocar aqui si solo deseo que sea para este compoenent,si no este PIPE colocarlo en 
      .pipe(
        catchError((error) => {
          // alert(error.error.errorMessage);
          this.notificationsService.error('Error', error.error.errorMessage)//IMPORTANTE ESTA LINEA SE REPITE COMO EN AUTHSERVICE.TS

          return EMPTY;
        })
      )
  }

  buyTickets(eventId: number, quantity: number) {
    return this.http.post<BuyTicketApiResponse>(
      this.baseUrl + 'sales', {
      concertId: eventId,
      ticketsQuantity: quantity
    }

      //importante headers
      //     , {
      // headers:
      //     }


    )



      .pipe(
        catchError((error) => {
          // alert('errorrrrrrrrr')
          // alert(error.error.errorMessage);
          this.notificationsService.error('Error', error.error.errorMessage)

          return EMPTY;
        })
      )

  }


  getSaleById(saleId: number) {
    return this.http.get<SaleApiResponse>(this.baseUrl + 'sales?id=' + saleId)
      .pipe(
        catchError((error) => {
          // alert('errorrrrrrrrr')
          // alert(error.error.errorMessage);
          this.notificationsService.error('Error', error.error.errorMessage)

          return EMPTY;
        })
      )
  }

}
