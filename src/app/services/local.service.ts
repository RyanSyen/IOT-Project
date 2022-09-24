import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Floor } from '../interfaces/floor';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  floor: Floor[] = [];

  //*time
  hours = 0;
  minutes = 0;
  seconds = 0;
  day = "";
  date = "";
  daytime: any;

  constructor(private http: HttpClient) { }

  //* notes: cannot edit json files through Angular, you need backend in order to reflect change on JSON file. Hence we will change the values read at the component.ts


  getFloorFromJson() {
    return this.http.get<any>('../../assets/localData/floors.json')
      .toPromise()
      .then(res => <Floor[]>res.data)
      .then(data => {
        return data;
      });
  }

  getDateTime() {
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

    // if (min < 10) {
    //   var minutes = "0" + min;
    //   if (sec < 10) {
    //     var seconds = "0" + sec;
    //     this.timeSnaphot = hr + ":" + minutes + ":" + seconds;
    //   } else {
    //     this.timeSnaphot = hr + ":" + minutes + ":" + sec;
    //   }
    // } else {
    //   if (sec < 10) {
    //     var seconds = "0" + sec;
    //     this.timeSnaphot = hr + ":" + min + ":" + seconds;
    //   } else {
    //     this.timeSnaphot = hr + ":" + min + ":" + sec;
    //   }
    //   this.timeSnaphot = hr + ":" + min + ":" + sec;
    // }

    // // this.timeLabel.push(this.timeSnaphot);
    // var ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    // hr = (hr == 0) ? 12 : hr;
    // hr = (hr > 12) ? hr - 12 : hr;

    // //Add a zero in front of numbers<10
    // hr = this.checkTime(hr);
    // min = this.checkTime(min);
    // sec = this.checkTime(sec);
    // this.hours = hr;
    // this.minutes = min;
    // this.seconds = sec;

    // document.getElementById("clock")!.innerHTML = hr + ":" + min + ":" + sec + " " + ap;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var testMonth = month[today.getMonth()];
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
    var date1 = curYear + testMonth + curDay;
    // console.log(date1)
    this.date = date1;
    // document.getElementById("date")!.innerHTML = date;
    return this.date;

    var time = setTimeout(() => { this.getDateTime() }, 500);
  }

}
