import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { IPhoto } from '../../store/photos.model';

@Component({
    selector: 'app-photo-grid',
    imports: [
        CommonModule,
        MatGridListModule,
    ],
    templateUrl: './photo-grid.component.html',
    styleUrl: './photo-grid.component.scss'
})
export class PhotoGridComponent {
    header = input<string>();
    photos = input.required<IPhoto[]>();

    photoClick = output<IPhoto>();

    onPhotoClick(photo: IPhoto): void {
        this.photoClick.emit(photo);
    }
}
