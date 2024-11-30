import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { isLoggedIn } from './app.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

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
        component: LoginComponent,
        canActivate: [isLoggedIn]


    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent


    }
    ,

    {
        path: 'admin',
        pathMatch: 'full',
        component: AdminComponent


    },

    {
        path: 'customer',
        pathMatch: 'full',
        component: CustomerComponent


    }
    , {
        path: 'forgot-password',
        pathMatch: 'full',
        component: ForgotPasswordComponent


    }

    ,
    //PENDIENTE
    {
        path: 'menu',
        pathMatch: 'full',
        component: AppComponent


    }



];
