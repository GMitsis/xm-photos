import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PhotoGridComponent } from './photo-grid.component';
import { IPhoto } from '../../store/photos.model';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;

  const mockPhotos: IPhoto[] = [
    {
      id: '1',
      author: 'Test Author 1',
      width: 100,
      height: 100,
      url: 'test-url-1',
      download_url: 'test-download-url-1'
    },
    {
      id: '2',
      author: 'Test Author 2',
      width: 200,
      height: 200,
      url: 'test-url-2',
      download_url: 'test-download-url-2'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGridComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('photos', mockPhotos);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display photos', () => {
    expect(component.photos()).toEqual(mockPhotos);
  });

  it('should emit photoClick when onPhotoClick is called', () => {
    spyOn(component.photoClick, 'emit');
    const mockPhoto = mockPhotos[0];

    component.onPhotoClick(mockPhoto);
    expect(component.photoClick.emit).toHaveBeenCalledWith(mockPhoto);
  });
});
