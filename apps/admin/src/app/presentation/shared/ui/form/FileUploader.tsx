import type {Nullable} from '@repo/shared/types';

import {ImageLib} from '@/app/shared/lib/image';

import {
    Box,
    Button,
    Field,
    FileUpload,
    HStack,
    Icon,
    Image,
    Show,
    Stack,
    Text,
    type FileUploadRootProps,
} from '@chakra-ui/react';

import {HiUpload} from 'react-icons/hi';
import {LuImage, LuUpload, LuX} from 'react-icons/lu';

export interface IFileData {
    id: string;
    path: string;
    thumbPath?: Nullable<string>;
    mimeType?: string;
}

export interface IFileUploaderProps<T extends IFileData = IFileData> {
    files: Array<T>;
    isLoading?: boolean;
    onDelete: (id: IFileData['id']) => Promise<void>;
    onUpload: (files: Array<File>) => Promise<void>;
    error?: string;
}

export function FileUploader<T extends IFileData>({
    files,
    error,
    isLoading,
    onUpload,
    onDelete,
}: IFileUploaderProps<T>) {
    const handleDeleteFile = (fileId: IFileData['id']) => {
        return async () => {
            await onDelete(fileId);
        };
    };
    const handleSelectFile: FileUploadRootProps['onFileAccept'] = async e => {
        await onUpload(e.files);
    };

    return (
        <Field.Root>
            <Field.Label>Изображения</Field.Label>
            <Stack gap='2' w='full'>
                {files.map((f, idx) => (
                    <HStack
                        key={f.id}
                        borderWidth='1px'
                        borderRadius='md'
                        px='3'
                        py='2'
                        justifyContent='space-between'
                    >
                        <HStack>
                            <Box
                                w='44px'
                                h='44px'
                                overflow='hidden'
                                borderRadius='md'
                                borderWidth='1px'
                            >
                                <Show
                                    when={f.path ?? f.thumbPath}
                                    fallback={
                                        <Box p='2' lineHeight='0'>
                                            <Icon>
                                                <LuImage />
                                            </Icon>
                                        </Box>
                                    }
                                >
                                    {path => (
                                        <Image
                                            w='full'
                                            h='full'
                                            objectFit='cover'
                                            src={ImageLib.createUrl(path)}
                                            alt={`image-${idx + 1}`}
                                        />
                                    )}
                                </Show>
                            </Box>
                            <Stack gap='0'>
                                <Text>image_{idx + 1}.jpg</Text>
                            </Stack>
                        </HStack>
                        <Button
                            type='button'
                            size='xs'
                            variant='ghost'
                            onClick={handleDeleteFile(f.id)}
                        >
                            <Icon>
                                <LuX />
                            </Icon>
                        </Button>
                    </HStack>
                ))}
            </Stack>
            <FileUpload.Root
                maxW='xl'
                alignItems='stretch'
                maxFiles={10}
                onFileAccept={handleSelectFile}
                disabled={isLoading}
            >
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <Button variant='outline' size='sm'>
                        <HiUpload /> Загрузить изображение
                    </Button>
                </FileUpload.Trigger>
                <FileUpload.Dropzone>
                    <Icon size='md' color='fg.muted'>
                        <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                        <Box>Перетащите файлы сюда</Box>
                        <Box color='fg.muted'>.png, .jpg до 5MB</Box>
                    </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
            </FileUpload.Root>
            <Show when={error}>{errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}</Show>
        </Field.Root>
    );
}
