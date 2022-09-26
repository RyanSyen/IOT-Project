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
  dates = [];
  startDate = '2022-09-01';
  endDate = '2022-12-30';

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
        if (element.key == "B1") {
          this.totalB1 = element.payload.val();
        } else if (element.key == "B2") {
          this.totalB2 = element.payload.val();
        }
      });
      let total = this.totalB1 + this.totalB2;
      // console.log(total)
      const ref = this.db.list('OTHER_VALUES');
      ref.update('pSpace', { total: total })
    })

  }

  getDatesInRange(startDate: any, endDate: any) {
    var newStartDate = this.parseDate(startDate)
    var newEndDate = this.parseDate(endDate)
    const date = new Date(newStartDate.getTime());
    const dates = [];
    while (date <= newEndDate) {
      dates.push(new Date(date).toLocaleDateString('en-GB'));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  // parse a date in yyyy-mm-dd format
  parseDate(input: any) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }

  populateVentilationReport() {

    let floor = ['B2', 'B1', 'G', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];
    let time = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

    let dateArr = this.getDatesInRange(this.startDate, this.endDate);
    dateArr.forEach(element => {
      let date = element;
      let result = date.replace(/\//g, "-");
      floor.forEach(element => {
        // console.log(element)
        let hours = this.randService.generateWorkingHours();
        // 5 HP Rated Power Consumption 4180 W
        let kWalts = 4.18 * hours;

        const arrr = {
          [element]: [{
            runningHours: hours,
            kWalts: kWalts
          }]
        }
        const report = {
          runningHours: hours,
          kWalts: kWalts
        }
        const template = {
          floor: "",
          runningHours: "",
          kWalts: ""
        }
        const parking = {
          hour: time,
          occupied: this.randService.generateCarPark()
        }
        const attendenace = {
          id: '0231323030303845373432424603',
          name: 'Andy',
          signinstatus: this.randService.generate0ir1()
        }
        // send to rtdb
        // const ref = this.db.list("report/ventilation");
        //! set is a destructive update 
        // this.db.database.ref("report/ventilation").child(result).set(report)
        // ref.set(result, arrr);
        // ref.update(result, report)
        // ref.push({ [result]: arrr });

        //* ventilation
        // this.addDetails(result, element, report);
        //* parking
        this.addDetails1(result, element, parking);
      });
    });

  }

  addDetails(date: string, key: string, value: any) {
    // const ref = this.db.list("report/ventilation/" + date + "/" + key);
    const ref = this.db.list("report/ventilation/" + date);
    // ref.push(value);
    ref.set(key, value)
  }

  getVentilationData(date: any) {
    return this.db.list("report/ventilation/" + date).snapshotChanges();

  }

  addDetails1(date: string, key: string, value: any) {
    const ref = this.db.list("report/parking/" + date);
    ref.set(key, value)
  }

  getParkingData(date: any) {
    return this.db.list("report/parking/" + date).snapshotChanges();
  }

  addAttendanceDate(date: any) {
    return this.db.list("report/parking/" + date).snapshotChanges();
  }
}


