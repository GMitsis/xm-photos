import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

import { PhotosService } from './photos.service';
import { IPhoto } from '../store/photos.model';

describe('PhotosService', () => {
    let service: PhotosService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PhotosService]
        });
        service = TestBed.inject(PhotosService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch photos', () => {
        const mockPhotos: IPhoto[] = [
            {
                id: '1',
                author: 'Test Author',
                width: 100,
                height: 100,
                url: 'test-url',
                download_url: 'test-download-url'
            }
        ];

        const params = new HttpParams().set('page', '1');

        service.getPhotos(params).subscribe(photos => {
            expect(photos).toEqual(mockPhotos);
        });

        const req = httpMock.expectOne(req =>
            req.url === 'https://picsum.photos/v2/list' &&
            req.params.get('page') === '1'
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockPhotos);
    });

    it('should fetch photo by id as blob', () => {
        const mockBlob = new Blob(['test image data'], { type: 'image/jpeg' });

        service.getPhotoById('123', 640, 480).subscribe(blob => {
            expect(blob).toEqual(mockBlob);
        });

        const req = httpMock.expectOne('https://picsum.photos/id/123/640/480');
        expect(req.request.method).toBe('GET');
        expect(req.request.responseType).toBe('blob');
        req.flush(mockBlob);
    });
});
