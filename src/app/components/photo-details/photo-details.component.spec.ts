import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { signal } from '@angular/core';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotosFacade } from '../../store/photos.facade';
import { FavoritesService } from '../../services/favorites.service';
import { PhotosStore } from '../../store/photos.store';

// Mock services
class MockPhotosFacade {
  photo = signal(null);
  loadPhotoById = jasmine.createSpy('loadPhotoById');
}

class MockFavoritesService {
  remove = jasmine.createSpy('remove');
}

class MockActivatedRoute {
  params = of({ id: '123' });
}

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let mockPhotosFacade: MockPhotosFacade;
  let mockFavoritesService: MockFavoritesService;

  beforeEach(async () => {
    mockPhotosFacade = new MockPhotosFacade();
    mockFavoritesService = new MockFavoritesService();

    await TestBed.configureTestingModule({
      imports: [PhotoDetailsComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PhotosFacade, useValue: mockPhotosFacade },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        PhotosStore
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove photo from favorites', () => {
    component.remove('123');
    expect(mockFavoritesService.remove).toHaveBeenCalledWith('123');
  });

  it('should not remove photo if id is undefined', () => {
    component.remove(undefined);
    expect(mockFavoritesService.remove).not.toHaveBeenCalled();
  });
});
