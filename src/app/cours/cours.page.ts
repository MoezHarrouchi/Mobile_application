import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
  contentCours :any;
  stateTitleCours:any;

  constructor(private router:Router,private route:ActivatedRoute) { 
    if(this.route.snapshot.data['special']){
      this.contentCours = this.route.snapshot.data['special'][0];
    }
  }
  ngOnInit() {
  }

}
