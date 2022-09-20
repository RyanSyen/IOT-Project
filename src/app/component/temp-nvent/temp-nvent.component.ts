import { onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Component, Injectable, OnInit, ElementRef } from '@angular/core';
import { Floor } from 'src/app/interfaces/floor';
import { LocalService } from 'src/app/services/local.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { GenerateRandService } from 'src/app/services/generate-rand.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-temp-nvent',
  templateUrl: './temp-nvent.component.html',
  styleUrls: ['./temp-nvent.component.scss']
})

export class TempNventComponent implements OnInit {

  //* floor details
  floorDet: Floor[] = [];
  max = 100;
  min = 90;

  private utilitiesCollection: AngularFirestoreCollection<any>;
  utilities: Observable<any>;

  //* chart

  timeSnaphot = "";
  // set as global values for storing and retrieving 

  b2chart: any;
  tempValue = [this.randService.generateRandTemp()];
  humidityValue = [this.randService.generateRandHumidity()];
  timeLabel1 = [''];
  color1: any[] = this.randService.generateRandColor() ?? [];

  b1chart: any;
  tempValue2 = [this.randService.generateRandTemp()];
  humidityValue2 = [this.randService.generateRandHumidity()];
  timeLabel2 = [''];
  color2: any[] = this.randService.generateRandColor() ?? [];

  gchart: any;
  tempValue3 = [this.randService.generateRandTemp()];
  humidityValue3 = [this.randService.generateRandHumidity()];
  timeLabel3 = [''];
  color3: any[] = this.randService.generateRandColor() ?? [];

  l1chart: any;
  tempValue4 = [this.randService.generateRandTemp()];
  humidityValue4 = [this.randService.generateRandHumidity()];
  timeLabel4 = [''];
  color4: any[] = this.randService.generateRandColor() ?? [];

  l2chart: any;
  tempValue5 = [this.randService.generateRandTemp()];
  humidityValue5 = [this.randService.generateRandHumidity()];
  timeLabel5 = [''];
  color5: any[] = this.randService.generateRandColor() ?? [];

  l3chart: any;
  tempValue6 = [this.randService.generateRandTemp()];
  humidityValue6 = [this.randService.generateRandHumidity()];
  timeLabel6 = [''];
  color6: any[] = this.randService.generateRandColor() ?? [];

  l4chart: any;
  tempValue7 = [this.randService.generateRandTemp()];
  humidityValue7 = [this.randService.generateRandHumidity()];
  timeLabel7 = [''];
  color7: any[] = this.randService.generateRandColor() ?? [];

  l5chart: any;
  tempValue8 = [this.randService.generateRandTemp()];
  humidityValue8 = [this.randService.generateRandHumidity()];
  timeLabel8 = [''];
  color8: any[] = this.randService.generateRandColor() ?? [];

  l6chart: any;
  tempValue9 = [this.randService.generateRandTemp()];
  humidityValue9 = [this.randService.generateRandHumidity()];
  timeLabel9 = [''];
  color9: any[] = this.randService.generateRandColor() ?? [];

  l7chart: any;
  tempValue10 = [this.randService.generateRandTemp()];
  humidityValue10 = [this.randService.generateRandHumidity()];
  timeLabel10 = [''];
  color10: any[] = this.randService.generateRandColor() ?? [];

  testChart: any;
  testTempValue = [this.randService.generateRandTemp()];
  testHumidityValue = [this.randService.generateRandHumidity()];
  timeLabeltest = [''];

  constructor(private localService: LocalService, private readonly afs: AngularFirestore, private randService: GenerateRandService, private elementRef: ElementRef) {
    this.utilitiesCollection = afs.collection<any>('utilities');
    this.utilities = this.utilitiesCollection.valueChanges({ idField: 'id' });

    this.get_util_records_using_valueChanges();
  }

  ngOnInit(): void {
    // populate data to firestore from local json file
    // this.localService.getFloorFromJson().then(data => {
    //   this.floorDet = data;
    //   this.updateData();

    //   this.floorDet.forEach(element => {
    //     this.utilitiesCollection.doc(element.name).set(element);
    //   });
    // });
    this.startTime();
    this.runCharts();

    const color1 = this.randService.generateRandColor();
    let arr: any[] = this.randService.generateRandColor() ?? [];
    // arr = color1;
    console.log(arr)
    const [first, second] = [...arr];
    console.log(first, second);
  }

  startTime() {
    //* date and time
    var today = new Date();
    var hr = today.getHours();
    // this.day = (hr < 12) ? "AM" : "PM";
    // if (hr > 7 && hr < 19) {
    //   this.daytime = true;


    // } else {
    //   this.daytime = false;

    // }

    var min = today.getMinutes();
    var sec = today.getSeconds();

    if (min < 10) {
      var minutes = "0" + min;
      if (sec < 10) {
        var seconds = "0" + sec;
        this.timeSnaphot = hr + ":" + minutes + ":" + seconds;
      } else {
        this.timeSnaphot = hr + ":" + minutes + ":" + sec;
      }
    } else {
      if (sec < 10) {
        var seconds = "0" + sec;
        this.timeSnaphot = hr + ":" + min + ":" + seconds;
      } else {
        this.timeSnaphot = hr + ":" + min + ":" + sec;
      }
      this.timeSnaphot = hr + ":" + min + ":" + sec;
    }

    // this.timeLabel.push(this.timeSnaphot);
    var ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;

    //Add a zero in front of numbers<10
    // hr = this.checkTime(hr);
    // min = this.checkTime(min);
    // sec = this.checkTime(sec);
    // this.hours = hr;
    // this.minutes = min;
    // this.seconds = sec;

    // document.getElementById("clock")!.innerHTML = hr + ":" + min + ":" + sec + " " + ap;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
    // this.date = date;
    // document.getElementById("date")!.innerHTML = date;

    var time = setTimeout(() => { this.startTime() }, 500);
  }

