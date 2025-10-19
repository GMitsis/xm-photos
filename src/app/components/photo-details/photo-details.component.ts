import { ActivatedRoute, Params } from '@angular/router';
import { Component, effect, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PhotosFacade } from '../../store/photos.facade';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-photo-details',
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './photo-details.component.html',
    styleUrl: './photo-details.component.scss'
})
export class PhotoDetailsComponent implements OnDestroy {
    private activatedRoute = inject(ActivatedRoute);

    private photosFacade = inject(PhotosFacade);
    private favoritesService = inject(FavoritesService);

    private params = toSignal(this.activatedRoute.params);

    private detailsEffect = effect(() => {
        const params = this.params();
        if (params?.['id']) {
            this.photosFacade.loadPhotoById(params['id']);
        }
    });

    photo = this.photosFacade.photo;


    ngOnDestroy(): void {
        this.photosFacade.clearPhoto();
    }

    remove(id: string | undefined): void {
        if (id) {
            this.favoritesService.remove(id);
        }
    }
}
