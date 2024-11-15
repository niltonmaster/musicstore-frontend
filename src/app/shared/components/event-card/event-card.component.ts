import { Component, Input, OnInit } from '@angular/core';
import { Concert } from '../../models/concert.model';
import { UpperCasePipe } from '@angular/common';
import { TextLimiterPipe } from '../../pipes/text-limiter.pipe';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [UpperCasePipe, TextLimiterPipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {



  //debe recibir datos de entrada

  @Input({ required: true }) data!: Concert;




  /**
   *
   */

  //falla porque en el contructor el campo imageUrl es undefined por tanonhacerlo en OniInt
  constructor() {

    if (!this.data) {
      console.log('data cto', this.data) //UNDEFINEDD!!!!!!!!!
    }

  }
  ngOnInit(): void {
    // console.log('ngOnInit data', this.data)
    // this.data.imageUrl = "images/generic-concert-poster.jpg"
  }




}
