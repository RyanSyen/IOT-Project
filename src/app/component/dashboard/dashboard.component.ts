import { Component, OnInit } from '@angular/core';
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

  constructor(private localService: LocalService) {

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
    this.doughnutChart1 = new Chart("MyDoughnutChart1", {
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

    switch (this.currentFloor) {
      case 'B2':
        //* first chart
        this.chart = new Chart("MyChart1", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart2 = new Chart("MyChart2", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart3 = new Chart("MyChart3", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart4 = new Chart("MyChart4", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart5 = new Chart("MyChart5", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart6 = new Chart("MyChart6", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart7 = new Chart("MyChart7", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart8 = new Chart("MyChart8", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart9 = new Chart("MyChart9", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        this.chart10 = new Chart("MyChart10", {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
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
        chartID: this.chart
      },
      {
        name: 'B2',
        chartID: this.chart2
      },
      {
        name: 'G',
        chartID: this.chart3
      },
      {
        name: 'L1',
        chartID: this.chart4
      },
      {
        name: 'L2',
        chartID: this.chart5
      },
      {
        name: 'L3',
        chartID: this.chart6
      },
      {
        name: 'L4',
        chartID: this.chart7
      },
      {
        name: 'L5',
        chartID: this.chart8
      },
      {
        name: 'L6',
        chartID: this.chart9
      },
      {
        name: 'L7',
        chartID: this.chart10
      }
    ];
    var chartid: any;

    if (this.timeLabel.length > 5) {
      floors.forEach(element => {
        if (this.currentFloor == element.name) {
          chartid = element.chartID;
          console.log(chartid)
          chartid.data.datasets[0].data.shift();
          chartid.data.datasets[1].data.shift();
          chartid.data.labels.shift();
        }
      });
      // this.chart.data.datasets[0].data.shift();
      // this.chart.data.datasets[1].data.shift();
      // this.chart.data.labels.shift();
    }

    chartid.data.labels.push(this.timeSnaphot);
    chartid.data.datasets[0].data.push(this.generateRandTemp());
    chartid.data.datasets[1].data.push(this.generateRandHumidity());
    chartid.update();
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
      this.createChart();
    }

  }

}
