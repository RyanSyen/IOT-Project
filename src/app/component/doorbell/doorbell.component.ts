import { LocalService } from './../../services/local.service';
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

  status = '';
  imgArr: any[] = [];
  test: any[] = [];
  fileDate = "";
  img: any;

  profileUrl: Observable<string | null> | undefined;

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService, private storage: AngularFireStorage, private localservice: LocalService) {

    this.firebaseService.getDoorBellStatus().subscribe(res => {
      this.status = res.toString();
      if (this.status == '1') {
        // get image url
        const ref = this.storage.ref('CCTV');
        console.log(ref.getDownloadURL())
        // this.profileUrl = ref.getDownloadURL();
        ref.getDownloadURL().subscribe((data) => {
          this.profileUrl = data;
          this.imgArr.push(this.profileUrl);
          console.log(this.imgArr)
          let size = this.imgArr.length;
          this.img = this.imgArr[size - 1];
        })

      } else {
        this.profileUrl = undefined;
      }
    });
  }

  ngOnInit(): void {
    this.getFileDetails();
  }

  getFileDetails() {
    let date = this.localservice.getDateTime();
    console.log(date)
    const ref = this.storage.ref('');
    let myurlsubscription = ref.listAll().subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref(data.items[i].name);
        let url = newref.getDownloadURL().subscribe((data) => {
          console.log(data)
          let link = data;
          let date = newref.getMetadata().subscribe((data) => {
            console.log(data)
            console.log("name = " + data.name + "date = " + data.timeCreated)
            const datee = data.timeCreated.slice(0, 10);
            const time = data.timeCreated.slice(11, 19);
            this.fileDate = datee;
            this.test.push({
              name: name,
              link: link,
              date: datee,
              time: time
            });
          });
        });
      }
    });
  }

}
