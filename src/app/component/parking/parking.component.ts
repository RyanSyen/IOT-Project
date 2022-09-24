// import { Label } from 'ng2-charts';
import { Component, OnInit, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { GenerateRandService } from 'src/app/services/generate-rand.service';
import { FirebaseService } from 'src/app/firebase.service';

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
  parking: any[] = [];
  b2Parking: any[] = [];
  b2ParkingCount = 0;
  b1Parking: any[] = [];
  b1ParkingCount = 0;

  constructor(private randService: GenerateRandService, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.floors = [
      { label: 'B1', icon: 'pi pi-angle-up' },
      { label: 'B2', icon: 'pi pi-angle-double-up' },
      // { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      // { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      // { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.floors[0];

    this.firebaseService.getParkingB2().subscribe(res => {
      // console.log(res)
      res.forEach(element => {
        if (element === '1') {
          ++this.b2ParkingCount;
        }
      });
      this.b2Parking = res;
    })

    this.firebaseService.getParkingB1().subscribe(res => {
      // console.log(res)
      res.forEach(element => {
        if (element === '1') {
          ++this.b1ParkingCount;
        }
      });
      this.b1Parking = res;
    })
  }

  activateMenu(event: any) {
    if (event.activeItem.label == 'B1') {
      this.visible = true;
    } else if (event.activeItem.label == 'B2') {
      setTimeout(() => {
        this.visible = false;
      }, 500);

    }
  }

}
