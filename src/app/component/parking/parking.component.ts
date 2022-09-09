// import { Label } from 'ng2-charts';
import { Component, OnInit, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {

  //*time
  hours = 0;
  minutes = 0;
  seconds = 0;
  day = "";
  date = "";
  daytime: any;
  timeSnaphot = "";

  //* doughnut chart 1
  doughnutChart1: any;
  chart: any;

  timeLabel = [''];
  tempValue = [this.generateRandTemp()];
  humidityValue = [this.generateRandHumidity()];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.createDoughnutChart1();
    this.startTime();
    this.updateChart();
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
    // console.log(this.timeLabel)
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

  createDoughnutChart1() {
    let htmlRef1 = this.elementRef.nativeElement.querySelector(`#MyChart1`);
    this.chart = new Chart(htmlRef1, {
      type: 'line',

      // data: {
      //   labels: [
      //     'AC',
      //     'Light',
      //     'Others'
      //   ],
      //   datasets: [
      //     {
      //       label: "Cost Summary",
      //       data: [29293.60, 6570, 1694.63],
      //       backgroundColor: [
      //         'rgb(255, 99, 132)',
      //         'rgb(54, 162, 235)',
      //         'rgb(255, 205, 86)'
      //       ],
      //       hoverOffset: 4,
      //       borderColor: ''
      //     }
      //   ]
      // },
      // options: {
      //   // aspectRatio: 0.5 / 0.9,
      //   plugins: {
      //     decimation: {
      //       enabled: true,
      //     },
      //     title: {
      //       display: true,
      //       text: 'Cost Summary in RM',
      //       padding: {
      //         top: 10,
      //         bottom: 10
      //       },
      //       color: '#ddd',
      //       font: {
      //         size: 18
      //       }
      //     },
      //   },
      //   layout: {
      //     autoPadding: true,
      //   }
      // }

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
        // aspectRatio: 2.5,
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

  updateChart() {

    var chartid: any;

    console.log(this.timeLabel.length);

    if (this.timeLabel.length > 4) {
      // floors.forEach(element => {
      //   if (this.currentFloor == element.name) {
      //     chartid = element.chartID;
      //     console.log(chartid)
      //     chartid.data.datasets[0].data.shift();
      //     chartid.data.datasets[1].data.shift();
      //     chartid.data.labels.shift();
      //   } else {
      //     console.log("error")
      //   }
      // });
      console.log("true")
      // this.chart.data.labels.shift();
      this.timeLabel.shift();
      this.chart.data.datasets[0].data.shift();
      this.chart.data.datasets[1].data.shift();
      // this.chart.data.labels.shift();
      // this.chart.update();
    }
    console.log("run when less than 5")

    this.chart.data.labels.push(this.timeSnaphot);
    // console.log(this.chart.data.labels)
    this.chart.data.datasets[0].data.push(this.generateRandTemp());
    console.log(this.chart.data.datasets[0].data)
    this.chart.data.datasets[1].data.push(this.generateRandHumidity());
    console.log(this.chart.data.datasets[1].data)
    this.chart.update();





    var updateChart1 = setTimeout(() => { this.updateChart() }, 2000);
  }

  generateRandTemp() {
    return Math.floor(Math.random() * (35 - 25 + 1) + 25);
  }

  generateRandHumidity() {
    return Math.floor(Math.random() * (95 - 75 + 1) + 75);
  }
}
