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
  coursTitle:any;

  constructor(private router:Router,private route:ActivatedRoute,private wordpress : WordpressService) { 
  }

  ngOnInit() {
    if(this.route.snapshot.data['courses']){
       this.route.snapshot.data['courses'].content.subscribe(res=>{
        this.bodyCours  = res.filter(el=>el.name && el.body)
        .find(el=>el.name.toUpperCase().replace(/\s/g,'') === this.route.snapshot.data['courses'].name.toUpperCase().replace(/\s/g,'') && el.parent.toUpperCase().replace(/\s/g,'') === this.route.snapshot.data['courses'].parent.toUpperCase().replace(/\s/g,''))
        .body
        this.bodyCours = this.bodyCours.split("<figure>[advanced_iframe").map(el=>el.includes("kurssoftware/anmeldung-online.php")? el="" :el).join("");
      });
    }
    this.getFreeCourses();  

  }

  async getFreeCourses(){
    this.coursTitle = this.route.snapshot.data['courses'].name;
    await this.wordpress.getAPICoursesDisponible()
    .subscribe(res=>{
      this.availableCours = res.contents.split('</tr>').map(e=>e.split('<td>').map(el=>el.replace('</td>',''))).splice(1).map(el=>Object.assign({},el.splice(1)));
      if( this.availableCours){
        if(this.availableCours.filter(el=>el['1']).find(el=>el['1'].toUpperCase() === this.coursTitle.toUpperCase())){
          this.chosenCorse = this.availableCours.filter(el=>el['1']).filter(el=>el['1'].toUpperCase() === this.coursTitle.toUpperCase() )
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
