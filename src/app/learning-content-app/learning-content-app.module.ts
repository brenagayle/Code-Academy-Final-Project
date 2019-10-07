import { NgModule } from '@angular/core';

import { AngularFireStorageModule } from '@angular/fire/storage';
// import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';
import { HomepageComponent } from './homepage/homepage.component';
import { PublicContentComponent } from './public-content/public-content.component';
import { PublicCommentsComponent } from './public-comments/public-comments.component';
import { PrivateNotesComponent } from './private-notes/private-notes.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { StarRatingModule } from 'angular-star-rating';
import { RegServiceService } from './services/reg-service.service';
import { LearningFooterComponent } from './footer/footer.component';
import { DropZoneDirective } from './drop-zone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { UploaderComponent } from './uploader/uploader.component'
import { TestimonialsComponent } from './testimonials/testimonials.component';

import { ViewContentComponent } from './view-content/view-content.component';
import { TestimonialServiceService } from './services/testimonial.service';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LearningAppRoutingModule } from './learning-app-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { LearningComponent } from './learning-app.component';
import { SharedServicesModule } from '../shared/shared-service.module';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    LearningComponent,
    HomepageComponent,
    PublicContentComponent,
    PublicCommentsComponent,
    PrivateNotesComponent,
    LearningFooterComponent,
    ViewContentComponent,
    DropZoneDirective,
    UploadTaskComponent,
    UploaderComponent,
    TestimonialComponent,
    TestimonialsComponent,
    AboutComponent

  ],
  imports: [
    SharedModule,
    LearningAppRoutingModule,
    StarRatingModule.forRoot(),
  
    AngularFireStorageModule,
    SharedServicesModule,
    PdfViewerModule,
    MaterialModule,
    CommonModule
  ],
  exports:[
    LearningComponent,
    HomepageComponent,
    PublicContentComponent,
    PublicCommentsComponent,
    PrivateNotesComponent,
    LearningFooterComponent,
    ViewContentComponent,
    DropZoneDirective,
    UploadTaskComponent,
    UploaderComponent,
    TestimonialComponent,
    TestimonialsComponent,
    AboutComponent
  ]
  
})

export class LearningContentAppModule { }
