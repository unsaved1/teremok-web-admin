import type {Nullable} from '@repo/shared/types';

export interface IImage {
    id: string;
    originalPath: string;
    thumbnailPath: Nullable<string>;
    mimeType: string;
    sizeBytes: number;
    createdAt: Nullable<Date>;
}
