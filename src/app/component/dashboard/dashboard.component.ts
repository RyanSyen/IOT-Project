
import { Component, OnInit, ElementRef, Injectable, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import Chart from 'chart.js/auto';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Emp } from 'src/app/interfaces/emp';
import { FirebaseService } from 'src/app/firebase.service';
import { GenerateRandService } from 'src/app/services/generate-rand.service';
import { stringLength } from '@firebase/util';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

//* declare js functions
declare const updateBuzzer: any;
declare const updateCamera: any;
declare const updateRelay1: any;
declare const updateRelay2: any;

//* interface 
interface sensorVal {
  humid: string,
  light: string,
  poten: string,
  rand1: string,
  rand2: string,
  sound: string,
  tempe: string
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
// @Injectable({ providedIn: 'root' })


export class DashboardComponent implements OnInit, OnDestroy {

  //* weather
  weatherAPI = "e38e793b0540890a262fbffc0d9c534a";
  url = "https://api.openweathermap.org/data/2.5/weather?";
  celciusMetric = "&units=metric";
  fullURL = "";
  weatherCondition = "clear";
  location = "";
  temp: any;
  humidity: any;
  windSpeed: any;
  feels: any;
  lat: any;
  lng: any;

  //*time
  hours = 0;
  minutes = 0;
  seconds = 0;
  day = "";
  date = "";
  daytime: any;

  //* chart
  chart: any;
  timeSnaphot = "";
  // set as global values for storing and retrieving 
  timeLabel = [''];
  tempValue = [this.generateRandTemp()];
  humidityValue = [this.generateRandHumidity()];

  chart2: any;
  tempValue2 = [this.generateRandTemp()];
  humidityValue2 = [this.generateRandHumidity()];

  chart3: any;
  tempValue3 = [this.generateRandTemp()];
  humidityValue3 = [this.generateRandHumidity()];

  chart4: any;
  tempValue4 = [this.generateRandTemp()];
  humidityValue4 = [this.generateRandHumidity()];

  chart5: any;
  tempValue5 = [this.generateRandTemp()];
  humidityValue5 = [this.generateRandHumidity()];

  chart6: any;
  tempValue6 = [this.generateRandTemp()];
  humidityValue6 = [this.generateRandHumidity()];

  chart7: any;
  tempValue7 = [this.generateRandTemp()];
  humidityValue7 = [this.generateRandHumidity()];

  chart8: any;
  tempValue8 = [this.generateRandTemp()];
  humidityValue8 = [this.generateRandHumidity()];

  chart9: any;
  tempValue9 = [this.generateRandTemp()];
  humidityValue9 = [this.generateRandHumidity()];

  chart10: any;
  tempValue10 = [this.generateRandTemp()];
  humidityValue10 = [this.generateRandHumidity()];


  //* doughnut chart 1
  doughnutChart1: any;


  //* dropdown
  style = {
    'background-color': '#333',
  }
  optionsPanel = {
    'background-color': '#ddd',
  }
  selectedFloor: any;
  currentFloor = 'B2';
  floorName: any[];
  item: string = "";

  //* sensor components
  humidSensor: any;
  humidSensorNormal = true;
  lightSensor: any;
  lightSensorStatus = "inactive";
  potenSensor: any;
  rand1Sensor: any;
  rand2Sensor: any;
  soundSensor: any;
  tempSensor: any;
  tempSensorNormal = true;
  doorbellSensor: any;
  doorbellSensorStatus = "inactive";
  parkingOccupied: any;

  private empCollection: AngularFirestoreCollection<Emp>;
  emps: Observable<Emp[]>;

  subscription: Subscription;

  @Output() messageEvent = new EventEmitter<string>();
  @Output() navigateEvent = new EventEmitter<string>();

  currentCCTVImageURL: any;

