import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
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
  notFound:String;
  subscribeMsg : String;

  constructor(private route: ActivatedRoute, private wordpress: WordpressService, 
    private modalController: ModalController
    ) {
  }

  ngOnInit() {
    this.wordpress.setSubscribeMsg("");
    this.getContentCourse();
    this.getFreeCourses();
  }

  ngDoCheck(){
    this.wordpress.getSubscribeMsg().subscribe(msg=>{
      this.subscribeMsg = msg;
    })
    
  }
  async getFreeCourses(){
    let courseId = this.route.snapshot.data.courses.id;
     if (courseId!="noid" && courseId){
      await this.route.snapshot.data.courses.freeCourses
      .subscribe(res => {    
         this.availableCours = res;
         this.notFound = res.NotFound;
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
       this.coursTitle = res[0].name;
       this.bodyCours = res[0].body;
       this.bodyCours = this.bodyCours.split('<figure>[advanced_iframe')
       .map(el => el.includes('kurssoftware/anmeldung-online.php') ? el = '' : el).join('');
     });
   }
  }

  async presentSlide(kursNr,kursBezID,action) {
    const modal = await this.modalController.create({
      component: SlidesComponent,
      cssClass: 'modal',
      componentProps:{
        kursNr,
        kursBezID,
        action
      }
    });
    return await modal.present();
  }
}
