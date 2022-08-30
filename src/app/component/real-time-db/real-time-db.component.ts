import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-real-time-db',
  templateUrl: './real-time-db.component.html',
  styleUrls: ['./real-time-db.component.scss']
})
export class RealTimeDBComponent implements OnInit {
  tutorial: any;
  item!: Observable<any>;
  pipe = new DatePipe('en-US');

  //* current date and time
  today = new Date();
  date: any;

  constructor(private db: AngularFireDatabase) {
    //this.item = db.object('item').valueChanges();

    //* initialize database
    let ChangedDateFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.date = ChangedDateFormat;
  }

  ngOnInit(): void {

    //* create object binding / retrieve data
    // db: AngularFireDatabase
    //this.tutorial = this.db.object('tutorial');

    // or
    // Observable < any > this.tutorial = this.db.object('tutorial').valueChanges();

    //* create/update an object
    //const tutRef = this.db.object('tutorial/test');

    // set() for destructive updates
    //tutRef.set({ title: 'zkoder Tutorial' });

    //* update object
    //const tutRef1 = this.db.object('tutorial');
    //tutRef.update({ url: 'bezkoder.com/zkoder-tutorial' });

    const test = this.db.object('CR13_CONTROL');
    test.update({ buzzer: "1" });

    //* delete object
    //const tutRef2 = this.db.object('tutorial');
    // tutRef.remove();
  }




}
