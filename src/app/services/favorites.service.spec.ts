import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FavoritesService } from './favorites.service';
import { IPhoto } from '../store/photos.model';

// Mock MatSnackBar
class MockMatSnackBar {
  open = jasmine.createSpy('open').and.returnValue({
    onAction: () => ({ subscribe: jasmine.createSpy('subscribe') })
  });
}

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockSnackBar: MockMatSnackBar;

  const mockPhoto: IPhoto = {
    id: '1',
    author: 'Test Author',
    width: 100,
    height: 100,
    url: 'test-url',
    download_url: 'test-download-url'
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    mockSnackBar = new MockMatSnackBar();

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        FavoritesService,
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });
    service = TestBed.inject(FavoritesService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty favorites', () => {
    expect(service.favorites()).toEqual([]);
  });

  it('should add photo to favorites', () => {
    service.add(mockPhoto);
    expect(service.favorites()).toContain(mockPhoto);
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('should not add duplicate photos', () => {
    service.add(mockPhoto);
    service.add(mockPhoto); // Try to add same photo again

    expect(service.favorites().length).toBe(1);
    expect(service.favorites()).toContain(mockPhoto);
  });

  it('should remove photo from favorites', () => {
    service.add(mockPhoto);
    service.remove(mockPhoto.id);

    expect(service.favorites()).not.toContain(mockPhoto);
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('should check if photo is favorite', () => {
    expect(service.isFavorite(mockPhoto.id)).toBeFalse();

    service.add(mockPhoto);
    expect(service.isFavorite(mockPhoto.id)).toBeTrue();
  });

  it('should clear all favorites', () => {
    service.add(mockPhoto);
    service.clear();

    expect(service.favorites()).toEqual([]);
  });
});
