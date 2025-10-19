import { computed, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withProps,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { IPhoto, IPhotoBlob } from './photos.model';

import { PhotosService } from '../services/photos.service';

import { setPhoto, setPhotos } from './photos.updater';

import { catchError, EMPTY, map, mergeMap, pipe, tap, delay } from 'rxjs';

export interface PhotosState {
    photos: IPhoto[];
    photo: IPhotoBlob | null;
    loading: boolean;
    currentPage: number;
    hasMore: boolean;
}

export const initialState: PhotosState = {
    photos: [],
    photo: null,
    loading: false,
    currentPage: 1,
    hasMore: true,
};

export const PhotosStore = signalStore(
    withState(initialState),
    withComputed((state) => ({
        selectPhotos: computed(() => state.photos),
        selectPhoto: computed(() => state.photo),
        selectLoading: computed(() => state.loading),
        selectCurrentPage: computed(() => state.currentPage),
        selectHasMore: computed(() => state.hasMore),
    })),
    withProps(() => ({
        photosService: inject(PhotosService),
    })),
    withMethods(({ photosService, ...store }) => ({

        clearPhotos(): void {
            patchState(store, { photos: [] });
        },

        clearPhoto(): void {
            patchState(store, { photo: null });
        },

        loadPhotosRx: rxMethod<{ page?: number }>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                delay(Math.floor(Math.random() * (300 - 200 + 1)) + 200),
                mergeMap(({ page }) => {
                    const currentPage = page || store.currentPage() + 1;
                    const params = new HttpParams().set('page', currentPage.toString()).set('limit', '20');

                    return photosService.getPhotos(params).pipe(
                        tap((photos) => patchState(store, setPhotos(photos, currentPage))),
                        catchError(() => {
                            patchState(store, { loading: false });
                            return EMPTY;
                        }),
                    );
                }),
            ),
        ),

        loadPhotoByIdRx: rxMethod<string>(
            pipe(
                mergeMap((id) =>
                    photosService.getPhotoById(id).pipe(
                        tap((photo) => patchState(store, setPhoto(id, photo))),
                        catchError(() => EMPTY),
                    ),
                ),
            ),
        ),

    }))
)
