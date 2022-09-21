import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, DocumentReference } from 'firebase/firestore'
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emp } from './interfaces/emp';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { TimeScale } from 'chart.js';






@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // private empAttendance: AngularFirestoreCollection<any>;
  // private empAttendance1: AngularFirestoreDocument<any> | undefined;

  constructor(private readonly afs: AngularFirestore, private firestore: AngularFirestore, private db: AngularFireDatabase) {
    // this.empAttendance = afs.collection<any>('empAttendance');

  }


  ngOnInit(): void {

  }

  getEmployee() {
    return this.firestore.collection('emps').valueChanges();
  }

  getEmployeeFromDB() {
    return this.db.list('Employee').snapshotChanges();
  }

  getDoorBellStatus() {
    return this.db.list('OTHER_CONTROL').valueChanges();
  }

  setAttendance(date: any) {
    //! cannot use firestore due to destructive updates and limitations of adding with customized key values
    // this.empAttendance1 = this.afs.doc<any>('empAttendance/' + date);
    // this.getEmployee().subscribe(res => {
    //   let emp: any;
    //   res.forEach(element => {
    //     emp = element;

    //     let empID = emp.id;
    //     console.log(empID)
    //     // this.empAttendance.doc(date).set({ [empID]: '0' });
    //     // this.empAttendance1?.set({ [empID]: '0' });
    //     this.empAttendance1?.set({ empID: empID });
    //     this.empAttendance.

    //   });
    // })

    const ref = this.db.list("empAttendance/" + date);
    let emp: any;
    this.getEmployee().subscribe(res => {
      res.forEach(element => {
        emp = element;
        let empID = emp.id;
        ref.set(emp.id, 0);
      });
    })

  }



}


