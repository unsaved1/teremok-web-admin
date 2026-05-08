import type {IImage} from './interfaces';

export abstract class ImageRepository {
    abstract upload(file: File): Promise<IImage>;
}
