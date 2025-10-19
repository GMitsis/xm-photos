import { inject, Injectable } from "@angular/core";

import { PhotosStore } from "./photos.store";

@Injectable({
    providedIn: 'root'
})
export class PhotosFacade {
    private store = inject(PhotosStore);

    public photos = this.store.selectPhotos();
    public photo = this.store.selectPhoto();
    public loading = this.store.selectLoading();
    public currentPage = this.store.selectCurrentPage();
    public hasMore = this.store.selectHasMore();

    loadPhotos(page?: number): void {
        this.store.loadPhotosRx({ page });
    }

    clearPhotos(): void {
        this.store.clearPhotos();
    }

    loadPhotoById(id: string): void {
        this.store.loadPhotoByIdRx(id);
    }

    clearPhoto(): void {
        this.store.clearPhoto();
    }
}
