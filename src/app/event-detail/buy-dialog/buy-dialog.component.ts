import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConcertService } from '../../shared/services/concert.service';
import { Concert } from '../../shared/models/concert.model';

@Component({
    selector: 'app-buy-dialog',
    imports: [FormsModule, //form reactivo para control
        MatButtonModule, //estilo boton 
        MatFormField, //estilo boton 
        MatInputModule //estilo input angular
    ],
    templateUrl: './buy-dialog.component.html',
    styleUrl: './buy-dialog.component.css'
})
export class BuyDialogComponent {

  data = inject(MAT_DIALOG_DATA) as Concert;//dato de entrada
  concertService = inject(ConcertService);
  matDialogRef = inject(MatDialogRef);

  //
  buyTickets(quantity: number) {

    this.concertService.buyTickets(this.data.id, quantity).subscribe((response) => {
      // this.concertService.buyTickets(10, quantity).subscribe((response) => {

      if (response.success) {
        alert('OK :respues de servicio ')
        this.matDialogRef.close(response.data);//IMPORTANTE se puede pasar el resultado a componente que abrio(padre)

      } else {
        alert('ERROR :respues de servicio asdasdas');
        console.log('error message', response.errorMessage)
      }
    })




  }


}
