import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { PagesServicesService } from '../pages-services.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
selected:any="1";
fieldSelected:number=0;
Address:any;
LifeAtQbTitle: any;
LifeAtQbSubTitle : any;
Established:number=0;
clients:number=0;
projects:number=0;
activeButton:number=1;
phone:any;
whatWeOffer:any;
bannerArray: Array<any> = [];
fieldArray: Array<any> = [];
whoweareinfoArray: Array<any> = [];
whowearemainArray: Array<any> = [];





  AddressArray: any[] = [
  { imgSrc: "assets/images/location-usa.png", 
  country: "usa" ,
  address:[{city:"MICHIGAN",Address:"100 W. Big Beaver Road Suite 200, Troy, MI 48084"},
  {city:"ARKANSAS",Address:"1116 S Walton Blvd, #216, Bentonville, AR 72712"}],
  phone:["+1 248-606-7880"],Email:""},

  { imgSrc: "assets/images/location-india.png", country: "india" ,address:[{city:"COIMBATORE-SOUTH",Address:"Hanudev Infopark, Nava India RdCoimbatore, Tamil Nadu – 641028"},
  {city:"COIMBATORE-NORTH",Address:"Shiv Chambers, 247, Alagesan Rd,Saibaba Colony, Coimbatore,Tamil Nadu – 641011"},
  {city:"VISAKHAPATNAM",Address:"2-147/4,Plot no -MIG 678 Midhilapuri Vuda Colony, Near kushi super market, Madhurawada, Visakhapatnam, Andhra Pradesh- 530041"}],
  phone:["0422-427-3782", "0422-350-8152"]},
  
  { imgSrc: "assets/images/location-dubai.png", country: "dubai",address:[{city:"dubai",Address:"Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates"}],phone:[" +180 486 969 04"]},
  ]
  image: string | ArrayBuffer | null | undefined;
 
//   fieldArray:any[]=[
//     {
//     icon:"bi-wallet2",
//     heading:"Banking & Finance",
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.",
//     list:[{list:
//       "Ullamco laboris nisi ut aliquip ex ea commodo consequat."},
//       {list:" Duis aute irure dolor in reprehenderit in voluptate velit."},
//       {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur."}
//     ],
//     imgSrc:"assets/images/banking-finance.webp"
//   },
//   { icon:"bi-briefcase",
//     heading:"Business Consulting",
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.",
//     list:[
//       {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat."},
//       {list: " Duis aute irure dolor in reprehenderit in voluptate velit."},
//       {list:"Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed."},
//       {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur."}
//     ],
//     imgSrc:"assets/images/business-consulting.webp"
//   },
//   {
//   icon:"bi-window-fullscreen",
//   heading:"Software & Hi-Tech",
//   description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.",
//   list:[
//     {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat."},
//     {list:" Duis aute irure dolor in reprehenderit in voluptate velit."},
//     {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur."}
//   ],
//   imgSrc:"assets/images/software.webp"
// },
// {
// icon:"bi-command",
// heading:"Manufacturing",
// description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.",
// list:[
//   {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat."},
//   {list:" Duis aute irure dolor in reprehenderit in voluptate velit."},
//   {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur."}
// ],
// imgSrc:"assets/images/manufacturing.webp"
// },
// {
// icon:"bi-airplane",
// heading:"Travel",
// description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.",
// list:[
//   {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat."},
//   {list: " Duis aute irure dolor in reprehenderit in voluptate velit."},
//   {list: "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur."}
// ],
// imgSrc:"assets/images/travel.webp"
// },
// {
//   heading:"Health Care",
// description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua.",
// list:[
//   {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat."},
//   {list:" Duis aute irure dolor in reprehenderit in voluptate velit."},
//   {list:"Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur."}
// ],
// imgSrc:"assets/images/health-care.jpg"
// },
//   ]
  constructor(private readonly pagesServicesService:PagesServicesService,private httpClient : HttpClient ) { }

  ngOnInit(): void {
    this.autoPlayForCoreServices()
    this.autoPlayWhatWeOffers()
    this.phone=this.AddressArray[ this.activeButton ].phone
    this.Address=this.AddressArray[ this.activeButton ].address
    this.allBannerList()
    this.whoWeareList()
    this.lifeAtQb()
    this.weoffers()
  }

  allBannerList(){
    this.httpClient
    .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/banner/getAllBanners',  {
      responseType: 'json'
    })
    .subscribe(data => {
      data.forEach(e => {
        let extension = e.image.fileName.split('.');
        this.bannerArray.push({
          image: e.image.data,
          extension: extension[1],
          title: e.bannerTitle,
          description: e.bannerSubTitle,
          buttonName: e.bannerCallOfAction,
          buttonlink: e.link
        })
      })
      // bannerArray: any[]=[
      //   {
      //     image:"assets/images/banner-image.jpg",
      //     description:"We have opened a new Branch in Arkansas, USA",
      //     buttonName:"Discover More"
      //   },
      //   {
      //     image:"assets/images/banner-2.jpg",
      //     description:"Shift your focus to Digital Transformation to make your organization ready for the future.",
      //     buttonName:"Discover More"
      //   },
      //   {
      //     image:"assets/images/banner-3.jpg",
      //     description:"The spark of passion is what drives our people.",
      //     buttonName:"Join Our Team"
      //   }
      // ]

    });
  }
  whoWeareList(){
    this.httpClient
    .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/whoWeAre/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      data.forEach((e,index) => {
       let extension = e.feedBackImage.fileName.split('.');
       this.whoweareinfoArray.push({
            image: e.feedBackImage.data,
            extension: extension[1],
            description: e.description,
            link: e.link
          })
      });
  });
}
lifeAtQb(){
  this.httpClient
  .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/lifeAtQb/getAll',  {
    responseType: 'json'
  })
  .subscribe(data => {
    this.LifeAtQbTitle = data[0].textTitle
    this.LifeAtQbSubTitle = data[0].textSubTitle
    this.Established = data[0].established
    this.clients = data[0].client
    this.projects = data[0].project
});
}
weoffers(){
  this.httpClient
  .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/weOffers/getAll',  {
    responseType: 'json'
  })
  .subscribe(items => {
    items.forEach((e) => {
      let extension = e.newsImage.imageName.split('.');
      this.fieldArray.push({
        image: e.newsImage.data,
        extension: extension[1],
        description: e.description,
        heading: e.title
      })
  });
});
}
  // allBannerList()
  // {
  //   this.pagesServicesService.allBannerList().subscribe(
  //     (res:any)=>{ console.log(res);
  //     },
  //     (error:any)=>{}
  //   )
  // }  

