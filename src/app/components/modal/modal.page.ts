import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import '../../../assets/js/SMTP.js';


declare let Email: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  angForm:FormGroup;
  validation_messages:any;
  inputsError = {
    'gender':[
      { type:"Required",message:"Gender is required"}
    ],
    'name':[
      { type:"Required",message:"Name is required"},
      { type:"pattern",message:"Name should has caractere"},
    ],
    'lastName':[
      { type:"Required",message:"Last Name is required"},
      { type:"Pattern",message:"Last Name should has caractere"}
    ],
    'street':[
      { type:"Required",message:"Street is required"}
    ],
    'postCode':[
      { type:"Required",message:"PostCode is required"}
    ],
    'place':[
      { type:"Required",message:"Place is required"}
    ],
    'phone':[
      { type:"Required",message:"Phone is required"}
    ],
    'mobilePhone':[
      { type:"pattern",message:"MobilePhone shoud a number"}
    ],
    'email':[
      { type:"Required",message:"Email is required"},
      { type:"pattern",message:"Email is not valid"},
    ],
    'paymentMethod':[
      { type:"Required",message:"Payment Method is required"}
    ],
    'dateOfBirth':[
      { type:"Required",message:"Date of birth is required"},
      { type:"pattern",message:"Date of birth is not valid"},
    ],
    'remarks':[
    ],
    'condition':[
      { type:"Required",message:"Condition is required"},
    ],
    'hearAboutUs':[
      { type:"Required",message:"Hear about us is required"},
    ],    
  }
  ListOfInputs= [
    { name : "gender",label:"Gender",type:"moreOnecheckbox" ,choices:["Woman","Mr"] },
    { name :"name", label:"Name",type:"text" },
    { name : "lastName", label:"LastName" , type:"text" },
    { name:"street",label:"Street",type:"text"},
    { name :"postCode",label:"PostCode" , type:"text"},
    { name :"place",label:"Place" , type:"text"},
    { name :"phone",label:"Phone" , type:"tel"},
    { name :"mobilePhone",label:"Mobile phone" , type:"text"},
    { name :"email",label:"Email" , type:"text"},
    { name :"paymentMethod",label:"Payment Method" , type:"moreOnecheckbox",choices:["EC Cash","Bank Transfer"]},
    { name :"dateOfBirth",label:"Date of birth" , type:"date"},
    { name :"remarks",label:"Remarks" , type:"textarea"},
    { name :"condition",label:"condition" , type:"checkbox"},
    { name :"hearAboutUs",label:"Hear About US " , type:"moreOnecheckbox",choices:["Google","Freinds"]}

  ]

  constructor(private fb:FormBuilder) { 
  }
  ngOnInit() {
    this.createForm();
  }
  get errorCtr(){
    return this.angForm.controls.name;
  };
  
  createForm(){
    this.angForm = this.fb.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      gender:['',Validators.required],
      name: ['',Validators.required],
      lastName:['',Validators.required],
      street:['',Validators.required],
      place:['',Validators.required],

      postCode:['',Validators.required],
      phone:['',Validators.compose([
        Validators.required
      ])],
      mobilePhone:['',Validators.required],
      paymentMethod:['',Validators.required],
      dateOfBirth:['',Validators.required],
      remarks:[''],
      condition:['',Validators.required],
      hearAboutUs:['',Validators.required]
    })
  }
 /* onClose(){
    this.modalControler.dismiss({
      dimissed:true
    })
  }*/
  onSubmit(){
    var dataUri ='data:csv/plain;base64,'+btoa(Object.keys(this.angForm.value).map(el=>"'"+el+"'").join(";")+"\r"+Object.values(this.angForm.value).map(el=>"'"+el+"'").join(";"));
    Email.send({
      Host : "smtp.gmail.com",
      Username : "",
      Password : "",
      To : "moez.harrouchi@gmail.com",
      From :"moezharr@gmail.com" ,
      Subject : "test",
      Attachments : [
        {
          name : "test.csv",
          data : dataUri
        }],
      Body : `
      <i>This is sent as a feedback from my resume page.</i>`
        
      }).then(el=>console.log("Success"));
    }
  }