import { Component, OnInit } from '@angular/core';
import { Floor } from 'src/app/interfaces/floor';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-temp-nvent',
  templateUrl: './temp-nvent.component.html',
  styleUrls: ['./temp-nvent.component.scss']
})
export class TempNventComponent implements OnInit {

  //* floor details
  floorDet: Floor[] = [];
  max = 100;
  min = 90;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.localService.getFloorFromJson().then(data => {
      this.floorDet = data;
      this.updateData();
    });
  }

  updateData() {
    this.floorDet.forEach(element => {
      element.numLightbulbs = this.generateRandNumLightBulbs();
    });
  }

  generateRandNumLightBulbs() {
    console.log("random is running")
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }

}
