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
import { GenerateRandService } from 'src/app/services/generate-rand.service';
import { ThemeService } from 'ng2-charts';





@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // private empAttendance: AngularFirestoreCollection<any>;
  // private empAttendance1: AngularFirestoreDocument<any> | undefined;

  parking: any[] = [];
  totalB1: any;
  totalB2: any;

  constructor(private readonly afs: AngularFirestore, private firestore: AngularFirestore, private db: AngularFireDatabase, private randService: GenerateRandService) {
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

  test() {
    return this.db.list('OTHER_CONTROL').snapshotChanges();
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

  pushParkingtoDB() {
    // populate parking
    for (let i = 0; i < 75; i++) {
      this.parking.push(
        { id: i, val: this.randService.generate0ir1() }
      )
      // push to db
      const ref = this.db.list("parking/B2");
      this.parking.forEach(element => {
        ref.set(element.id.toString(), element.val.toString())
      });
    }
    console.log(this.parking);
  }

  getParkingB2() {
    return this.db.list('parking/B2').valueChanges();
  }

  getParkingB1() {
    return this.db.list('parking/B1').valueChanges();
  }

  getB1(val: number) {
    // this.totalB1 = val;
    // console.log(this.totalB1)

    const ref = this.db.list('OTHER_VALUES');
    ref.update('pSpace', { B1: val })
  }

  getB2(val: number) {
    // this.totalB2 = val;
    // console.log(this.totalB2)

    const ref = this.db.list('OTHER_VALUES');
    ref.update('pSpace', { B2: val })
  }

  getB1nB2() {
    this.db.list('OTHER_VALUES/pSpace').snapshotChanges().subscribe(res => {
      res.forEach(element => {
        console.log(element.payload.val())
        if (element.key == "B1") {
          this.totalB1 = element.payload.val();
        } else if (element.key == "B2") {
          this.totalB2 = element.payload.val();
        }
      });
      let total = this.totalB1 + this.totalB2;
      console.log(total)
      const ref = this.db.list('OTHER_VALUES');
      ref.update('pSpace', { total: total })
    })

  }

}


