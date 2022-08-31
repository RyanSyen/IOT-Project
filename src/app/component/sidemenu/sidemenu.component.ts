import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  sidebarShow: boolean = true;
  notificationModal: boolean = false;
  loggedIn: boolean = false;

  overlayPanelWide = 'overlay-panel-wide';
  overlayPanelNarrow = 'overlay-panel-narrow';


  constructor() { }

  ngOnInit(): void {

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

}