  constructor(private localService: LocalService, private elementRef: ElementRef, private db: AngularFireDatabase, private readonly afs: AngularFirestore, private firebaseService: FirebaseService, private randService: GenerateRandService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private router: Router) {

    this.empCollection = this.afs.collection<Emp>('emps');
    this.emps = this.empCollection.valueChanges({ idField: 'customID' });

    //* populate the floor names for drop down selection
    this.floorName = [
      { name: 'B2', code: '1' },
      { name: 'B1', code: '2' },
      { name: 'G', code: '3' },
      { name: 'L1', code: '4' },
      { name: 'L2', code: '5' },
      { name: 'L3', code: '6' },
      { name: 'L4', code: '7' },
      { name: 'L5', code: '8' },
      { name: 'L6', code: '9' },
      { name: 'L7', code: '10' }
    ];

    const ref = this.db.list("OTHER_VALUES");
    const ref1 = this.db.list("OTHER_CONTROL");
    // ref.set('pSpace', 149);
    // ref1.set('doorbell', 0);

    //! get realtime data using snapshotchanges() -> not working properly
    // get realtime data using valueChanges()
    // this.get_emp_records_using_valueChanges();

    this.subscription = this.db.list('CR13_CURRENT').valueChanges().subscribe(res => {

      if (res) {
        //* humidity
        this.humidSensor = res[0];
        this.checkHumidity(this.humidSensor);
        //* lights
        this.soundSensor = res[1];
        //* potentiometer
        this.potenSensor = res[2];
        //* rand1
        this.rand1Sensor = res[3];
        //* rand2
        this.rand2Sensor = res[4];
        //* sound
        this.soundSensor = res[5];
        //* tempe
        this.tempSensor = res[6];
        this.checkTemp(this.tempSensor);
      }
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.startTime();
    this.getLocation();

    // start initializing charts 
    this.createChart();
    this.updateChart();
    this.createDoughnutChart1();

    // get current component status in realtime
    // this.subscription = this.get_current_component_status();

    // get other component status in realtime
    this.get_other_component_status();

    // get other component control in realtime
    this.get_other_component_control();

    this.firebaseService.setAttendance(this.formattedDate());


  }

  startTime() {
    //* date and time
    var today = new Date();
    var hr = today.getHours();
    this.day = (hr < 12) ? "AM" : "PM";
    if (hr > 7 && hr < 19) {
      this.daytime = true;


    } else {
      this.daytime = false;

    }

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
    hr = this.checkTime(hr);
    min = this.checkTime(min);
    sec = this.checkTime(sec);
    this.hours = hr;
    this.minutes = min;
    this.seconds = sec;

    // document.getElementById("clock")!.innerHTML = hr + ":" + min + ":" + sec + " " + ap;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
    this.date = date;
    // document.getElementById("date")!.innerHTML = date;

    var time = setTimeout(() => { this.startTime() }, 500);
  }

  checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.fullURL = this.url + "lat=" + this.lat + "&lon=" + this.lng + this.celciusMetric + "&appid=" + this.weatherAPI;
          // console.log(this.fullURL);
          this.getWeatherData(this.fullURL);
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async getWeatherData(url: any) {
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      // console.log(data);
      this.weatherCondition = data.weather[0].main;
      this.location = data.name + ", " + data.sys.country;
      this.temp = data.main.temp;
      this.humidity = data.main.humidity;
      this.windSpeed = data.wind.speed;
      this.feels = data.main.feels_like;
    } catch {
      console.error("error");
    }
  }

  refresh() {
    this.getLocation();
  }

  createDoughnutChart1() {
    let el = this.elementRef.nativeElement.querySelector(`#MyDoughnutChart1`);
    this.doughnutChart1 = new Chart(el, {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: [
          'AC',
          'Light',
          'Others'
        ],
        datasets: [
          {
            label: "Cost Summary",
            data: [29293.60, 6570, 1694.63],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            borderColor: ''
          }
        ]
      },
      options: {
        // aspectRatio: 0.5 / 0.9,
        plugins: {
          decimation: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Cost Summary in RM',
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
        layout: {
          autoPadding: true,
        }
      }

    });
  }

  createChart() {
    //* first chart
    // this.chart = new Chart("MyChart1", {
    //   type: 'line', //this denotes tha type of chart

    //   data: {// values on X-Axis
    //     labels: this.timeLabel,
    //     datasets: [
    //       {
    //         label: "Temperature",
    //         data: this.tempValue,
    //         backgroundColor: 'blue',
    //         borderColor: 'blue'
    //       },
    //       {
    //         label: "Humidity",
    //         data: this.humidityValue,
    //         backgroundColor: 'limegreen',
    //         borderColor: 'limegreen'
    //       }
    //     ]
    //   },
    //   options: {
    //     aspectRatio: 2.5,
    //     plugins: {
    //       decimation: {
    //         enabled: true,
    //       },
    //       title: {
    //         display: true,
    //         text: 'Temp & Humidity',
    //         padding: {
    //           top: 10,
    //           bottom: 10
    //         },
    //         color: '#ddd',
    //         font: {
    //           size: 18
    //         }
    //       },
    //     },
    //   }

    // });
    // console.log(this.timeLabel, this.tempValue, this.humidityValue, this.currentFloor);
    switch (this.currentFloor) {
      case 'B2':
        //* first chart
        let htmlRef1 = this.elementRef.nativeElement.querySelector(`#MyChart1`);
        this.chart = new Chart(htmlRef1, {
          type: 'line',
          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'B1':
        //* second chart
        let htmlRef2 = this.elementRef.nativeElement.querySelector(`#MyChart2`);
        this.chart2 = new Chart(htmlRef2, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue2,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue2,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'G':
        //* third chart
        let htmlRef3 = this.elementRef.nativeElement.querySelector(`#MyChart3`);
        this.chart3 = new Chart(htmlRef3, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue3,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue3,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L1':
        //* fourth chart
        let htmlRef4 = this.elementRef.nativeElement.querySelector(`#MyChart4`);
        this.chart4 = new Chart(htmlRef4, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue4,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue4,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L2':
        //* fifth chart
        let htmlRef5 = this.elementRef.nativeElement.querySelector(`#MyChart5`);
        this.chart5 = new Chart(htmlRef5, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L3':
        //* sixth chart
        let htmlRef6 = this.elementRef.nativeElement.querySelector(`#MyChart6`);
        this.chart6 = new Chart(htmlRef6, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L4':
        //* seventh chart
        let htmlRef7 = this.elementRef.nativeElement.querySelector(`#MyChart7`);
        this.chart7 = new Chart(htmlRef7, {
          type: 'line',
          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L5':
        //* eighth chart
        let htmlRef8 = this.elementRef.nativeElement.querySelector(`#MyChart8`);
        this.chart8 = new Chart(htmlRef8, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L6':
        //* ninth chart
        let htmlRef9 = this.elementRef.nativeElement.querySelector(`#MyChart9`);
        this.chart9 = new Chart(htmlRef9, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;
      case 'L7':
        //* tenth chart
        let htmlRef10 = this.elementRef.nativeElement.querySelector(`#MyChart10`);
        this.chart10 = new Chart(htmlRef10, {
          type: 'line',

          data: {
            labels: this.timeLabel,
            datasets: [
              {
                label: "Temperature",
                data: this.tempValue,
                backgroundColor: 'blue',
                borderColor: 'blue'
              },
              {
                label: "Humidity",
                data: this.humidityValue,
                backgroundColor: 'limegreen',
                borderColor: 'limegreen'
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
        break;



    }
  }

  updateChart() {
    var floors = [
      {
        name: 'B1',
        chartID: 'this.chart'
      },
      {
        name: 'B2',
        chartID: 'this.chart2'
      },
      {
        name: 'G',
        chartID: 'this.chart3'
      },
      {
        name: 'L1',
        chartID: 'this.chart4'
      },
      {
        name: 'L2',
        chartID: 'this.chart5'
      },
      {
        name: 'L3',
        chartID: 'this.chart6'
      },
      {
        name: 'L4',
        chartID: 'this.chart7'
      },
      {
        name: 'L5',
        chartID: 'this.chart8'
      },
      {
        name: 'L6',
        chartID: 'this.chart9'
      },
      {
        name: 'L7',
        chartID: 'this.chart10'
      }
    ];


    if (this.currentFloor == 'B2') {
      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart.data.datasets[0].data.shift();
        this.chart.data.datasets[1].data.shift();

        // this.timeLabel.shift();
        // this.chart.data.datasets[0].data.shift();
        // this.chart.data.datasets[1].data.shift();
      }

      this.chart.data.labels.push(this.timeSnaphot);
      this.chart.data.datasets[0].data.push(this.generateRandTemp());
      this.chart.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart.update();
    } else if (this.currentFloor == 'B1') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart2.data.datasets[0].data.shift();
        this.chart2.data.datasets[1].data.shift();

      }

      this.chart2.data.labels.push(this.timeSnaphot);
      this.chart2.data.datasets[0].data.push(this.generateRandTemp());
      this.chart2.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart2.update();
    } else if (this.currentFloor == 'G') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart3.data.datasets[0].data.shift();
        this.chart3.data.datasets[1].data.shift();

      }

      this.chart3.data.labels.push(this.timeSnaphot);
      this.chart3.data.datasets[0].data.push(this.generateRandTemp());
      this.chart3.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart3.update();
    } else if (this.currentFloor == 'L1') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart4.data.datasets[0].data.shift();
        this.chart4.data.datasets[1].data.shift();

      }

      this.chart4.data.labels.push(this.timeSnaphot);
      this.chart4.data.datasets[0].data.push(this.generateRandTemp());
      this.chart4.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart4.update();
    } else if (this.currentFloor == 'L2') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart5.data.datasets[0].data.shift();
        this.chart5.data.datasets[1].data.shift();

      }

      this.chart5.data.labels.push(this.timeSnaphot);
      this.chart5.data.datasets[0].data.push(this.generateRandTemp());
      this.chart5.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart5.update();
    } else if (this.currentFloor == 'L3') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart6.data.datasets[0].data.shift();
        this.chart6.data.datasets[1].data.shift();

      }

      this.chart6.data.labels.push(this.timeSnaphot);
      this.chart6.data.datasets[0].data.push(this.generateRandTemp());
      this.chart6.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart6.update();
    } else if (this.currentFloor == 'L4') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart7.data.datasets[0].data.shift();
        this.chart7.data.datasets[1].data.shift();

      }

      this.chart7.data.labels.push(this.timeSnaphot);
      this.chart7.data.datasets[0].data.push(this.generateRandTemp());
      this.chart7.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart7.update();
    } else if (this.currentFloor == 'L5') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart8.data.datasets[0].data.shift();
        this.chart8.data.datasets[1].data.shift();

      }

      this.chart8.data.labels.push(this.timeSnaphot);
      this.chart8.data.datasets[0].data.push(this.generateRandTemp());
      this.chart8.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart8.update();
    } else if (this.currentFloor == 'L6') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart9.data.datasets[0].data.shift();
        this.chart9.data.datasets[1].data.shift();

      }

      this.chart9.data.labels.push(this.timeSnaphot);
      this.chart9.data.datasets[0].data.push(this.generateRandTemp());
      this.chart9.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart9.update();
    } else if (this.currentFloor == 'L7') {

      if (this.timeLabel.length > 4) {
        this.timeLabel.shift();
        this.chart10.data.datasets[0].data.shift();
        this.chart10.data.datasets[1].data.shift();

      }

      this.chart10.data.labels.push(this.timeSnaphot);
      this.chart10.data.datasets[0].data.push(this.generateRandTemp());
      this.chart10.data.datasets[1].data.push(this.generateRandHumidity());
      this.chart10.update();
    }







    var updateChart1 = setTimeout(() => { this.updateChart() }, 2000);
  }

