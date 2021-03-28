import { Component, OnInit ,Input} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController,NavParams } from '@ionic/angular';
import '../../../assets/js/SMTP.js';
import { WordpressService } from '../../services/wordpress.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input("kursNr") kursNr;
  @Input("action") action ;
  @Input("groupeNr") groupeNr;
  @Input("price") price;
  angForm: FormGroup;
  mailSentMessage: String;
  inputsError = {
    anrede: [
      { type: 'Required', message: 'Gender is required'}
    ],
    vorname: [
      { type: 'Required', message: 'Name is required'},
      { type: 'pattern', message: 'Name should has caractere'},
    ],
    name: [
      { type: 'Required', message: 'Last Name is required'},
      { type: 'Pattern', message: 'Last Name should has caractere'}
    ],
    strasse: [
      { type: 'Required', message: 'Street is required'}
    ],
    plz: [
      { type: 'Required', message: 'PostCode is required'}
    ],
    ort: [
      { type: 'Required', message: 'Place is required'}
    ],
    Telefon_Handfon: [
      { type: 'pattern', message: 'MobilePhone shoud a number'}
    ],
    email: [
      { type: 'Required', message: 'Email is required'},
      { type: 'pattern', message: 'Email is not valid'},
    ],
    zahlart: [
      { type: 'Required', message: 'Payment Method is required'}
    ],
    kgeb: [
      { type: 'Required', message: 'Date of birth is required'},
      { type: 'pattern', message: 'Date of birth is not valid'},
    ],
    zustimmung: [
      { type: 'Required', message: 'Condition is required'},
    ],
   
  };
  ListOfInputs = [
    { name : 'anrede', label: 'Anrede:*', type: 'moreOnecheckbox' , choices: ['Frau', 'Herr'] },
    { name : 'vorname', label: 'Vorname:*', type: 'text' },
    { name : 'name', label: 'Nachname:*' , type: 'text' },
    { name: 'strasse', label: 'Strasse:*', type: 'text'},
    { name : 'plz', label: 'PLZ:*' , type: 'number'},
    { name : 'ort', label: 'ORT:*' , type: 'text'},
    { name : 'Telefon_Handfon', label: 'Telefon_Handy:*' , type: 'tel'},
    { name : 'email', label: 'E-Mail-Adresse:*' , type: 'text'},
    { name : 'zahlart', label: 'Zahlart:*' , type: 'moreOnecheckbox', choices: ['EC-Cash', 'Bank Transfer']},
    { name : 'kgeb', label: 'Geburtsdatum des Teilnehmers:*' , type: 'date'},
    { name : 'zustimmung', label: '' ,type: 'moreOnecheckbox', choices: ['<a target="_blank" href="https://www.wasserschule.de/index.php/agb/">AGB</a> und <a target="_blank" href="https://www.wasserschule.de/index.php/privacy-policy/">Datenschutz</a> gelesen und zugestimmt:*']}

  ];

  slideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;
  
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
  
           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
  
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }

  constructor(private fb: FormBuilder,private modalController : ModalController,
    private wordpressService : WordpressService, private navParams:NavParams) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      anrede: ['', Validators.required],
      vorname: ['', Validators.required],
      name: ['', Validators.required],
      strasse: ['', Validators.required],
      plz: ['', Validators.required],
      ort: ['', Validators.required],
      Telefon_Handfon: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      zahlart: ['', Validators.required],
      kgeb: ['', Validators.required],
      zustimmung: ['', Validators.required]
    });
  }

  close(){
    this.modalController.dismiss({
      dimissed:true
    })
  }

  onSubmit(){
    this.wordpressService.subscribeToCourse(this.kursNr,this.action,this.groupeNr,this.price,this.angForm.value).
    subscribe(res=>{
      this.wordpressService.setSubscribeMsg(res.mailOK);
    });
    this.close();
    }
  }

