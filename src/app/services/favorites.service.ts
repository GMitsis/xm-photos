import { effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IPhoto } from '../store/photos.model';

const FAVORITES_KEY = 'xm_favorites';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    private _favorites = signal<IPhoto[]>(this.loadFromLocalStorage());
    private snackBar = inject(MatSnackBar);

    readonly favorites = this._favorites.asReadonly();

    constructor() {
        effect(() => {
            this.saveToLocalStorage(this._favorites());
        });
    }

    add(photo: IPhoto) {
        const current = this._favorites();
        if (!current.find(p => p.id === photo.id)) {
            this._favorites.set([...current, photo]);
            this.showSuccessMessage(`Photo by ${photo.author} added to favorites!`);
        } else {
            this.showSuccessMessage(`Photo is already in favorites!`);
        }
    }

    remove(id: string) {
        this._favorites.set(this._favorites().filter(p => p.id !== id));

        this.showSuccessMessage(`Photo removed from favorites!`);
    }

    clear() {
        this._favorites.set([]);
    }

    isFavorite(id: string): boolean {
        return this._favorites().some(p => p.id === id);
    }

    private loadFromLocalStorage(): IPhoto[] {
        try {
            const data = localStorage.getItem(FAVORITES_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    private saveToLocalStorage(favorites: IPhoto[]) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    private showSuccessMessage(message: string) {
        this.snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}
