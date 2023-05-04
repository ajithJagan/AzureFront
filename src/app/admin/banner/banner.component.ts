import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BannerDto } from 'src/app/api/qbrainx-api/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AdminPanalService } from '../admin-panal.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  BannerForm= new FormGroup({
    Title: new FormControl(''),
    SubTitle:new FormControl(''),
    ButtonName:new FormControl(''),
    ButtonLink:new FormControl(''),
    BannerImage: new FormControl(''),
  });
  bannerImage!:File;
  bannerObj: any;
  BannerUpdate = new FormGroup({
    Title: new FormControl(''),
    SubTitle:new FormControl(''),
    ButtonName:new FormControl(''),
    ButtonLink:new FormControl(''),
    BannerImage: new FormControl(''),
    BannerId: new FormControl(''),
  });
  BannerDelete = new FormGroup({
    Banner: new FormControl(''),

  });
  formEdit = false;
  constructor(private adminPanalService:AdminPanalService,private router:Router,private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

 banImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.bannerImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  onChange(event:any) { 
    this.httpClient
    .get<any>('https://devsite.qbrainx.com/qbrainx-web/v1/banner/getBannerById?id='+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.bannerObj = data;
        this.formEdit = true;
    });
  }
  
  bannerSubmit()
  {
    
   let body = new FormData();
  
   body.append("file", this.bannerImage);
   body.append("bannerTitle", this.BannerForm.value.Title);
   body.append("bannerSubTitle", this.BannerForm.value.SubTitle);
   body.append("bannerCallOfAction", this.BannerForm.value.ButtonName);
   body.append("link", this.BannerForm.value.ButtonLink);
      
    
    this.httpClient
    .post('https://devsite.qbrainx.com/qbrainx-web/v1/banner/createBanner', body, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  bannerUpdate()
  {
    
   let body = new FormData();
  
   body.append("file", this.bannerImage);
   body.append("id", this.BannerUpdate.value.BannerId);
   body.append("bannerTitle", this.BannerUpdate.value.Title);
   body.append("bannerSubTitle", this.BannerUpdate.value.SubTitle);
   body.append("bannerCallOfAction", this.BannerUpdate.value.ButtonName);
   body.append("link", this.BannerUpdate.value.ButtonLink);
      
    
    this.httpClient
    .put('https://devsite.qbrainx.com/qbrainx-web/v1/banner/updateBannerDetailsById', body, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  bannerDelete(){
   this.httpClient
    .delete('https://devsite.qbrainx.com/qbrainx-web/v1/banner/deleteBannerById?id='+this.BannerDelete.value.Banner, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });
  }
}
