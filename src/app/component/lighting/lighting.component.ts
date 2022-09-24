import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lighting',
  templateUrl: './lighting.component.html',
  styleUrls: ['./lighting.component.scss']
})
export class LightingComponent implements OnInit {

  lightSensor: any;

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getLight();
  }

  getLight() {
    const ref = this.db.list("CR13_CURRENT");
    this.db.list('CR13_CURRENT').valueChanges().subscribe(res => {

      if (res) {
        this.lightSensor = res[1];
      }
    });
  }


}
