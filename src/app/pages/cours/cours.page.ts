import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { WordpressService } from '../../services/wordpress.service';
import { ModalController } from '@ionic/angular';
import {Validators ,FormBuilder, FormGroup } from '@angular/forms';
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
  angForm: FormGroup;
  serverResponse:String ="";
  firstBewerbung:String ="";
  secondBewerbung:String ="";


  ListOfInputs = [
    { name : 'vorname', label: 'Vorname *', type: 'text' },
    { name : 'name', label: 'Nachname *' , type: 'text' },
    { name:'email', label:'E-mail *',type:'text'},
    { name:"kommentar",label:"Kommentar oder Nachricht *",type:"textarea"}
  
  ];

  inputsError = {
    vorname: [
      { type: 'Required', message: 'Name is required'},
      { type: 'pattern', message: 'Name should has caractere'},
    ],
    name: [
      { type: 'Required', message: 'Last Name is required'},
      { type: 'Pattern', message: 'Last Name should has caractere'}
    ],
    email: [
      { type: 'Required', message: 'Email is required'},
      { type: 'pattern', message: 'Email is not valid'},
    ]
   
  };

  constructor(private route: ActivatedRoute, private wordpress: WordpressService, 
    private modalController: ModalController, private fb:FormBuilder
    ) {
  }

  ngOnInit() {
    this.wordpress.setSubscribeMsg("");
    this.getContentCourse();
    this.getFreeCourses();
    this.createForm();
    this.serverResponse="";

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
       if (this.coursTitle === 'Bewerbung'){
        this.firstBewerbung = this.bodyCours.slice(0,this.bodyCours.indexOf('[wpforms'));
        this.secondBewerbung = this.bodyCours.slice(this.bodyCours.indexOf('description="false"]')+20,this.bodyCours.length);
        }
     });

    
    
    
   }

  }
  onSubmit(){
    this.wordpress.instructorCandidature(this.angForm.value).subscribe(res=>{
      this.serverResponse = res;
    })
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


  createForm(){
    this.angForm = this.fb.group({
      vorname: ['', Validators.required],
      name: ['', Validators.required],
      kommentar:['',Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });
  }
}
