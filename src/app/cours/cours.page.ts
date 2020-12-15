import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
  bodyCours :any;
  availableCours:any;
  availableCoursJson:any;
  chosenCorse:any;

  constructor(private router:Router,private route:ActivatedRoute,private wordpress : WordpressService) { 
    if(this.route.snapshot.data['contentCourse']){
      this.bodyCours = this.route.snapshot.data['contentCourse'][0];
    }
  }

  ngOnInit() {
    this.getFreeCourses();  
  }

  async getFreeCourses(){
    await this.wordpress.getAPICoursesDisponible()
    .subscribe(res=>{
      this.availableCours = res.contents.split('</tr>').map(e=>e.split('<td>').map(el=>el.replace('</td>',''))).splice(1).map(el=>Object.assign({},el.splice(1)));
      if(this.bodyCours){
        let arr
        if(this.availableCours.filter(el=>el['1']).find(el=>el['1'].toUpperCase() === this.bodyCours.title.toUpperCase())){
          //this.chosenCorse.push(this.availableCours.filter(el=>el['1']).find(el=>el['1'].toUpperCase() === this.bodyCours.title.toUpperCase()));
          this.chosenCorse = this.availableCours.filter(el=>el['1']).filter(el=>el['1'].toUpperCase() === this.bodyCours.title.toUpperCase() )
          console.log(this.availableCours)
        }
      }
      if (this.chosenCorse){
       this.availableCoursJson = {
        "numero":this.chosenCorse['0'],
        "couseName":this.chosenCorse['1'],
        "courseStart":this.chosenCorse['2'],
        "time":this.chosenCorse['3'],
        "registration":this.chosenCorse['4']
      } 
    }
     
    },error=>{});
  }
  onSubscribe(name){
    console.log(name);
  }

}
