import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  sidebarShow: boolean = false;
  notificationModal: boolean = false;
  loggedIn: boolean = false;

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

  //*time
  hours = 0;
  minutes = 0;
  seconds = 0;
  day = "";
  date = "";
  daytime: any;

  overlayPanelWide = 'overlay-panel-wide';
  overlayPanelNarrow = 'overlay-panel-narrow'

  lat: any;
  lng: any;


  constructor(private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.startTime();

    this.getLocation();
  }

  showSideBar() {
    this.sidebarShow = !this.sidebarShow;
    let el = document.getElementById('sideBarFull');
    // console.log(el)
    if (el != undefined && this.sidebarShow == false) {
      el.style.zIndex = "0";
    } else if (el != undefined && this.sidebarShow == true) {
      el.style.zIndex = "1";
    }
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
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
          this.fullURL = this.url + "lat=" + this.lat + "&lon=" + this.lng + this.celciusMetric + "&appid=" + this.weatherAPI;
          console.log(this.fullURL);
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
      console.log(data);
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

}
