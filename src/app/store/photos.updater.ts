import { IPhoto } from "./photos.model";
import { PhotosState } from "./photos.store";

export function setPhotos(photos: IPhoto[], currentPage: number, width = 600, height = 400): (state: PhotosState) => PhotosState {
    return (state: PhotosState): PhotosState => {
        const hasMore = photos.length === 20;

        const processedPhotos = photos.map(photo => ({
            ...photo,
            download_url: `https://picsum.photos/id/${photo.id}/${width}/${height}`,
        }));

        const existingPhotoIds = new Set(state.photos.map(photo => photo.id));
        const uniqueNewPhotos = processedPhotos.filter(photo => !existingPhotoIds.has(photo.id));

        const updatedPhotos = [...state.photos, ...uniqueNewPhotos];

        return {
            ...state,
            photos: updatedPhotos,
            loading: false,
            currentPage,
            hasMore
        };
    };
}

export function setPhoto(id: string, blob: Blob): (state: PhotosState) => PhotosState {
    return (state: PhotosState): PhotosState => {
        return { ...state, photo: { id, blob, objectUrl: URL.createObjectURL(blob) } };
    };
}
