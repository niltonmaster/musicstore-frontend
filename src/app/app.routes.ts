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
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MyPurchasesComponent } from './customer/my-purchases/my-purchases.component';
import { ChangePasswordComponent } from './customer/change-password/change-password.component';
import { SalesComponent } from './sales/sales.component';
import { EventsComponent } from './admin/events/events.component';
import { GenresComponent } from './admin/genres/genres.component';
import { ReportsComponent } from './admin/reports/reports.component';

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
        pathMatch: 'prefix',
        component: AdminComponent,
        children: [
            {
                path: '',
                pathMatch: 'full'
                , redirectTo: 'sales'

            }
            ,
            {
                path: 'sales',
                pathMatch: 'full',
                component: SalesComponent
            },
            {
                path: 'events',
                pathMatch: 'full',
                component: EventsComponent
            }
            ,
            {
                path: 'genres',
                pathMatch: 'full',
                component: GenresComponent
            },
            {
                path: 'reports',
                pathMatch: 'full',
                component: ReportsComponent
            }


        ]

    },

    {
        path: 'customer',
        pathMatch: 'prefix',//importante significa que r¿ira mas como customer/xxxxx
        component: CustomerComponent,
        children: [
            {
                path: '',
                pathMatch: 'full'
                , redirectTo: 'my-purchases'

            }
            ,
            {
                path: 'my-purchases',
                pathMatch: 'full',
                component: MyPurchasesComponent
            }, {
                path: 'change-password',
                pathMatch: 'full',
                component: ChangePasswordComponent
            }


        ]


    }
    , {
        path: 'forgot-password',
        pathMatch: 'full',
        component: ForgotPasswordComponent


    }

    , {
        path: 'event-detail/:id',
        pathMatch: 'full',
        component: EventDetailComponent
    }
    ,
    //PENDIENTE
    {
        path: 'menu',
        pathMatch: 'full',
        component: AppComponent


    }



];
