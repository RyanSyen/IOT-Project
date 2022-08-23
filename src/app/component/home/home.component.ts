import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  tutorial: any;

  studentDetails = {
    name: '',
    age: ''
  }

  constructor(private firebaseService: FirebaseService) { }

  // studentCollectiondata = [
  //   {
  //     name: 'Sankhadip Samanta',
  //     age: 21,
  //     id: '1111'
  //   },
  //   {
  //     name: 'Sankhadip Samanta',
  //     age: 21,
  //     id: '1111'
  //   }
  // ]

  studentCollectiondata: { id: string, name: string, age: string }[] | any = [];

  ngOnInit(): void {
    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateStudentCollection(snapshot);
    })
  }



  async add() {
    const { name, age } = this.studentDetails;
    await this.firebaseService.addStudent(name, age);
    this.studentDetails.name = "";
    this.studentDetails.age = "";
  }

  async get() {
    const snapshot = await this.firebaseService.getStudents();
    this.updateStudentCollection(snapshot);
  }

  updateStudentCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.studentCollectiondata = [];
    snapshot.docs.forEach((student) => {
      this.studentCollectiondata.push({ ...student.data(), id: student.id });
    })
  }

  async delete(docId: string) {
    await this.firebaseService.deleteStudent(docId);
  }

  async update(docId: string, name: HTMLInputElement, age: HTMLInputElement) {
    await this.firebaseService.updateStudent(docId, name.value, age.value);
  }

}


