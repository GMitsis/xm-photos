export interface IPhoto {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

export interface IPhotoBlob {
    id: string;
    blob: Blob;
    objectUrl: string;
}
