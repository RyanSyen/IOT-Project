// import { Label } from 'ng2-charts';
import { Component, OnInit, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {

  floors: any[] = [];
  activeFloor: any;
  visible = true;
  activeItem: any;

  constructor() { }

  ngOnInit(): void {
    this.floors = [
      { label: 'B1', icon: 'pi pi-angle-up' },
      { label: 'B2', icon: 'pi pi-angle-double-up' },
      // { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      // { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      // { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.floors[0];
  }

  activateMenu(event: any) {
    if (event.activeItem.label == 'Home') {
      this.visible = true;
    } else if (event.activeItem.label == 'Calendar') {
      setTimeout(() => {
        this.visible = false;
      }, 500);

    }
  }

}
