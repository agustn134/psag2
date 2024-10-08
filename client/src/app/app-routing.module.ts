import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AuthGuard } from './utils/auth.guard'; // Cambiado a AuthGuard
import { ProfileComponent } from './components/profile/profile.component';
import { AddProfilesComponent } from './components/add-profiles/add-profiles.component';
import { LocationComponent } from './components/location/location.component';
import { VisualInformationComponent } from './components/visual-information/visual-information.component';
import { ContactComponent } from './components/contact/contact.component';
import { YtComponent } from './components/yt/yt.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'location', component: LocationComponent},
  { path: 'visual-information', component: VisualInformationComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'home/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GameListComponent, canActivate: [AuthGuard] }, // Usando AuthGuard
  { path: 'games/add', component: GameFormComponent, canActivate: [AuthGuard] }, // Usando AuthGuard
  { path: 'games/edit/:id', component: GameFormComponent, canActivate: [AuthGuard] }, // Protección añadida
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/add-profiles', component: AddProfilesComponent, canActivate: [AuthGuard] },
  { path: 'yt', component: YtComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
