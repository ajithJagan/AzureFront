import { Component, OnInit } from '@angular/core';
import { PageServiceService } from 'src/app/PageServices/page-service.service';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})
export class WebinarComponent implements OnInit {
  webinarIndex :number =0;
  public webinarDetails:any=[];
  constructor(private service:PageServiceService) { }

  ngOnInit(): void {
    this.getWebinarDetails();
  }
getWebinarDetails() {
   this.service.getWebinarDetails().subscribe((res:any) => {
   res.forEach((e:any)=>{
   let extension= e.image.fileName.split('.');
       this.webinarDetails.push({
          image: e.image.data,
          extension: extension[1],
          title: e.title,
          subTitle: e.subTitle,
          id:e.id
        })
    });
  });
}

webinarDetail(id:any) {

}


}
