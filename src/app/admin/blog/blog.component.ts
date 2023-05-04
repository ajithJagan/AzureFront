import { Component } from '@angular/core';
import { AdminPanalService } from '../admin-panal.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  BlogForm= new FormGroup({
    Title: new FormControl(''),
    SubTitle:new FormControl(''),
    BlogDetails:new FormControl(''),
    BannerImage: new FormControl(''),
  });
  bannerImage!:File;
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

        ['clean'],                                         // remove formatting button

        ['link'],
        //['link', 'image', 'video']  
      ],
      
    },
  }
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
  blogSubmit()
  {
    
   let body = new FormData();
  
   body.append("file", this.bannerImage);
   body.append("title", this.BlogForm.value.Title);
   body.append("subTitle", this.BlogForm.value.SubTitle);
   body.append("text", JSON.stringify(this.BlogForm.value.BlogDetails));
    // console.log("asdasdasd",this.BlogForm.value);
    // return
    this.httpClient
    .post('https://devsite.qbrainx.com/qbrainx-web/v1/Blogs/create', body, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
}
