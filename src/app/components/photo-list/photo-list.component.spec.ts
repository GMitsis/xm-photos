import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PhotoListComponent } from './photo-list.component';
import { PhotosStore } from '../../store/photos.store';

describe('PhotoListComponent', () => {
    let component: PhotoListComponent;
    let fixture: ComponentFixture<PhotoListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoListComponent, NoopAnimationsModule],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                PhotosStore
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PhotoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default header', () => {
        expect(component.header()).toBe('Browse Photos');
    });
});
