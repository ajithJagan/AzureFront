import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { CoreServiceComponent } from './core-service/core-service.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { LifeAtQbxComponent } from './life-at-qbx/life-at-qbx.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WhatWeOfferComponent } from './what-we-offer/what-we-offer.component';
import { ReachUsComponent } from './reach-us/reach-us.component';
import { ServicesComponent } from './services/services.component';
import { ItsmComponent } from './itsm/itsm.component';
import { ItsmfeaturesComponent } from './itsm/itsmfeatures/itsmfeatures.component';
import { ItsmadvantagesComponent } from './itsm/itsmadvantages/itsmadvantages.component';
import { HttpClientModule } from '@angular/common/http'
import { QuillModule } from 'ngx-quill';
import { BlogComponent } from './blog/blog.component';
import { WebinarComponent } from './webinar/webinar.component';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, BannerComponent, CoreServiceComponent, WhoWeAreComponent, LifeAtQbxComponent, WhatWeOfferComponent, ReachUsComponent, ServicesComponent, ItsmComponent, ItsmfeaturesComponent, ItsmadvantagesComponent, BlogComponent,WebinarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:    [ AdminComponent ]
})
export class AdminModule { }