// Auto Number counter
  @ViewChild('testDiv', {static: false}) private testDiv!: ElementRef<HTMLDivElement>;
  
 started:any = false; // Function Started ? No

 @HostListener('window:scroll', ['$event']) 
  onScroll()
  {
    if (this.testDiv){
      const rect = this.testDiv.nativeElement.getBoundingClientRect();
    if (window.scrollY >= (rect.top+500) ){
      if(!this.started){
        this.reset();
        this.startCount();
      }
      this.started=true
    }
  }
  }
 
 startCount() {
   const EstablishedCountStop=setInterval(()=>{ 
    this.Established=this.Established;
    if(this.Established>=2015)
    {
      clearInterval(EstablishedCountStop)
    }
  },10)

  const clientCountStop=setInterval(()=>{ 
  this.clients++;
  if(this.clients>=100)
  {
    clearInterval(clientCountStop)
  }
},4)

  const projectCountStop=setInterval(()=>{ 
  this.projects++;
  if(this.projects>=150)
  {
    clearInterval(projectCountStop)
  }
},3)
this.started=false
}
  
reset()
{
  this.Established=0;
  this.clients=0;
  this.projects=0;
  this.started=false
}


//our core services function
coreservices:any;
autoPlayForCoreServices()
{
  this.coreservices=setInterval(() =>{
    this.selected++;
    if(this.selected == 7) {
      this.selected=1;
    }
   this.selected=this.selected.toString()
 
  }, 5000);
}

showimg()
{
  clearInterval(this.coreservices)
  this.autoPlayForCoreServices();

}
previousFn()
{
  this.selected--;
  if(this.selected<1)
  {
    this.selected=6
  }
  this.selected=this.selected.toString()
  clearInterval(this.coreservices)
  this.autoPlayForCoreServices();
}
nextFn()
{
  this.selected++;
  if(this.selected>=6)
  {
    this.selected=1
  }
  this.selected=this.selected.toString()
  clearInterval(this.coreservices)
  this.autoPlayForCoreServices();
}
//WHAT WE OFFER Function
autoPlayWhatWeOffers()
{
this.whatWeOffer=setInterval(() =>{
    this.fieldSelected++;
    if(this.fieldSelected == 3) {
      this.fieldSelected=0;
    }
  }, 5000);
}

previous()
{
  this.fieldSelected--;
  if(this.fieldSelected<0)
  {
    this.fieldSelected=2
  }
  clearInterval(this.whatWeOffer)
  this.autoPlayWhatWeOffers();
}

next()
{
  this.fieldSelected++;
  if(this.fieldSelected>=3)
  {
    this.fieldSelected=0
  }
  clearInterval(this.whatWeOffer);
  this.autoPlayWhatWeOffers();
  
}

//Reach us
setActive (buttonName:number){
  this.activeButton = buttonName;
  this.phone=this.AddressArray[ this.activeButton ].phone
  this.Address=this.AddressArray[ this.activeButton ].address
}


}


