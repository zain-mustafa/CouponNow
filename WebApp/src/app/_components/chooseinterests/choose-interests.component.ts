import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-choose-interests',
  templateUrl: './choose-interests.component.html',
  styleUrls: ['./choose-interests.component.css']
})
export class ChooseInterestsComponent implements OnInit {

  breakpoint: number;
  minCols: number = 1;
  maxCols: number = 3;

  constructor() { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? this.minCols : this.maxCols;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? this.minCols : this.maxCols;
  }

  tiles: Tile[] = [
    {text: 'Restaurants', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Clothes', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Fitness', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Art', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Music', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Other', cols: 1, rows: 1, color: 'lightblue'},
  ];

}
