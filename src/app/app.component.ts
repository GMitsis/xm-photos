import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'xm-photos';
}