  generateRandTemp() {
    return Math.floor(Math.random() * (30 - 18 + 1) + 18);
  }

  generateRandHumidity() {
    return Math.floor(Math.random() * (95 - 75 + 1) + 75);
  }

  onChange(event: any) {
    console.log(event.value.name)
    if (event != null) {
      this.currentFloor = event.value.name;
      let el = document.getElementById('chartID');
      if (el) {
        this.timeLabel = [];
        if (this.currentFloor == 'B2') {
          el.innerHTML = '<canvas id="MyChart1">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'B1') {
          el.innerHTML = '<canvas id="MyChart2">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'G') {
          el.innerHTML = '<canvas id="MyChart3">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L1') {
          el.innerHTML = '<canvas id="MyChart4">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L2') {
          el.innerHTML = '<canvas id="MyChart5">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L3') {
          el.innerHTML = '<canvas id="MyChart6">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L4') {
          el.innerHTML = '<canvas id="MyChart7">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L5') {
          el.innerHTML = '<canvas id="MyChart8">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L6') {
          el.innerHTML = '<canvas id="MyChart9">{{ chart }}</canvas>';
        } else if (this.currentFloor == 'L7') {
          el.innerHTML = '<canvas id="MyChart10">{{ chart }}</canvas>';
        }
      }
      this.createChart();
    }

  }

