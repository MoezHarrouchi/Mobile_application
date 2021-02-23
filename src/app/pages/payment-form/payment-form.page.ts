import { Component, OnInit,Input } from '@angular/core';
import { Form, FormBuilder,FormGroup,Validators} from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { WordpressService } from '../../services/wordpress.service'
import { PaypalProduct } from '../../interfaces/cart'

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.page.html',
  styleUrls: ['./payment-form.page.scss'],
})
export class PaymentFormPage implements OnInit {

  @Input() paymentMethod;
  @Input() purchaseUnits:PaypalProduct[];
  @Input() total;
  angForm : FormGroup;
  isDelivery='false';
  serverResponse:String="";
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


  constructor( private fB:FormBuilder,private wordPressSercice:WordpressService) { }
  ngOnChanges(){
   this.serverResponse;
  }
  ngOnInit() {
    this.createForm();
    this.initConfig();

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

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'AVmo547lzLlL5m2w9PzsuIEpGruiQNvO2EmVUafKcZMVRiU-WEC-UzWoWBiZZl2AMXy2LDaoLCvw8D5-',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.total.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.total.toString()
                        }
                    }
                },
                items: this.purchaseUnits
            }]
        },
        advanced: {
            commit: 'false'
        },
        style: {
            label: 'paypal',
            layout: 'vertical',
            size:"small",
            color:"blue",
            shape:"rect"
        },
        onApprove: (data, actions) => {
          
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {       
          console.log('onClick', data, actions);
        },
    };
}
  onSubmit(){
    this.wordPressSercice.shop("false",this.purchaseUnits,this.total,this.paymentMethod,this.angForm.value).subscribe(res=>{
      this.serverResponse = res;
    })
  }
}