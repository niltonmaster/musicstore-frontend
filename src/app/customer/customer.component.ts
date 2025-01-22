import { Component } from '@angular/core';
import { LoggedInHeaderComponent } from '../shared/logged-in-header/logged-in-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-customer',
    imports: [LoggedInHeaderComponent, FooterComponent, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
