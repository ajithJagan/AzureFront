import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { BannerComponent } from './banner/banner.component';
import { CoreServiceComponent } from './core-service/core-service.component';
import { LifeAtQbxComponent } from './life-at-qbx/life-at-qbx.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { WhatWeOfferComponent } from './what-we-offer/what-we-offer.component';
import { ReachUsComponent } from './reach-us/reach-us.component';
import { ServicesComponent } from './services/services.component';
import { ItsmComponent } from './itsm/itsm.component';
import { ItsmfeaturesComponent } from './itsm/itsmfeatures/itsmfeatures.component';
import { ItsmadvantagesComponent } from './itsm/itsmadvantages/itsmadvantages.component';
import { WebinarComponent } from './webinar/webinar.component';
import { BlogComponent } from './blog/blog.component';
import { CasestudyComponent } from './casestudy/casestudy.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'coreService', component: CoreServiceComponent },
  { path: 'whoWeAre', component: WhoWeAreComponent },
  { path: 'life-Qbx', component: LifeAtQbxComponent },
  { path: 'whatWeOffer', component: WhatWeOfferComponent },
  { path: 'reachus', component: ReachUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'itsm', component: ItsmComponent },
  { path: 'itsm-features', component: ItsmfeaturesComponent },
  { path: 'itsm-advantages', component: ItsmadvantagesComponent },
  { path: 'webinar', component: WebinarComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'casestudy', component: CasestudyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
