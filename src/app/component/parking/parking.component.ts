// import { Label } from 'ng2-charts';
import { Component, OnInit, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { GenerateRandService } from 'src/app/services/generate-rand.service';
import { FirebaseService } from 'src/app/firebase.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

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
  rand1Sensor: any;
  status = "";
  snapshot: any;

  constructor(private randService: GenerateRandService, private firebaseService: FirebaseService, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.floors = [
      { label: 'B1', icon: 'pi pi-angle-up' },
      { label: 'B2', icon: 'pi pi-angle-double-up' },
      // { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      // { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      // { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.floors[0];

    // this.firebaseService.pushParkingtoDB();
    this.getParkingB1();
    this.getParkingB2();
    this.firebaseService.getB1nB2();
    this.get_current_component_status();
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

  get_current_component_status() {
    // copied from dashboard.component.ts
    const ref = this.db.list("CR13_CURRENT");
    this.db.list('CR13_CURRENT').valueChanges().subscribe(res => {

      if (res) {
        //* rand1 as ultrasonic
        this.rand1Sensor = res[3];
        console.log(this.rand1Sensor)
        //console.log(typeof (res[3])) //string
        this.checkParking(res[3])

      }
    });
  }

  checkParking(distance: any) {
    if (parseInt(distance) < 20) {
      // car near to sensor
      this.status = 'occupied';
      // console.log("carpark occupied")
      this.firebaseService.setB1(1);
      this.getParkingB1();
    } else {
      this.status = 'vaccant';
      // console.log("carpark vaccant")
      this.firebaseService.setB1(0);
      this.getParkingB1();
    }
  }

  getParkingB2() {
    this.firebaseService.getParkingB2().subscribe(res => {
      // console.log(res)
      res.forEach(element => {
        if (element === '1') {
          ++this.b2ParkingCount;
        }
      });
      this.firebaseService.getB2(this.b2ParkingCount)
      console.log(res)
      this.b2Parking = res;
    })
  }

  getParkingB1() {

    this.firebaseService.getParkingB1().subscribe(res => {
      // console.log(res)
      this.snapshot = res;
      res.forEach((element: any) => {
        // let val = element.payload.val();
        // console.log(element.payload.val())
        // console.log(typeof (element.payload.val())) // value 1, type string
        if (element.payload.val() == '1') {
          // ++this.b1ParkingCount;
        }
      });
      console.log(this.snapshot.count)
      let snapshot = this.snapshot;
      snapshot.forEach((element: any) => {
        if (element.payload.val() == '1') {
          // ++this.b1ParkingCount;
        }
      });
      // console.log(this.b1ParkingCount)
      this.firebaseService.getB1(this.b1ParkingCount)

      this.b1Parking = res;
    })
  }
}