  generateRandNumLightBulbs() {
    console.log("random is running")
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }

  get_util_records_using_valueChanges() {

    this.utilities.subscribe(res => {
      // console.log(res);
      this.floorDet = res;
    })
  }

  createChartB2() {
    const [first, second] = [...this.color1];

    let htmlRef1 = this.elementRef.nativeElement.querySelector(`#b2chart`);
    this.b2chart = new Chart(htmlRef1, {
      type: 'line',
      data: {
        labels: this.timeLabel1,
        datasets: [
          {
            label: "Temperature",
            data: this.tempValue,
            backgroundColor: first,
            borderColor: first
          },
          {
            label: "Humidity",
            data: this.humidityValue,
            backgroundColor: second,
            borderColor: second
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          decimation: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Temp & Humidity',
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

  createChartB1() {

    const [first, second] = [...this.color2];

    let b1chart = this.elementRef.nativeElement.querySelector(`#b1chart`);
    this.b1chart = new Chart(b1chart, {
      type: 'line',
      data: {
        labels: this.timeLabel2,
        datasets: [
          {
            label: "Temperature",
            data: this.tempValue2,
            backgroundColor: first,
            borderColor: first
          },
          {
            label: "Humidity",
            data: this.humidityValue2,
            backgroundColor: second,
            borderColor: second
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          decimation: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Temp & Humidity',
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

  createChartG() {
    const [first, second] = [...this.color3];

    let gchart = this.elementRef.nativeElement.querySelector(`#gchart`);
    this.gchart = new Chart(gchart, {
      type: 'line',
      data: {
        labels: this.timeLabel3,
        datasets: [
          {
            label: "Temperature",
            data: this.tempValue3,
            backgroundColor: first,
            borderColor: first
          },
          {
            label: "Humidity",
            data: this.humidityValue3,
            backgroundColor: second,
            borderColor: second
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          decimation: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Temp & Humidity',
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

  createChartL1() {
    const [first, second] = [...this.color4];

    let l1chart = this.elementRef.nativeElement.querySelector(`#l1chart`);
    this.l1chart = new Chart(l1chart, {
      type: 'line',
      data: {
        labels: this.timeLabel4,
        datasets: [
          {
            label: "Temperature",
            data: this.tempValue4,
            backgroundColor: first,
            borderColor: first
          },
          {
            label: "Humidity",
            data: this.humidityValue4,
            backgroundColor: second,
            borderColor: second
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          decimation: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Temp & Humidity',
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

  runCharts() {
    this.createChartB2();
    this.updateChartB2();
    this.createChartB1();
    this.updateChartB1();
    this.createChartG();
    this.updateChartG();
    this.createChartL1();
    this.updateChartL1();
  }

  updateChartB2() {
    if (this.timeLabel1.length > 4) {
      this.timeLabel1.shift();
      this.b2chart.data.datasets[0].data.shift();
      this.b2chart.data.datasets[1].data.shift();
    }

    this.b2chart.data.labels.push(this.timeSnaphot);
    this.b2chart.data.datasets[0].data.push(this.randService.generateRandTemp());
    this.b2chart.data.datasets[1].data.push(this.randService.generateRandHumidity());

    var update = setTimeout(() => { this.updateChartB2() }, 2000);
  }

  updateChartB1() {
    if (this.timeLabel2.length > 4) {
      this.timeLabel2.shift();
      this.b1chart.data.datasets[0].data.shift();
      this.b1chart.data.datasets[1].data.shift();
    }

    this.b1chart.data.labels.push(this.timeSnaphot);
    this.b1chart.data.datasets[0].data.push(this.randService.generateRandTemp());
    this.b1chart.data.datasets[1].data.push(this.randService.generateRandHumidity());
    this.b1chart.update();
    this.b2chart.update();

    var update = setTimeout(() => { this.updateChartB1() }, 2000);
  }

  updateChartG() {
    if (this.timeLabel3.length > 4) {
      this.timeLabel3.shift();
      this.gchart.data.datasets[0].data.shift();
      this.gchart.data.datasets[1].data.shift();
    }

    this.gchart.data.labels.push(this.timeSnaphot);
    this.gchart.data.datasets[0].data.push(this.randService.generateRandTemp());
    this.gchart.data.datasets[1].data.push(this.randService.generateRandHumidity());
    this.gchart.update();
    this.gchart.update();

    var update = setTimeout(() => { this.updateChartG() }, 2000);
  }

  updateChartL1() {
    if (this.timeLabel4.length > 4) {
      this.timeLabel4.shift();
      this.l1chart.data.datasets[0].data.shift();
      this.l1chart.data.datasets[1].data.shift();
    }

    this.l1chart.data.labels.push(this.timeSnaphot);
    this.l1chart.data.datasets[0].data.push(this.randService.generateRandTemp());
    this.l1chart.data.datasets[1].data.push(this.randService.generateRandHumidity());
    this.l1chart.update();
    this.l1chart.update();

    var update = setTimeout(() => { this.updateChartL1() }, 2000);
  }

}
