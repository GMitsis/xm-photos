import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IPhoto } from '../store/photos.model';
import { Observable } from 'rxjs/internal/Observable';




@Injectable({
    providedIn: 'root'
})
export class PhotosService {
    private httpClient = inject(HttpClient);

    private photosUrl: string;

    constructor() {
        this.photosUrl = 'https://picsum.photos';
    }

    getPhotos(params: HttpParams): Observable<IPhoto[]> {
        return this.httpClient.get<IPhoto[]>(`${this.photosUrl}/v2/list`, { params });
    }

    getPhotoById(id: string, width = 1280, height = 720): Observable<Blob> {
        return this.httpClient.get(`${this.photosUrl}/id/${id}/${width}/${height}`, { responseType: 'blob' });
    }
}
