import { Component, inject, OnInit, Injectable } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { EventCardComponent } from "../shared/components/event-card/event-card.component";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeService } from './home.service';
import { Concert } from '../shared/models/concert.model';
import { Genre } from '../shared/models/genre.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HeaderService } from './header/header.service';
import { lastValueFrom } from 'rxjs';
import { GihghlightableDirective } from '../shared/directives/gihghlightable.directive';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { RouterLink } from '@angular/router';
// import { jwtDecode } from "jwt-decode";


@Component({
    selector: 'app-home',
    imports: [HeaderComponent, FooterComponent, EventCardComponent, MatFormFieldModule, MatSelectModule, ReactiveFormsModule,
        GihghlightableDirective, SimpleHeaderComponent, RouterLink
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  homrService = inject(HomeService);

  headerService = inject(HeaderService);



  initialConcerts: Concert[] = [];

  currentGenre = new FormControl(0);//como innt

  // currentGenre = new FormControl("0");//como string
  genres: Genre[] = [];
  concerts: Concert[] = [];



  searchGenreValue: number = 0;
  searchBarValue: string = "";

  ngOnInit(): void {
    console.log('home component intilizades.');

    this.homrService.getData().subscribe((data) => {
      console.log("data", data);
      this.genres = data.genres;
      this.initialConcerts = data.concerts;
      this.concerts = this.initialConcerts;
    });



    this.currentGenre.valueChanges.subscribe((value) => {
      console.log('selected genre', value)
      this.searchGenreValue = value || 0;
      this.filterConcerts();

    });


    //este valor searchValue$ se llena primero en HeaderCOMPONENT.TS
    this.headerService.searchValue$.subscribe((value) => {
      console.log('seach genre', value);

      this.searchBarValue = value;

      this.filterConcerts();
    });

  }


  filterConcerts() {
    this.concerts = this.initialConcerts
      .filter(filter =>
        this.searchGenreValue === 0 ? true :
          filter.genreId === this.searchGenreValue)
      .filter((value) => {

        console.log('fileter in search', value)
        console.log('fileter in xxxx', this.searchBarValue)

        return value.description.toLowerCase().includes(this.searchBarValue.toLowerCase())
      });



  }



}
