import {useMutation, type AnyUseMutationOptions} from '@tanstack/react-query';
import type {IFileData} from '../FileUploader';

export function useFileUpload<T>(
    uploadFn: (data: File) => Promise<T>,
    mapper: (data: T) => IFileData,
    options?: Omit<AnyUseMutationOptions, 'mutationFn'>,
) {
    const uploadFile = useMutation({
        mutationFn: async (files: Array<File>) => {
            const uploadedImages = [];
            for (const f of files) {
                const uploaded = await uploadFn(f);
                uploadedImages.push(uploaded);
            }
            return uploadedImages.map(mapper);
        },
        ...options,
    });
    return uploadFile;
}
