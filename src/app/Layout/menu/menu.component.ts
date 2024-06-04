import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  faCoffee,
  faHouse,
  faGears,
  faLocationDot,
  faTableColumns,
  faBuilding,
  faGear,
  faUsers,faClipboard,faUser
} from '@fortawesome/free-solid-svg-icons';

declare const $: any;
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faHouse = faHouse;
  faGears = faGears;
  faGear=faGear;
  faUsers=faUsers;
  faUser=faUser;
  faLocationDot = faLocationDot;
  faTableColumns=faTableColumns;
  faBuilding=faBuilding;
  faClipboard=faClipboard;
  menuItems: any[] = [];
  User:any = {name:'' };
  constructor() {}

  ngOnInit(): void {
    //this.User = JSON.parse(localStorage.getItem('User'));
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}

