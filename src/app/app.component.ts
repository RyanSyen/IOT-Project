import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Emp } from './interfaces/emp';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iot-app';
  private empCollection: AngularFirestoreCollection<Emp>;
  // emps: Observable<Emp[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.empCollection = afs.collection<Emp>('emps');
  }

  empRecords: Emp[] = [
    {
      id: '0',
      name: 'Ryan',
      gender: 'Male',
      position: 'Junior Developer',
      attendanceStatus: 'good'
    },
    {
      id: '1',
      name: 'Nimal',
      gender: 'Male',
      position: 'R&D Researcher',
      attendanceStatus: 'good'
    },
    {
      id: '2',
      name: 'Andy',
      gender: 'Male',
      position: 'Hardware Engineer',
      attendanceStatus: 'good'
    },
    {
      id: '3',
      name: 'Emily',
      gender: 'Female',
      position: 'Head of Marketing',
      attendanceStatus: 'good'
    },
    {
      id: '4',
      name: 'Karen',
      gender: 'Female',
      position: 'Clerk',
      attendanceStatus: 'bad'
    }
  ]

  ngOnInit(): void {
    //* populate employees records
    // this.empCollection = this.afs.collection<Emp>('emps');
    // this.empRecords.forEach(element => {
    //   // this.empCollection.add(element); // add element with generated key
    //   this.empCollection.doc(element.id).set(element);
    // });

  }

}
