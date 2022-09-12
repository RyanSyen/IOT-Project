import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  db: Firestore;
  studentCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  // database reference
  // const dbRef1 = firebase1.database().ref();
  dbRef = getDatabase();

  constructor() {
    initializeApp(environment.firebase1);
    this.db = getFirestore();
    this.studentCol = collection(this.db, 'students');

    // Get Realtime Data
    onSnapshot(this.studentCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async getStudents() {
    const snapshot = await getDocs(this.studentCol);
    return snapshot;
  }


  async addStudent(name: string, age: string) {
    await addDoc(this.studentCol, {
      name,
      age
    })
    return;
  }

  async deleteStudent(docId: string) {
    const docRef = doc(this.db, 'students', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateStudent(docId: string, name: string, age: string) {
    const docRef = doc(this.db, 'students', docId);
    await updateDoc(docRef, { name, age })
    return;
  }

  // retrieve current component status from CR13_Current


}

