import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { WebinarComponent } from './webinar/webinar.component';
import { LeadershipComponent } from './leadership/leadership.component';
import { NewsComponent } from './news/news.component';
import { CareerComponent } from './career/career.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { LeadershipDetailComponent } from './leadership/leadership-detail/leadership-detail.component';
import { AboutComponent } from './about/about.component';
import { HttpHeaders,HttpClient, HttpClientModule } from '@angular/common/http';
import { WebinarDetailComponent } from './webinar/webinar-detail/webinar-detail.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    SuccessStoriesComponent,
    ServicesComponent,
    BlogComponent,
    BlogDetailComponent,
    WebinarComponent,
    WebinarDetailComponent,
    LeadershipComponent,
    NewsComponent,
    CareerComponent,
    ContactComponent,
    LeadershipDetailComponent,
    AboutComponent,
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PagesModule { }
