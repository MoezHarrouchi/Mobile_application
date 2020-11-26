import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  navigate:any;
  constructor() {
    this.sideMenu();
   }

  ngOnInit() {
  }

  sideMenu() {  
    this.navigate =   
    [  
        { 
        title : 'Home',
        url   : '/home',
        icon  : 'Home' 
        },  
      {  
        title : 'Courses',  
        url   : '/contacts',  
        icon  : 'book-outline'  
      },
      {  
        title : 'Contacts',  
        url   : '/contacts',  
        icon  : 'call-outline'  
      },
      {  
        title : 'About',  
        url   : '/contacts',  
        icon  : 'alert-outline'  
      }
    ];  
  }  

}
