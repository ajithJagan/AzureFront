import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/AdminServices/admin-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { NgbCarouselConfig, NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})

export class WebinarComponent implements OnInit {

    webinarForm= new FormGroup({
        Title: new FormControl(''),
        SubTitle:new FormControl(''),
        WebinarDetails:new FormControl(''),
        WebinarImage: new FormControl(''),
      });
      webinarImage!:File;
      hideModal:boolean=false;
      bannerObj: any;
      public webinarDetails:any=[];
      WebinarUpdate = new FormGroup({
        Title: new FormControl(''),
        SubTitle:new FormControl(''),
        BannerImage: new FormControl(''),
        Text: new FormControl('')

      });

      WebinarDelete = new FormGroup({
        Webinar: new FormControl(''),
    
      });
      formEdit = false;
      html='';
      quillConfig={
        //toolbar: '.toolbar',
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //[{ 'direction': 'rtl' }],                         // text direction
    
            //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
            //[{ 'font': [] }],
            //[{ 'align': [] }],
    
            ['clean'],                                        
    
            ['link'],
           
          ],
          
        },
      }
  selectedWebinarId: any;
  updateDetails: any;
  extension: any;
  image: any;
  title: any;
  subTitle: any;
  seletedValue:any;
  text: any;
  WebinarUpdateId: any;
      constructor(private adminService:AdminServiceService,private toast:ToastrService, private router:Router,private httpClient : HttpClient) { 

      }
      ngOnInit(): void {
        this.getAllWebinarDetails()
      }
    
      banImage(event:any)
      {
        
        if (
          event.target.files[0].type == 'image/png' ||
          event.target.files[0].type == 'image/gif' ||
          event.target.files[0].type == 'image/jpeg' ||
          event.target.files[0].type == 'image/jpg'
        ){
          this.webinarImage=event.target.files[0];
        }
        else {
          alert("Select Only Image")
        }
      }
      webinarSubmit()
      {
        
       let body = new FormData();
       body.append("file", this.webinarImage);
       body.append("title", this.webinarForm.value.Title);
       body.append("subTitle", this.webinarForm.value.SubTitle);
       body.append("text", JSON.stringify(this.webinarForm.value.WebinarDetails));
       this.adminService.createWebinar(body).subscribe((res:any) => {
        
         if(res) { 
          this.toast.success('Webinar post created successfully', 'Success!')  
          this.webinarForm.reset();  
          window.location.reload();
  
        }
        else {
          this.toast.error('Error creating Webinar', 'Error !')
        }
       }
       )
      }

getAllWebinarDetails() {
  this.adminService.getWebinarDetails().subscribe((res:any) => {
    res.forEach((e:any)=>{
    let extension= e.image.fileName.split('.');
        this.webinarDetails.push({
           image: e.image.data,
           extension: extension[1],
           title: e.title,
           subTitle: e.subTitle,
           id:e.id,
           text:e.text,
           fileName:e.image.fileName
         })
     });
   });
      }



selectedId(id:any) {
    this.selectedWebinarId=id;
      }

updateId(id:any) {
  
  this.WebinarUpdateId=id;
  this.adminService.getWebinarDetailsById(id).subscribe((res:any) => {
    this.updateDetails=JSON.parse(res);
    if(this.updateDetails) {
      this.WebinarUpdate.get('Title')?.setValue(this.updateDetails.title);
      this.WebinarUpdate.get('SubTitle')?.setValue(this.updateDetails.subTitle);
      this.WebinarUpdate.get('Text')?.setValue((this.updateDetails.text)?.replace(/['"]+/g, ''));
    }
 })
}

webinarDelete() {
       this.adminService.deleteWebinarDetails(this.selectedWebinarId).subscribe((res:any)=> {
        this.toast.success('Webinar post deleted successfully', 'Success!')  
        this.WebinarDelete.reset();
        window.location.reload();
       })
      }
   
updateWebinar() {
  let body = new FormData();
  body.append("file", this.webinarImage);
  body.append("title", this.WebinarUpdate.value.Title);
  body.append("subTitle", this.WebinarUpdate.value.SubTitle);
  body.append("text", JSON.stringify(this.WebinarUpdate.value.Text));
  this.adminService.updateWebinarDetails(this.WebinarUpdateId,body).subscribe((res:any) => {
        
  if(res) { 
   this.toast.success('Webinar post updated successfully', 'Success!')  
   window.location.reload();
 }
 else {
   this.toast.error('Error updating Webinar', 'Error !')
 }
}
)
      }

}