  openChart() {
    let el = document.getElementById("MyChart2ID");
    if (el) {
      console.log(el)
      if (el.classList.contains('default-line-chart')) {
        el.classList.remove('default-line-chart');
        el.classList.add("active-line-chart");
      } else {
        el.classList.add('default-line-chart');
        el.classList.remove("active-line-chart");
      }


    }
  }

  resetDoorbell() {
    const ref = this.db.list("OTHER_CONTROL");
    ref.set('doorbell', 0);
  }

  get_current_component_status() {

    const ref = this.db.list("CR13_CURRENT");

    // // 1st method (better as it returns the actual object key)
    // const refSub = ref.snapshotChanges(['child_changed'])
    //   .subscribe(actions => {
    //     actions.forEach(action => {
    //       // console.log(action.type); 
    //       // console.log(action.key); 
    //       // console.log(action.payload.val());
    //       var key = action.key?.toString();
    //       if (key) {
    //         // console.log(key)
    //         if (key == 'humid') {

    //           this.humidSensor = action.payload.val();
    //           this.humidSensor = this.humidSensor * 10;
    //           if (parseInt(this.humidSensor) > 93) {
    //             let el2 = document.getElementById('status2');
    //             el2?.classList.add('inactive');

    //             let el3 = document.getElementById('humidityImg') as HTMLImageElement;
    //             el3.src = "../../../assets/dashboard/very-humid.png";
    //           } else {
    //             let el22 = document.getElementById('status2');
    //             el22?.classList.remove('inactive');
    //             let el33 = document.getElementById('humidityImg') as HTMLImageElement;
    //             console.log(el33.src);
    //             el33.src = "../../../assets/dashboard/normal-humid.png";
    //           }
    //         } else if (key == 'sound') {
    //           this.soundSensor = action.payload.val();
    //         } else if (key == 'light') {
    //           this.lightSensor = action.payload.val();

    //           // using light sensor values
    //           // if (parseInt(this.lightSensor) == 1) {
    //           //   let el = document.getElementById('status4');
    //           //   el?.classList.remove('inactive');
    //           //   this.lightSensorStatus = "active";
    //           //   let el1 = document.getElementById('lamppostImg') as HTMLImageElement;
    //           //   el1.src = "../../../assets/dashboard/empty.png";
    //           // } else {
    //           //   let el = document.getElementById('status4');
    //           //   el?.classList.add('inactive');
    //           //   this.lightSensorStatus = "inactive";
    //           //   let el1 = document.getElementById('lamppostImg') as HTMLImageElement;
    //           //   el1.src = "../../../assets/dashboard/light.png";
    //           // }

    //         } else if (key == 'poten') {
    //           this.potenSensor = action.payload.val();
    //         } else if (key == 'rand1') {
    //           this.rand1Sensor = action.payload.val();
    //         } else if (key == 'rand2') {
    //           this.rand2Sensor = action.payload.val();
    //         } else if (key == 'tempe') {
    //           this.tempSensor = action.payload.val();
    //           if (parseInt(this.tempSensor) > 38) {
    //             let el = document.getElementById('status1');
    //             el?.classList.add('inactive');

    //             let el1 = document.getElementById('tempImg') as HTMLImageElement;
    //             el1.src = "../../../assets/dashboard/hot.png";
    //           } else {
    //             let el = document.getElementById('status1');
    //             el?.classList.remove('inactive');

    //             let el1 = document.getElementById('tempImg') as HTMLImageElement;
    //             el1.src = "../../../assets/dashboard/cool.png";
    //           }
    //         }
    //       }
    //     });
    //   });

    // 2nd method (does not return the actual key name)
    // this.db.list<sensorVal>('CR13_CURRENT').valueChanges().subscribe((res: sensorVal[]) => {
    this.db.list('CR13_CURRENT').valueChanges().subscribe(res => {

      if (res) {
        //* humidity
        this.humidSensor = res[0];
        this.checkHumidity(this.humidSensor);
        //* lights
        this.soundSensor = res[1];
        //* potentiometer
        this.potenSensor = res[2];
        //* rand1
        this.rand1Sensor = res[3];
        //* rand2
        this.rand2Sensor = res[4];
        //* sound
        this.soundSensor = res[5];
        //* tempe
        this.tempSensor = res[6];
        this.checkTemp(this.tempSensor);
      }
    });
  }

