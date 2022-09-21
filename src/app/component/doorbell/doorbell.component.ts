import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from 'src/app/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doorbell',
  templateUrl: './doorbell.component.html',
  styleUrls: ['./doorbell.component.scss']
})
export class DoorbellComponent implements OnInit {

  profileUrl: Observable<string | null> | undefined;

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService, private storage: AngularFireStorage) {

    this.firebaseService.getDoorBellStatus().subscribe(res => {
      // console.log(res.toString())
      let status = res.toString();
      if (status == '1') {
        // get image url
        const ref = this.storage.ref('CCTV');
        this.profileUrl = ref.getDownloadURL();
      } else {
        this.profileUrl = undefined;
      }
    });


    // const ref = this.storage.ref('CCTV');
    // this.profileUrl = ref.getDownloadURL();

  }

  ngOnInit(): void {
  }

}
