import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  
})
export class BlogDetailComponent implements OnInit {

  id: any ;
  blogResult=[];
  blogData = [];
  blogArray = [];
  constructor(private _activatedRoute: ActivatedRoute, private _router:Router,private httpClient : HttpClient) { 
    _activatedRoute.queryParams.subscribe(
      params => this.id = params['id']);
   }

  ngOnInit(): void {
    this.blogSingle();
    this.blogList();

  }
  blogSingle(){
    this.httpClient
    .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/Blogs/getById?id='+this.id,  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.blogResult.push({data});
      this.blogResult.forEach((e,index) => {
       let text = e.data.text.slice(1, -1);
       let re = /<p><br>/gi; 
       text = text.replace(re, ""); 
       let re1 = /<p>/gi; 
       text = text.replace(re1, "<p class='para'>"); 
       text = text.replace(/\\"/g, '"');
       this.blogData.push({
            image: e.data.image.data,
            extension: e.data.image.fileName,
            title: e.data.title,
            subTitle: e.data.subTitle,
            date: e.data.date,
            text: text
          })
      });
      
  });
  
  }
  blogList(){
    this.httpClient
    .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/Blogs/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.blogArray = data; 
  });
  }
  
  
}