  checkHumidity(val: string) {
    let value = parseInt(val);
    if (value > 65) {
      //* update common resources
      updateBuzzer('1');
      updateRelay2('1');
      updateCamera('1');
      setTimeout(() => {
        updateBuzzer('0');
        updateRelay2('0');
      }, 10500);
      let el2 = document?.getElementById('status2');
      el2?.classList.add('inactive');
      let el3 = document?.getElementById('humidityImg') as HTMLImageElement;
      el3.src = "../../../assets/dashboard/very-humid.png";
    } else {
      let el22 = document?.getElementById('status2');
      el22?.classList.remove('inactive');
      let el33 = document?.getElementById('humidityImg') as HTMLImageElement;
      // console.log(el33.src);
      if (el33.src) {
        el33.src = "../../../assets/dashboard/normal-humid.png";
      }

    }
  }

  checkTemp(temp: string) {
    let val = parseInt(temp);
    if (val > 38) {
      //* update common resources
      updateBuzzer('1');
      updateRelay2('1');
      updateCamera('1');
      setTimeout(() => {
        updateBuzzer('0');
        updateRelay2('0');
      }, 10500);

      let el = document.getElementById('status1');
      el?.classList.add('inactive');
      let el1 = document?.getElementById('tempImg') as HTMLImageElement;
      el1.src = "../../../assets/dashboard/hot.png";
    } else {
      let el = document.getElementById('status1');
      el?.classList.remove('inactive');

      let el1 = document?.getElementById('tempImg') as HTMLImageElement;
      el1!.src = "../../../assets/dashboard/cool.png";
    }
  }

