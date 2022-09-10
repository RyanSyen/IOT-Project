import { Component, OnInit, ElementRef } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

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

  constructor(private localService: LocalService, private elementRef: ElementRef) {

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
  }

  ngOnInit(): void {
    this.startTime();
    this.getLocation();

    // start initializing charts 
    this.createChart();
    this.updateChart();
    this.createDoughnutChart1();

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

    this.timeSnaphot = hr + ":" + min + ":" + sec;
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
        console.log("test");
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
      // case 'G':
      //   //* third chart
      //   let htmlRef3 = this.elementRef.nativeElement.querySelector(`#MyChart3`);
      //   this.chart3 = new Chart(htmlRef3, {
      //     type: 'line',

      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue3,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue3,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L1':
      //   //* fourth chart
      //   let htmlRef4 = this.elementRef.nativeElement.querySelector(`#MyChart4`);
      //   this.chart4 = new Chart(htmlRef4, {
      //     type: 'line',

      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue4,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue4,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L2':
      //   //* fifth chart
      //   let htmlRef5 = this.elementRef.nativeElement.querySelector(`#MyChart5`);
      //   this.chart5 = new Chart(htmlRef5, {
      //     type: 'line',

      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L3':
      //   //* sixth chart
      //   let htmlRef6 = this.elementRef.nativeElement.querySelector(`#MyChart6`);
      //   this.chart6 = new Chart(htmlRef6, {
      //     type: 'line',

      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L4':
      //   //* seventh chart
      //   let htmlRef7 = this.elementRef.nativeElement.querySelector(`#MyChart7`);
      //   this.chart7 = new Chart(htmlRef7, {
      //     type: 'line',
      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L5':
      //   //* eighth chart
      //   let htmlRef8 = this.elementRef.nativeElement.querySelector(`#MyChart8`);
      //   this.chart8 = new Chart(htmlRef8, {
      //     type: 'line',

      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L6':
      //   //* ninth chart
      //   let htmlRef9 = this.elementRef.nativeElement.querySelector(`#MyChart9`);
      //   this.chart9 = new Chart(htmlRef9, {
      //     type: 'line',

      //     data: {
      //       labels: this.timeLabel,
      //       datasets: [
      //         {
      //           label: "Temperature",
      //           data: this.tempValue,
      //           backgroundColor: 'blue',
      //           borderColor: 'blue'
      //         },
      //         {
      //           label: "Humidity",
      //           data: this.humidityValue,
      //           backgroundColor: 'limegreen',
      //           borderColor: 'limegreen'
      //         }
      //       ]
      //     },
      //     options: {
      //       aspectRatio: 2.5,
      //       plugins: {
      //         decimation: {
      //           enabled: true,
      //         },
      //         title: {
      //           display: true,
      //           text: 'Temp & Humidity',
      //           padding: {
      //             top: 10,
      //             bottom: 10
      //           },
      //           color: '#ddd',
      //           font: {
      //             size: 18
      //           }
      //         },
      //       },
      //     }

      //   });
      //   break;
      // case 'L7':
      // //* tenth chart
      // let htmlRef10 = this.elementRef.nativeElement.querySelector(`#MyChart10`);
      // this.chart10 = new Chart(htmlRef10, {
      //   type: 'line',

      //   data: {
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
      // break;



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
    }







    var updateChart1 = setTimeout(() => { this.updateChart() }, 2000);
  }

  generateRandTemp() {
    return Math.floor(Math.random() * (35 - 25 + 1) + 25);
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

}
