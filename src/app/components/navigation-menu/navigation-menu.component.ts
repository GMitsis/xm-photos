import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-navigation-menu',
    imports: [
        MatButtonModule,
        MatToolbarModule,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './navigation-menu.component.html',
    styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {



}
