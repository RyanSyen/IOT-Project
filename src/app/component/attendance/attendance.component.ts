import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  employees: any[] = [];
  header: any[] = [];

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService) {

    this.firebaseService.getEmployeeFromDB().subscribe(res => {
      this.header = [];
      this.employees = [];
      res.forEach(actions => {
        this.header.push(actions.key)
        this.employees.push(actions.payload.val());
      });
    });


  }

  ngOnInit(): void {

  }



}
