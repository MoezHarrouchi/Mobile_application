import { Component, OnInit } from '@angular/core';
import  { Router} from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading=true;
  User ={
    email:"",
    password:""
  }
  constructor(private Router : Router , public ngfireauth: AngularFireAuth) { }


  ngOnInit() {
  }
  async LogIn(){
    try{
      this.loading=false;
      const user= await this.ngfireauth.signInWithEmailAndPassword(this.User.email,this.User.password);
      if (user.user.email){
        this.Router.navigate(['/home']);
        this.loading = true;
      }
    }catch (error){
      console.log(error);
      document.getElementById('email-error').innerHTML='* ' + error.message;
      this.loading = true;
    } 

  }


}
