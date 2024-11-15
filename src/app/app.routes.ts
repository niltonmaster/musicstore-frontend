import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    //cada rtua va ser un objeto de JS

    {
        path: "",
        pathMatch: 'full',
        // component: HomeComponent,
        redirectTo: 'home'

    },
    {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent


    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent


    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent


    }
    ,
    // {
    //     path: 'forgot-password',
    //     pathMatch: 'full',
    //     // component: ForgotPassword


    // }



];
