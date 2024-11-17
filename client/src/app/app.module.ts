// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { UserFormComponent } from './components/user-form/user-form.component';
// import { NavigationComponent } from './components/navigation/navigation.component';
// import { GameFormComponent } from './components/game-form/game-form.component';
// import { GameListComponent } from './components/game-list/game-list.component';
// import { GamesService } from './services/games.service';
// import { UserService } from './services/user.service';
// import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HomeComponent } from './components/home/home.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
// import {ToastrModule} from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SpinnerComponent } from './shared/spinner/spinner.component';
// import { addTokenInterceptor } from './utils/add-token.interceptor';

// @NgModule({
//   declarations: [
//     AppComponent,
//     UserFormComponent,
//     NavigationComponent,
//     GameFormComponent,
//     GameListComponent,
//     HomeComponent,
//     DashboardComponent,
//     LoginComponent,
//     RegisterComponent,
//     ResetpasswordComponent,
//     SpinnerComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     FormsModule,
//     ReactiveFormsModule,
//     BrowserAnimationsModule,
//     ToastrModule.forRoot({
//       positionClass: 'toast-top-right',
//       timeOut: 2000,
//       progressBar: true,
//       progressAnimation: 'decreasing',
//       preventDuplicates: true
//     })
//   ],
//   providers: [
//     GamesService,
//     UserService,
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: addTokenInterceptor,
//       multi: true  // Esto permite que varios interceptores sean usados si es necesario
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesService } from './services/games.service';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProfilesComponent } from './components/add-profiles/add-profiles.component';
import { LocationComponent } from './components/location/location.component';
import { VisualInformationComponent } from './components/visual-information/visual-information.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CallbackComponent } from './components/callback/callback.component';
import { PlusPsychologyComponent } from './components/plus-psychology/plus-psychology.component';
import { CitasComponent } from './components/citas/citas.component';
import { CitasFormComponent } from './components/citas-form/citas-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameFormComponent,
    GameListComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SpinnerComponent,
    ProfileComponent,
    AddProfilesComponent,
    LocationComponent,
    VisualInformationComponent,
    ContactComponent,
    PaypalComponent,
    CallbackComponent,
    PlusPsychologyComponent,
    CitasComponent,
    CitasFormComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPayPalModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true
    })
  ],
  providers: [
    GamesService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor, // Cambia a la clase
      multi: true // Esto permite que varios interceptores sean usados si es necesario
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
