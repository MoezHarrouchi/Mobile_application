import { Component, OnInit } from '@angular/core';
import { Icon } from 'ionic-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  navigate:any;
  constructor() {
    this.sideMenu();
   }

  ngOnInit() {
  }
  sideMenu() {  
    this.navigate =   
    [  
      {  
        title : 'Home',  
        url   : '/home',  
        icon  : 'home'
      },
      { 
        title : 'Für Erwachsene',
        url   : '/login',
        children: [
            {
              title: 'Erwachsenenkurse',
              url   : '/contacts',
              subChildren:[
                {
                  title:'Personal Training',
                  icon:'',
                  url:'/test'
                },
                {
                  title:'Anfängerschwimmen',
                  icon:'',
                  url:''
                },
                {
                  title:'Freistil',
                  icon:'',
                  url:''
                },
                {
                  title:'Open water',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquazirkel',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquacycling',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquafitness',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquafitness für Schwangere',
                  icon:'',
                  url:''
                },
                {
                  title:'Early Morning',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquastep',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquamix',
                  icon:'',
                  url:''
                },
                {
                  title:'Adiaqua',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquasana',
                  icon:'',
                  url:''
                },
                {
                  title:'Aquafun',
                  icon:'',
                  url:''
                }
              ], 
 
            },
            {
              title: 'SUP Kurse',
              url   : '/contacts',
              subChildren:[
                {
                  title:'SUP',
                  icon:'',
                  url:''
                },
                {
                  title:'SUP SANA',
                  icon:'',
                  url:''
                }
                
              ]
            },
            {
              title: 'Zum Wasserplan',
              icon  : 'book-outline',
              url   : '/contacts',
            }

        ] 
        },
        {  
          title : 'Für die Kleinen',  
          url   : '/home',
          children:
          [
            {
            title: 'Babykurse',
            url:'',
            subChildren:[
              {
                title:'Mamba mini',
                url:'',
              },
              {
                title:'Ma&Pa mini',
                url:'',
              },
              {
                title:'Mamba minimax',
                url:'',
              },
              {
                title:'Ma&Pa minimax',
                url:'',
              }, 
              {
                title:'Mamba maxi',
                url:'',
              },
              {
                title:'Ma&Pa maxi',
                url:'',
              },
              {
                title:'Ma&Pa family',
                url:'',
              },
              {
                title:'Anne&Floh',
                url:'',
              }
              
           
            ]
          },
          {
            title: 'Kleinkinderkurse',
            url:'',
            subChildren:[
              {
                title:'aquakids',
                url:''
              },
              {
                title:'Ma&Pa Aquakids',
                url:''
              },
              {
                title:'2+',
                url:''
              },
              {
                title:'Ma&Pa 2+',
                url:''
              },
              {
                title:'Aquamaxis',
                url:''
              },
              {
                title:'Aquamaxis',
                url:''
              }

            ]

          }, 
          {
            title:'Kinderkurse',
            url:'',
            subChildren:[
              {
                title:'Wasserratten',
                url:''
              },
              {
                title:'Wasserratten mini',
                url:''
              },
              {
                title:'Wasserratten minimax',
                url:''
              },
              {
                title:'Wasserratten maxi',
                url:''
              },
              {
                title:'Trixi mini',
                url:''
              },
              {
                title:'Trixi Maxi',
                url:''
              },
              {
                title:'Freistil',
                url:''
              },
              {
                title:'Wasserratten Kiga/Kita',
                url:''
              },
              {
                title:'Ferienkurs – Anfänger',
                url:''
              },
              {
                title:'Ferienkurs – Kinderkraul',
                url:''
              },
              {
                title:'Ferienkurs – Trixi',
                url:''
              }
              
            ],
          
          } 
        ]
        },
        {
          title:'Academy',
          url:'',
          children: [
            {
              title:'Unser eingetragenes Zeichen',
              url:''
            },
            {
              title:'Deine Vorteile',
              url:''
            },
            {
              title:'Unsere Ausbildungsinhalte',
              url:''
            },
            {
              title:'Seminarkosten',
              url:''
            },
            {
              title:'Unsere Ausbildungstermine',
              url:''
            },
            {
              title:'Bewerbung',
              url:''
            },
            {
              title:'Ausbildungsbuch',
              url:''
            }

          ]
        },
       
        {
            title:'About US',
            url:'test',
            icon:'person',
            subChildren:[
              {
                title:'About Geschäftsinhaberin',
                url:'test'
              },
              {
                title:'Der Fotoservice',
                url:'test'
              },
              {
                title:'Presse',
                url:'test'
              },
              {
                title:'',
                url:'test'
              },
            ]
          },
          {
            title:'Shop',
            url:'test',
            icon:'basket'
          }
    ];  
  }  

}
