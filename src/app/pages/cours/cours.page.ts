import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from '../../services/wordpress.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../components/modal/modal.page';

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

  constructor(private route: ActivatedRoute, private wordpress: WordpressService, private modalController: ModalController) {
  }

  ngOnInit() {

    this.getContentCourse();
    this.getFreeCourses();

  }
  async getFreeCourses(){
    this.coursTitle = this.route.snapshot.data.courses.name;
    let courseId = this.route.snapshot.data.courses.id;
    await this.wordpress.getCoursesDisponible(courseId)
    .subscribe(res => {    
       this.availableCours = res
      this.loading=true;
    }, error => {});
  }
  getContentCourse(){
    if (this.route.snapshot.data.courses){
      this.route.snapshot.data.courses.content.subscribe(res => {
       this.bodyCours  = res.filter(el => el.name && el.body)
       .find(el => el.name.toUpperCase().replace(/\s/g, '') === this.route.snapshot.data.courses.name.toUpperCase().replace(/\s/g, '') && el.parent.toUpperCase().replace(/\s/g, '') === this.route.snapshot.data.courses.parent.toUpperCase().replace(/\s/g, ''))
       .body;
       this.bodyCours = this.bodyCours.split('<figure>[advanced_iframe')
       .map(el => el.includes('kurssoftware/anmeldung-online.php') ? el = '' : el).join('');

     });
     this.loading=true;
   }
  }
    async presentModal() {
      const modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
}