  get_other_component_status() {
    // get parking space value

    const ref1 = this.db.list("OTHER_VALUES/pSpace");
    ref1.snapshotChanges(['child_changed'])
      .subscribe(actions => {
        actions.forEach(action => {
          // console.log(action.type); 
          // console.log(action.key); 
          // console.log(action.payload.val());
          var key = action.key?.toString();
          if (key) {
            if (key == 'total') {
              this.parkingOccupied = action.payload.val();

              if (this.parkingOccupied > 149) {
                //* update common resources
                updateBuzzer('1');
                updateRelay2('1');
                updateCamera('1')
                setTimeout(() => {
                  updateBuzzer('0');
                  updateRelay2('0');
                }, 10500);

                let el = document.getElementById('status3');
                el?.classList.add('inactive');

                let el1 = document.getElementById('parkingImg') as HTMLImageElement;
                el1.src = "../../../assets/dashboard/full.png";
              } else {
                let el = document.getElementById('status3');
                el?.classList.remove('inactive');

                let el1 = document.getElementById('parkingImg') as HTMLImageElement;
                el1.src = "../../../assets/dashboard/park.png";
              }
            }
          }
        });
      });

    // get day status
    if (this.daytime == true) {
      // off lamp post light
      let el4 = document.getElementById('status4');
      el4?.classList.remove('inactive');

      this.lightSensorStatus = "inactive";
      let el11 = document.getElementById('lamppostImg') as HTMLImageElement;
      el11.src = "../../../assets/dashboard/empty.png";
    } else {
      this.lightSensorStatus = "active";
      // on lamp post light
      let el5 = document.getElementById('status4');
      el5?.classList.add('inactive');

      let el12 = document.getElementById('lamppostImg') as HTMLImageElement;
      el12.src = "../../../assets/dashboard/light.png";
    }
  }
  get_other_component_control() {
    // control doorbell value
    const ref2 = this.db.list("OTHER_CONTROL");
    ref2.snapshotChanges(['child_changed'])
      .subscribe(actions => {
        actions.forEach(action => {
          // console.log(action.type); 
          // console.log(action.key); 
          // console.log(action.payload.val());
          var key = action.key?.toString();
          if (key) {
            if (key == 'doorbell') {
              this.doorbellSensor = action.payload.val();
              if (parseInt(this.doorbellSensor) == 1) {
                //* get current CCTV from report
                this.firebaseService.getCurrentCCTVImage().subscribe(res => {
                  res.forEach(element => {
                    this.currentCCTVImageURL = element;
                    // this.openImage(element);
                  });

                })
                //* update common resources
                updateBuzzer('1');
                updateRelay2('1');
                updateCamera('1');
                setTimeout(() => {
                  updateBuzzer('0');
                  updateRelay2('0');
                }, 10500);
                this.doorbellSensorStatus = 'active';
                let el = document.getElementById('status5');
                el?.classList.add('inactive');

                let el1 = document.getElementById('doorbellImg') as HTMLImageElement;
                el1.src = "../../../assets/dashboard/alert-edited.gif";

                // apply toast
                //! cannot apply toast because you need to update the page by calling the function 
                this.showConfirm();

                // play audio
                var audio = document.createElement("audio");

                audio.src = "../../../assets/dashboard/doorbell.mp3";
                audio.muted = true;
                // console.log(audio.src)

                const interval = setInterval(function () {
                  audio.muted = false;
                  audio.play()
                }, 2500);

                audio.addEventListener("canplaythrough", function () {
                  setTimeout(function () {
                    clearInterval(interval);
                    audio.pause();
                  }, 10000);
                }, false);



                setTimeout(() => {
                  // reset doorbell
                  this.resetDoorbell();
                  el?.classList.remove('inactive');
                  el1.src = "../../../assets/dashboard/inactive-bell.png";
                }, 10500);


              } else {
                this.doorbellSensorStatus = 'inactive';
                let el = document.getElementById('status5');
                el?.classList.remove('inactive');

                let el1 = document.getElementById('doorbellImg') as HTMLImageElement;
                if (el1.src) {
                  el1.src = "../../../assets/dashboard/inactive-bell.png";
                }
              }
            }
          }
        });
      });
  }
  get_emp_records_using_snapshotchanges() { // not working properly, need to research more on this
    // https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md#snapshotchanges
    this.emps = this.empCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Emp;
        const id = a.payload.doc.id;
        // return { id, ...data };
        console.log(id + " " + data);
        return { ...data };
      }))
    );
  }
  get_emp_records_using_valueChanges() {

    this.emps.subscribe(res => {
      // console.log(res);
    })
  }

  formattedDate() {
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = [today.getMonth() + 1].toString();
    let yyyy = today.getFullYear();
    if (parseInt(dd) < 10) {
      dd = '0' + dd;
    }

    if (parseInt(mm) < 10) {
      mm = '0' + mm;
    }
    let formattedDate = yyyy + mm + dd;
    return formattedDate;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Check CCTV' });
  }

  onConfirm() {

    this.messageEvent.emit('doorbell')
    this.openImage(this.currentCCTVImageURL);
    this.messageService.clear('c');

  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  navigateToDoorbellPage() {
    this.router.navigate(['/sidemenu']);
  }

  openImage(url: any) {
    var largeImage = document.getElementById('targetImg');
    largeImage!.style.display = 'block';
    largeImage!.style.width = 200 + "px";
    largeImage!.style.height = 200 + "px";
    window.open(url, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
  }

}
