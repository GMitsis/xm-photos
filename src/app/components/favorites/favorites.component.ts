import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { FavoritesService } from '../../services/favorites.service';

import { PhotoGridComponent } from '../photo-grid/photo-grid.component';

import { IPhoto } from '../../store/photos.model';

@Component({
    selector: 'app-favorites',
    imports: [
        PhotoGridComponent
    ],
    templateUrl: './favorites.component.html',
    styleUrls: [
        './favorites.component.scss',
        '../photo-list/photo-list.component.scss'
    ]
})
export class FavoritesComponent {
    private router = inject(Router);
    private favoritesService = inject(FavoritesService);

    photos = this.favoritesService.favorites;

    header = signal('My Favorites');

    onPhotoClick(photo: IPhoto): void {
        this.router.navigate(['/photo', photo.id]);
    }
}
