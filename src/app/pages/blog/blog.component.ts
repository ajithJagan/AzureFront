import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogArray = [];
  constructor(private httpClient : HttpClient) { }
  

  ngOnInit(): void {
    this.blogList();
  }
  blogList(){
    this.httpClient
    .get<any[]>('https://devsite.qbrainx.com/qbrainx-web/v1/Blogs/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      data.forEach((e,index) => {
       let extension = e.image.fileName.split('.');
       this.blogArray.push({
            image: e.image.data,
            extension: extension[1],
            text: e.text,
            subTitle: e.subTitle,
            title: e.title,
            date:e.date,
            id:e.id
          })
      });
  });
  }

}
