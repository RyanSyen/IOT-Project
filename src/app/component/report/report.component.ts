import { GenerateRandService } from 'src/app/services/generate-rand.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { LocalService } from 'src/app/services/local.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Chart from 'chart.js/auto';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})


export class ReportComponent implements OnInit {

  modules: any[] = [];
  activeFloor: any;
  visible = true;
  activeModule: any;
  parking: any[] = [];
  date: Date | undefined;
  dates: any;
  startDate = '2022-09-01';
  endDate = '2022-12-31';
  floorData: any;
  selectedDate = '';
  totalKWalts = '';
  cost = '';
  costSaved = '';
  chart: any;
  carPark: any;
  hour: any;
  occupied: any[] = [];

  status = '';
  imgArr: any[] = [];
  test: any[] = [];
  fileDate = "";
  img: any;
  profileUrl: Observable<string | null> | undefined;
  fileUploads: any;


  constructor(private firebase: FirebaseService, private rand: GenerateRandService, private local: LocalService, private db: AngularFireDatabase, private elementRef: ElementRef, private storage: AngularFireStorage) {
    // this.db.list("report/ventilation").snapshotChanges().subscribe(res => {
    //   this.dates = res;
    // })

    this.firebase.getDoorBellStatus().subscribe(res => {
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
    this.modules = [
      { label: 'Ventilation', icon: 'pi pi-fw pi-sun' },
      { label: 'Parking', icon: 'pi pi-fw pi-car' },
      { label: 'Attendance', icon: 'pi pi-fw pi-users' },
      { label: 'Doorbell', icon: 'pi pi-fw pi-camera' }
    ];
    this.activeModule = this.modules[0].label;

    // populate report
    // this.firebase.populateVentilationReport();

    this.getFileDetails();


  }

  activateMenu(event: any) {
    if (event.activeItem.label == 'Ventilation') {
      this.activeModule = this.modules[0].label;
    } else if (event.activeItem.label == 'Parking') {
      this.activeModule = this.modules[1].label;
    } else if (event.activeItem.label == 'Attendance') {
      this.activeModule = this.modules[2].label;
    } else if (event.activeItem.label == 'Doorbell') {
      this.activeModule = this.modules[3].label;
    }
  }

  getDate(val: any) {
    console.log(val.inputFieldValue)
    // const result = new Date(val.inputFieldValue).toLocaleDateString('en-GB');
    // let formatedDate = result.replace(/\//g, "_");

    const formatedDate = this.local.convertDateFormat(val.inputFieldValue);
    this.selectedDate = formatedDate;
    // if date is larger than today date then dont show table
    let todayDate = this.local.getDateTime();
    console.log(todayDate)
    // var selectedDate = this.firebase.parseDate(formatedDate)
    // var currentDate = this.firebase.parseDate(todayDate)
    if (formatedDate <= todayDate) {
      this.visible = false;
      this.db.list("report/ventilation/" + formatedDate).snapshotChanges().subscribe(res => {
        // console.log(res)
        this.dates = res;
        res.forEach((element: any) => {
          let total = [];
          total.push(element.payload.val().kWalts)
          let totalKWalts = total.reduce((partialSum, a) => partialSum + a, 0);
          this.totalKWalts = totalKWalts;
          let result = (totalKWalts * 36.5 / 100).toFixed(2)
          this.cost = result;
          this.costSaved = (13.73 - parseInt(this.cost)).toFixed(2);

        });
      })
    } else {
      this.visible = true;
    }
  }

  getDate1(val: any) {
    // console.log(val.inputFieldValue)
    // const result = new Date(val.inputFieldValue).toLocaleDateString('en-GB');
    // let formatedDate = result.replace(/\//g, "_");
    this.occupied = [];
    const formatedDate = this.local.convertDateFormat(val.inputFieldValue);
    this.selectedDate = formatedDate;
    // if date is larger than today date then dont show table
    let todayDate = this.local.getDateTime();
    // console.log(todayDate)
    // var selectedDate = this.firebase.parseDate(formatedDate)
    // var currentDate = this.firebase.parseDate(todayDate)
    if (formatedDate <= todayDate) {
      this.visible = false;
      this.db.list("report/parking/" + formatedDate).snapshotChanges().subscribe(res => {
        // console.log(res)
        this.carPark = res;
        res.forEach((element: any) => {
          // let total = [];
          // total.push(element.payload.val().kWalts)
          // this.hour.push(element.payload.val().hour)
          this.occupied.push(element.payload.val().occupied)
          // let totalKWalts = total.reduce((partialSum, a) => partialSum + a, 0);
          // this.totalKWalts = totalKWalts;
          // let result = (totalKWalts * 36.5 / 100).toFixed(2)
          // this.cost = result;
          // this.costSaved = (13.73 - parseInt(this.cost)).toFixed(2);

        });

        this.createDoughnutChart1();
      })
    } else {
      this.visible = true;
      this.chart.destroy();
    }
  }

  getDate2(val: any) {
    this.occupied = [];
    const formatedDate = this.local.convertDateFormat(val.inputFieldValue);
    this.selectedDate = formatedDate;
    // if date is larger than today date then dont show table
    let todayDate = this.local.getDateTime();
    if (formatedDate <= todayDate) {
      this.visible = false;
      this.db.list("report/attendance/" + formatedDate).snapshotChanges().subscribe(res => {
        // console.log(res)
        this.carPark = res;
        res.forEach((element: any) => {
          this.occupied.push(element.payload.val().occupied)

        });

        this.createDoughnutChart1();
      })
    } else {
      this.visible = true;
      this.chart.destroy();
    }
  }

  createDoughnutChart1() {
    let time = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    // check and destroy the chart instance (if any) before creating a new one
    if (this.chart) this.chart.destroy();
    let el = this.elementRef.nativeElement.querySelector(`#MyDoughnutChart1`);
    this.chart = new Chart(el, {
      type: 'line',
      data: {
        labels: time,
        datasets: [
          {
            label: "Car Park",
            data: this.occupied,
            backgroundColor: 'blue',
            borderColor: 'blue'
          },
        ]
      },
      options: {
        // aspectRatio: 2.5,
        plugins: {
          decimation: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Parking Space Summary',
            padding: {
              top: 10,
              bottom: 10
            },
            color: '#ddd',
            font: {
              size: 18
            }
          },
        },
      }


    });
  }

  getFileDetails() {
    let date = this.local.getDateTime();
    // console.log(date)
    const ref = this.storage.ref('');
    let myurlsubscription = ref.listAll().subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let size = data.items.length;
        // let currentImg = data.items[size].link;

        let name = data.items[i].name;
        let newref = this.storage.ref(data.items[i].name);
        let currentImgRef = this.storage.ref(data.items[size - 1].name);
        currentImgRef.getDownloadURL().subscribe((val) => {
          //* this displays the latest img url
          const ref = this.db.list("CCTV");
          ref.set("latestImage", val)
          console.log(val)
          //* open image in new window
          // this.openImg(val);
        })
        let url = newref.getDownloadURL().subscribe((data) => {
          // console.log(data)
          let link = data;
          let date = newref.getMetadata().subscribe((data) => {
            // console.log(data)
            // console.log("name = " + data.name + "date = " + data.timeCreated)
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

      this.test.forEach(element => {
        console.log(element)
        console.log(Object.keys(this.test));
      })

    });
  }

  openImg(url: any) {
    // console.log(typeof (this.test), this.test)

    // let val = await this.test;
    // await console.log(Object.keys(val));
    // for (var key in val) {
    //   console.log(key);
    //   console.log(val[key]);
    // }
    // val.forEach(element => {
    //   console.log(element)
    //   console.log(Object.keys(this.test));
    // })

    // let index = this.test.length;
    var largeImage = document.getElementById('targetImg');
    largeImage!.style.display = 'block';
    largeImage!.style.width = 200 + "px";
    largeImage!.style.height = 200 + "px";
    // // var url = largeImage!.getAttribute('src');
    // var url = this.test[index - 1].link;
    // // console.log(url)
    window.open(url, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
  }

  sendDisplayCCTVImage(val: any) {

  }
}
