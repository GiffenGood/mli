import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginComponent } from './login/login.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { TestComponent } from './test/test.component';
import { MatNativeDateModule } from '@angular/material';
import { CustomerListService } from './customer-list/customer-list.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerListComponent,
    MainMenuComponent,
    SideNavComponent,
    CustomerDetailComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'MLI Portal'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule
  ],
  providers: [CustomerListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
