import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthGenericService } from './services/auth-generic.service';
import { UserStoreService } from './services/user-store.service';
import { AdminGuard } from './guards/admin.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { UserGuard } from './guards/user.guard';



@NgModule({
  declarations: [
    
  ],
  imports: [
    
  ]
})
export class SharedServicesModule { 
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedServicesModule,
            providers: [AuthGenericService, UserStoreService, AdminGuard, TeacherGuard, UserGuard]
        }
    }
}
