import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-what-we-offer',
  templateUrl: './what-we-offer.component.html',
  styleUrls: ['./what-we-offer.component.scss']
})
export class WhatWeOfferComponent implements OnInit {
  WhatWeAreForm= new UntypedFormGroup({
    Title: new UntypedFormControl(''),
    SubTitle:new UntypedFormControl(''),
    Description:new UntypedFormControl(''),
    WhatWeOfferImage:new UntypedFormControl(''),
   
  });
  WeofferUpdate= new UntypedFormGroup({
    Title: new UntypedFormControl(''),
    SubTitle:new UntypedFormControl(''),
    Description:new UntypedFormControl(''),
    WhatWeOfferImage:new UntypedFormControl(''),
    WeofferId: new UntypedFormControl('')
   
  });
  WeOfferDelete = new UntypedFormGroup({
    Weoffer: new UntypedFormControl(''),

  });
  whatWeOfferImage :any;
  weofferData: any;
  formEdit: boolean = false;
  weoffObj: any;
  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

  imageValidate(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg' ||
      event.target.files[0].type == 'image/webp'
    ){
      this.whatWeOfferImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }
  getAll(){
    this.httpClient
    .get<any>('https://devsite.qbrainx.com/qbrainx-web/v1/weOffers/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.weofferData = data;
    });
  }
  onChange(event:any) { 
    this.httpClient
    .get<any>('https://devsite.qbrainx.com/qbrainx-web/v1/weOffers/getById?id='+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.formEdit = true;
        this.weoffObj = data;
        
    });
  }
  submit()
  {
    
    let body = new FormData();
  
    body.append("file", this.whatWeOfferImage);
    body.append("description", this.WhatWeAreForm.value.Description);
    body.append("title", this.WhatWeAreForm.value.Title);
       
     
     this.httpClient
     .post('https://devsite.qbrainx.com/qbrainx-web/v1/weOffers/create', body, {
       responseType: 'text'
     })
     .subscribe((data) => {
       window.location.reload();
     });
  }
  weOfferUpdate()
  {
    
    let body = new FormData();
    body.append("id", this.WeofferUpdate.value.WeofferId);
    body.append("file", this.whatWeOfferImage);
    body.append("description", this.WeofferUpdate.value.Description);
    body.append("title", this.WeofferUpdate.value.Title);
       
      
    
    this.httpClient
    .put('https://devsite.qbrainx.com/qbrainx-web/v1/weOffers/updateById', body, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  weOfferDelete(){
    this.httpClient
     .delete('https://devsite.qbrainx.com/qbrainx-web/v1/weOffers/deleteById?id='+this.WeOfferDelete.value.Weoffer, {
       responseType: 'text'
     })
     .subscribe((data) => {
       window.location.reload();
     });
   }
}
