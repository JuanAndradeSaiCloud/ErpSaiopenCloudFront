import { Component, OnInit, ElementRef } from '@angular/core';
import {
  faCoffee,
  faHouse,
  faGears,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
declare const $: any;
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faGears = faGears;

  mobile_menu_visible: any = 0;
  toggleButton: any;
  sidebarVisible!: boolean;
  sidebarVisiblemd!: boolean;
  location: Location;
  User: any={};
  Setting: any={companyName:''};
  mensajes = [];
  notificaciones = 0;
  noti = [];
  cantmensajes = 0;
  img_defect = 'assets/img/user.png';
  
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
   // private api: ApiService,
   //public apiMain: ApiGeneralService
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.animationNotification();
    if(localStorage.getItem('sidebarVisiblemd')){
      let lovcal=localStorage.getItem('sidebarVisiblemd');
      if(lovcal=='true'){
        this.sidebarVisiblemd = true;
      }else{
        this.sidebarVisiblemd = false;
      }
    }else{
      this.sidebarVisiblemd = true;
    }

  }
  ngOnInit(): void {
  //  this.User = JSON.parse(localStorage.getItem('User'));
   // this.Setting = JSON.parse(localStorage.getItem('companysetting'));
  }

  ngAfterViewInit(){
    if ($(window).width() > 991) {
      var sidebar = document.getElementsByClassName('sidebar')[0];
      var main = document.getElementsByClassName('main-panel')[0];
      var nav = document.getElementsByClassName('navbar')[0];

      if (this.sidebarVisiblemd === false) {
        sidebar.setAttribute('style', 'transform: translate3d(-260px, 0, 0);');
        main.setAttribute('style', 'width: calc(100% - 0px);');
        nav.setAttribute('style', 'margin-left:0;');
      }else{
        sidebar.setAttribute('style', 'transform: translate3d(0px, 0, 0);');
        main.setAttribute('style', 'width: calc(100% - 260px);');
        nav.setAttribute('style', 'margin-left:260px;');
      }
    }
  }


  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }
  sidebarHide() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var main = document.getElementsByClassName('main-panel')[0];
    var nav = document.getElementsByClassName('navbar')[0];
    if ($(window).width() > 991) {
      if (this.sidebarVisiblemd === false) {
        sidebar.setAttribute('style', 'transform: translate3d(0px, 0, 0);');
        main.setAttribute('style', 'width: calc(100% - 260px);');
        nav.setAttribute('style', 'margin-left:260px;');
        this.sidebarVisiblemd = true;
      } else {
        sidebar.setAttribute('style', 'transform: translate3d(-260px, 0, 0);');
        main.setAttribute('style', 'width: calc(100% - 0px);');
        nav.setAttribute('style', 'margin-left:0;');
        this.sidebarVisiblemd = false;
      }
      localStorage.setItem('sidebarVisiblemd', this.sidebarVisiblemd.toString());
    }
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }
  Cerrar(){
   //this.apiMain.Cerrar();
  }
  
  alertnotification = '';
  animationNotification(){
    this.notificaciones = this.noti.length;
    if (this.notificaciones > 0){
      this.alertnotification = 'alert-notification';
    } else {
      this.alertnotification = '';
    }
    
    this.cantmensajes = this.mensajes.length;

    
    
    if (this.cantmensajes > 0){
      this.alertnotification = 'alert-notification';
    } else {
      this.alertnotification = '';
    }
  }
}



