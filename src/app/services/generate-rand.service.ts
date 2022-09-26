import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateRandService {

  color = ['#FF0000', '#FFC000', '#FFFC00', '#FF0000', '#00FFFF', '#FF0000', 'blue', 'limegreen'];
  colorArr: any;
  colorArray: any[] = [];

  constructor() { }

  generateRandTemp() {
    return Math.floor(Math.random() * (30 - 18 + 1) + 18);
  }

  generateRandHumidity() {
    return Math.floor(Math.random() * (95 - 75 + 1) + 75);
  }

  callGenerateColor() {
    this.generateRandColor();
  }

  generateRandColor() {

    // use sort method to shuffle array in random order
    // slice method to get multile random elements
    // ... spead syntax to create a shallow copy of the ori array
    const shuffled = [...this.color].sort(() => 0.5 - Math.random());
    if (shuffled[0] != shuffled[1]) {
      return shuffled.slice(0, 2);
    } else {
      return this.callGenerateColor();
    }

  }

  checkDuplicate(array: any, el: any) {
    for (var i = 0; i < (array || []).length; i++)
      if (array[i] == el) return true;
    return false;
  }

  generate0ir1() {
    // return Math.floor(Math.random() * 1) + 1;

    return Math.round(Math.random());
  }

  generateWorkingHours() {
    return Math.floor(Math.random() * (9 - 5 + 1) + 5);
  }

  generateCarPark() {
    return Math.floor(Math.random() * (75 - 1 + 1) + 1);
  }
}
