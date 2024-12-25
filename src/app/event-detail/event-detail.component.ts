import { Component, inject, OnInit } from '@angular/core';
import { LoggedInHeaderComponent } from "../shared/logged-in-header/logged-in-header.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { Concert } from '../shared/models/concert.model';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { ConcertService } from '../shared/services/concert.service';
import { TextLimiterPipe } from '../shared/pipes/text-limiter.pipe';
import { AuthService } from '../shared/services/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { VoucherDialogComponent } from '../shared/voucher-dialog/voucher-dialog.component';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [LoggedInHeaderComponent, FooterComponent, FooterComponent,
    EventCardComponent, MatButtonModule,
    TextLimiterPipe],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {

  // HttpClient=inject(HttpClient);
  // data: inject(concert);
  activatedRoute = inject(ActivatedRoute)
  concert!: Concert;
  concertService = inject(ConcertService);

  eventId = '';
  authService = inject(AuthService);

  router = inject(Router);
  matDialog = inject(MatDialog)


  notificationsService = inject(NotificationsService)

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.params['id'];
    this.concertService.getConcertById(this.eventId).subscribe((response) => {
      // console.log('response get concert by id', response)
      this.concert = response.data;
    })
  }


  openBuyDialog() {

    // console.log('asdas', this.authService)
    if (!this.authService.isLoggedIn()) {
      this.notificationsService.alert('Error', 'Debes iniciar sesion para comprar')


      this.router.navigate(['/login']);

    }

    if (this.authService.rol() == 'Administrator') {

      this.notificationsService.warn('Error', 'Los administradores no pueden comprar boletos')
      // alert('los administradores no pueden comprar boletos')
      return;

    }

    //abrir dialog

    const result = this.matDialog.open(BuyDialogComponent,
      {

        data: this.concert
      })

    result.afterClosed().subscribe((saleId) => {
      console.log('entra a afterClosed solo si fue OK VENTAS')
      if (saleId) {
        this.notificationsService.success('Compra exitosa', 'Gracias por tu compra')
        const voucherDialogRef = this.matDialog.open(VoucherDialogComponent, {
          // data: saleId//IMPORTANTE puede ser asi directo o pasar como JSON : {saleId}
          data: { saleId }//importante es como se envia aqui , si se envia como objeto entonces en el 
          //destino se puede poner "as { x:number}" 

        })

        voucherDialogRef.afterClosed().subscribe((res) => {
          this.router.navigate(['/home'])
        })
      } else {



      }
    })

  }

}
