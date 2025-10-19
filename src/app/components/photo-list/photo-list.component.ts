import { Component, inject, OnInit, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, effect } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

import { PhotosFacade } from '../../store/photos.facade';
import { FavoritesService } from '../../services/favorites.service';
import { IPhoto } from '../../store/photos.model';

import { PhotoGridComponent } from '../photo-grid/photo-grid.component';

@Component({
    selector: 'app-photo-list',
    imports: [
        PhotoGridComponent,
        MatProgressSpinnerModule,
        CommonModule
    ],
    templateUrl: './photo-list.component.html',
    styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

    private photosFacade = inject(PhotosFacade);
    private favoritesService = inject(FavoritesService);
    private intersectionObserver?: IntersectionObserver;
    private isLoadingMore = false;

    header = signal('Browse Photos');

    photos = this.photosFacade.photos;
    loading = this.photosFacade.loading;
    hasMore = this.photosFacade.hasMore;


    loadingEffect = effect(() => {
        const photosCount = this.photos().length;
        const loading = this.loading();
        const hasMore = this.hasMore();

        if (!loading && hasMore && photosCount > 0) {
            setTimeout(() => this.observeScrollTrigger(), 200);
        }
    })

    ngOnInit(): void {
        this.photosFacade.loadPhotos(1);
    }

    ngAfterViewInit(): void {
        this.setupInfiniteScroll();
    }

    ngOnDestroy(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }

        this.photosFacade.clearPhotos();
    }

    private setupInfiniteScroll(): void {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.hasMore() && !this.loading() && !this.isLoadingMore) {
                    this.isLoadingMore = true;

                    this.photosFacade.loadPhotos();

                    setTimeout(() => {
                        this.isLoadingMore = false;
                    }, 1000);
                }
            });
        }, options);

        this.observeScrollTrigger();
    }

    private observeScrollTrigger(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }

        setTimeout(() => {
            const scrollTrigger = this.scrollContainer.nativeElement.querySelector('.scroll-trigger');
            if (scrollTrigger && this.intersectionObserver) {
                this.intersectionObserver.observe(scrollTrigger);
            }
        }, 100);
    }

    onPhotoClick(photo: IPhoto): void {
        this.favoritesService.add(photo);
    }
}
