import { Component, inject, OnInit } from '@angular/core';
import { Sale } from '../models/sale.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcertService } from '../services/concert.service';

@Component({
    selector: 'app-voucher-dialog',
    imports: [],
    templateUrl: './voucher-dialog.component.html',
    styleUrl: './voucher-dialog.component.css'
})
export class VoucherDialogComponent implements OnInit {

  datax = inject(MAT_DIALOG_DATA) as { saleId: number }//ese valor llegar de event deatil en after close
  sale!: Sale//importante usar ! para decir que no sera null

  concertService = inject(ConcertService);


  ngOnInit(): void {

    console.log('sale Id:', this.datax);
    // return
    // this.datax.saleId4


    this.concertService.getSaleById(this.datax.saleId).subscribe((response) => {
      console.log('response', response)
      this.sale = response.data;
    })


  }



}
