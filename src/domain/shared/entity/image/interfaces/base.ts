import type {Nullable} from '@/shared/types';

export interface IImage {
    id: string;
    original_path: string;
    thumbnail_path: Nullable<string>;
    mime_type: string;
    size_bytes: number;
    created_at: Nullable<Date>;
}
