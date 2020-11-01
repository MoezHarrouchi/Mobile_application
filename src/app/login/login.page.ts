import { Component, OnInit } from '@angular/core';
import  { Router} from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  User ={
    email:"",
    password:""
  }
  constructor(private Router : Router , public ngfireauth: AngularFireAuth) { }


  ngOnInit() {
  }
  async LogIn(){
    const user= await this.ngfireauth.signInWithEmailAndPassword(this.User.email,this.User.password)
    if (user.user.email){
      this.Router.navigate(['/home']);
    }
    else{
      alert(' Failed !')
    }

  }


}
