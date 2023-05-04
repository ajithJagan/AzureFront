import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent implements OnInit {

  WhoWeAreForm= new UntypedFormGroup({
    // Title: new FormControl(''),
    Description:new UntypedFormControl(''),
    CTA:new UntypedFormControl(''),
    WhoWeAreImage: new UntypedFormControl(''),
  });
  whoWeAreImage: any;
  whoweareObj: any;
  wwrData: any;
  
 WhoWeAreFormUpdate = new UntypedFormGroup({  
  Description:new UntypedFormControl(''),
  CTA:new UntypedFormControl(''),
  WhoWeAreImage: new UntypedFormControl(''),
  WhoweareId: new UntypedFormControl(''),
  });
  WhoWeAreFormDelete = new UntypedFormGroup({
    Whoweare: new UntypedFormControl('')
  });
  formEdit: any = false;
  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
  }
  imageValidate(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.whoWeAreImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  whoSubmit()
  {
    
   let body = new FormData();
  
   body.append("file", this.whoWeAreImage);
   body.append("description", this.WhoWeAreForm.value.Description);
   body.append("link", this.WhoWeAreForm.value.CTA);
      
    
    this.httpClient
    .post('https://devsite.qbrainx.com/qbrainx-web/v1/whoWeAre/create', body, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  getAll(){
    this.httpClient
    .get<any>('https://devsite.qbrainx.com/qbrainx-web/v1/whoWeAre/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.wwrData = data;
      // console.log(this.wwrData);
      
    });
  }
  onChange(event:any) { 
    this.httpClient
    .get<any>('https://devsite.qbrainx.com/qbrainx-web/v1/whoWeAre/getById?id='+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.formEdit = true;
        this.whoweareObj = data;
        
    });
  }
  whoweareUpdate()
  {
    
   let body = new FormData();
  
   body.append("file", this.whoWeAreImage);
   body.append("id", this.WhoWeAreFormUpdate.value.WhoweareId);
   body.append("description", this.WhoWeAreFormUpdate.value.Description);
   body.append("link", this.WhoWeAreFormUpdate.value.CTA);
      
    
    this.httpClient
    .put('https://devsite.qbrainx.com/qbrainx-web/v1/whoWeAre/updateDetailsById', body, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  delete(){
    this.httpClient
     .delete('https://devsite.qbrainx.com/qbrainx-web/v1/whoWeAre/deleteById?id='+this.WhoWeAreFormDelete.value.Whoweare, {
       responseType: 'text' as 'json'
     })
     .subscribe((data) => {
       window.location.reload();
     });
   }
  
}
