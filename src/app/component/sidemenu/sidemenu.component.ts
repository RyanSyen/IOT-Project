import { Component, OnInit, HostListener } from '@angular/core';
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
  page = "dashboard";

  //*time
  hours = 0;
  minutes = 0;
  seconds = 0;
  day = "";
  date = "";
  daytime: any;

  overlayPanelWide = 'overlay-panel-wide';
  overlayPanelNarrow = 'overlay-panel-narrow'

  screenWidth: any;
  screenHeight: any;


  constructor(private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.primengConfig.ripple = true;
    this.startTime();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    let el = document.getElementById('section');
    if (el != undefined) {
      el.style.width = this.screenWidth;
    }
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

  updatePage(newpage: string) {

    // update side nav active status
    let currentPage = document.getElementById(this.page);
    let newPage = document.getElementById(newpage);
    // remove active status on current page
    if (currentPage != undefined) {
      currentPage.classList.remove('v-nav-active');
    }
    // add active status on new page
    if (newPage != undefined) {
      newPage.classList.add('v-nav-active');
    }

    // update page
    this.page = newpage;
  }

}
