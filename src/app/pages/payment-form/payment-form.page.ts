import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { WordpressService } from '../../services/wordpress.service'
import { PaypalProduct } from '../../interfaces/cart'
import { CartService } from 'src/app/services/cart.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.page.html',
  styleUrls: ['./payment-form.page.scss'],
})
export class PaymentFormPage implements OnInit {
  @Input("paymentMethod") paymentMethod;
  @Input("purchaseUnits") purchaseUnits;
  @Input("total") total;
  angForm : FormGroup;
  isDelivery='false';
  serverResponse:String="";
  isLoader :boolean;
  hiddenForm:boolean=false;
  public payPalConfig ? : IPayPalConfig;

  ListOfInputs = [
    { name : 'firstname', label: 'Vorname *', type: 'text' },
    { name : 'lastname', label: 'Nachname *' , type: 'text' },
    { name: 'street', label: 'Straße *', type: 'text'},
    { name : 'apartement', label: 'Wohnung, Suite, Zimmer usw. (optional) ' , type: 'text'},
    { name : 'postCode', label: 'Postleitzahl *' , type: 'text'},
    { name : 'city', label: 'Ort / Stadt *' , type: 'text'},
    { name : 'telefon', label: 'Telefon *' , type: 'tel'},
    { name : 'email', label: 'E-Mail-Adresse *' , type: 'text'},
    { name : 'comments', label: 'Anmerkungen zur Bestellung (optional)' , type: 'textarea'},
    { name : 'isDelivery', label: '' , type: 'moreOnecheckbox', choices: ['Versandkostenpauschale: €4,75', 'Abholung vor Ort']},



  ];
  inputsError = {
    firstname: [
      { type: 'Required', message: 'Vorname is required'},
      { type: 'pattern', message: 'Vorname should has caractere'},
    ],
    lastname: [
      { type: 'Required', message: 'Nachname is required'},
      { type: 'Pattern', message: 'Nachname Name should has caractere'}
    ],
    street: [
      { type: 'Required', message: 'Straße is required'}
    ],
    postCode: [
      { type: 'Required', message: 'Postleitzahl is required'}
    ],
    city: [
      { type: 'Required', message: 'Ort / Stadt is required'}
    ],
    telefon: [
      { type: 'pattern', message: 'telefon shoud a number'}
    ],
    email: [
      { type: 'Required', message: 'Email is required'},
      { type: 'pattern', message: 'Email is not valid'},
    ]
  };


  constructor( private fB:FormBuilder, private modalController : ModalController ,private wordPressSercice:WordpressService, private cartService:CartService) { }

  ngOnInit() {
    this.createForm();
  }
  ngDoCheck(){
    this.cartService.gethiddenForm().subscribe(res=>{
      this.hiddenForm = res;
    })
  }

  createForm(){
    this.angForm = this.fB.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      apartement: [''],
      postCode: ['', Validators.required],
      telefon: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      comments: [''],
      isDelivery:['',Validators.required],
    });
  }
  close(){
    this.modalController.dismiss({
      dimissed:true
    })
  }

  onSubmit(){
    this.cartService.sethiddenForm(true);
    this.cartService.setLoader(true);
    this.wordPressSercice.shop(this.angForm.value.isDelivery,this.purchaseUnits,this.total,this.paymentMethod,this.angForm.value).subscribe(res=>{
      this.serverResponse = res;
      this.cartService.setLoader(false);


    })
  }
}