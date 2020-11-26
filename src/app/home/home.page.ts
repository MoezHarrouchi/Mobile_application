import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  courses=[
    {
      image:"../assets/images/swimming.jpg",
      title:"swimming lessons",
      content:"This is a swimming lessons.",
      hour:"23h:30"
    },
    {
      image:"../assets/images/zumba.jpg",
      title:"Zumba lessons",
      content:"This is a swimming lessons.",
      hour:"12h:45"
    },
    {
      image:"../assets/images/cardio.jpg",
      title:"cardio lessons",
      content:"This is a swimming lessons.",
      hour:"16h:49"
    },
    {
      image:"../assets/images/swimming.jpg",
      title:"Dance lessons",
      content:"This is a swimming lessons.",
      hour:"17h:00"
    }
  ]
  constructor() {}

}
