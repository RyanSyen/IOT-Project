import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { environment } from '../environments/environment';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ! unsupported firebase initialization
// import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideStorage, getStorage } from '@angular/fire/storage';

// * Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';

//* Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//* primeng ui component
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';

import { RealTimeDBComponent } from './component/real-time-db/real-time-db.component';
import { TestComponent } from './component/test/test.component';
import { SidemenuComponent } from './component/sidemenu/sidemenu.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TempNventComponent } from './component/temp-nvent/temp-nvent.component';
import { ParkingComponent } from './component/parking/parking.component';
import { LightingComponent } from './component/lighting/lighting.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { DoorbellComponent } from './component/doorbell/doorbell.component';
import { ReportComponent } from './component/report/report.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RealTimeDBComponent,
    TestComponent,
    SidemenuComponent,
    DashboardComponent,
    TempNventComponent,
    ParkingComponent,
    LightingComponent,
    AttendanceComponent,
    DoorbellComponent,
    ReportComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase1),
    AngularFirestoreModule, // Only required for cloud database features
    AngularFireAuthModule, // Only required for auth features
    AngularFireStorageModule, // Only required for storage features
    AngularFireDatabaseModule, // Only required for realtime database features
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    OverlayPanelModule,
    ToastModule,
    TooltipModule,
    HttpClientModule,
    DropdownModule,
    MessageModule,
    TabMenuModule,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService, MessageService, AngularFirestoreModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
