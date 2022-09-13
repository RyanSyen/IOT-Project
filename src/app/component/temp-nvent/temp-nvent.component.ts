import { Observable } from 'rxjs';
import { Component, Injectable, OnInit } from '@angular/core';
import { Floor } from 'src/app/interfaces/floor';
import { LocalService } from 'src/app/services/local.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DashboardComponent } from '../dashboard/dashboard.component';

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

  private utilitiesCollection: AngularFirestoreCollection<any>;
  utilities: Observable<any>;

  constructor(private localService: LocalService, private readonly afs: AngularFirestore, private dashboardComponent: DashboardComponent) {
    this.utilitiesCollection = afs.collection<any>('utilities');
    this.utilities = this.utilitiesCollection.valueChanges({ idField: 'id' });

    this.get_util_records_using_valueChanges();
  }

  ngOnInit(): void {
    // populate data to firestore from local json file
    // this.localService.getFloorFromJson().then(data => {
    //   this.floorDet = data;
    //   this.updateData();

    //   this.floorDet.forEach(element => {
    //     this.utilitiesCollection.doc(element.name).set(element);
    //   });
    // });


  }

  updateData() {
    this.floorDet.forEach(element => {
      element.numLightbulbs = this.generateRandNumLightBulbs();
      element.avgTemp = this.dashboardComponent.generateRandTemp();
      element.avgHumidity = this.dashboardComponent.generateRandHumidity();
    });
  }

  generateRandNumLightBulbs() {
    console.log("random is running")
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }

  get_util_records_using_valueChanges() {

    this.utilities.subscribe(res => {
      // console.log(res);
      this.floorDet = res;
    })
  }

}
