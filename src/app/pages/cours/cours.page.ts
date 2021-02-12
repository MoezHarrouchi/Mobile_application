import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from '../../services/wordpress.service';
import { ModalController } from '@ionic/angular';
import { SlidesComponent } from '../../components/slides/slides.component'

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
  bodyCours: any;
  availableCours: any;
  coursTitle: any; 
  loading:boolean=false;

  constructor(private route: ActivatedRoute, private wordpress: WordpressService, 
    private modalController: ModalController,
    private router:Router
    ) {
  }

  ngOnInit() {

    this.getContentCourse();
    this.getFreeCourses();

  }
  async getFreeCourses(){
    let courseId = this.route.snapshot.data.courses.id;
 
    if (courseId!="noid" && courseId){
      await this.wordpress.getCoursesDisponible(courseId)
      .subscribe(res => {    
         this.availableCours = res
        this.loading=true;
      }, error => {});
    }
    else{
      this.loading=true;
    }
  }
  getContentCourse(){
    if (this.route.snapshot.data.courses){
      this.route.snapshot.data.courses.content.subscribe(res => {
       //this.bodyCours  = res.filter(el => el.name && el.body)
       //.find(el => el.name.toUpperCase().replace(/\s/g, '') === this.route.snapshot.data.courses.name.toUpperCase().replace(/\s/g, '') && el.parent.toUpperCase().replace(/\s/g, '') === this.route.snapshot.data.courses.parent.toUpperCase().replace(/\s/g, ''))
       //.body;
       this.coursTitle = res[0].name;
       this.bodyCours = res[0].body;
       this.bodyCours = this.bodyCours.split('<figure>[advanced_iframe')
       .map(el => el.includes('kurssoftware/anmeldung-online.php') ? el = '' : el).join('');
     });
   }
  }

  async presentSlide(kursNr,KursBezID,action) {
    const modal = await this.modalController.create({
      component: SlidesComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        kursNr,
        KursBezID,
        action
      }
    });
    return await modal.present();
  }
}
