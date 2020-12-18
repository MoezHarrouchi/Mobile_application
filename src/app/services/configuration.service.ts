import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private listMenu:any = [];

  constructor() { }

  getContentCoursByTitle(parent:any,child:any){
    let courses=[];
    if(this.listMenu){
      for(let i in this.listMenu){
        if (this.listMenu[i].children){
          for(let j in this.listMenu[i].children){
            if(this.listMenu[i].children[j].subChildren){
                for (let k in this.listMenu[i].children[j].subChildren){
                  if(this.listMenu[i].children[j].subChildren[k].content && this.listMenu[i].children[j].subChildren[k].content.title === child && this.listMenu[i].children[j].title === parent){
                    courses.push(this.listMenu[i].children[j].subChildren[k].content); 
                  } 
                }
            }else {
              if(this.listMenu[i].children[j].content && this.listMenu[i].children[j].content.title === child && this.listMenu[i].children[j].title === parent){
                courses.push(this.listMenu[i].children[j].content);
              }
            }
          }
        }else{
          if(this.listMenu[i].content && this.listMenu[i].content.title === child){
            courses.push(this.listMenu[i].content);
          }
        }
      }
    }
    return courses;
  }
  setListMenu(data){
    this.listMenu = data;
  }
}