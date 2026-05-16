import {
    FileUploader,
    type IFileUploaderProps,
} from '@/presentation/shared/ui/form/FileUploader';
import {useFileUpload} from '@/presentation/shared/ui/form/lib/fileUpload';
import {imageToFileData} from '@/presentation/shared/ui/form/lib/mapping';
import {type UploadImageUseCase} from '@/app/useCase/uploadImageUseCase';
import {imageDto, type TImageDto} from '@/data/shared/entity/image';
import {
    Button,
    Field,
    HStack,
    Input,
    Show,
    Stack,
    Textarea,
    type StackProps,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
    images: z.array(imageDto),
});

export interface IServiceFormProps extends Omit<StackProps, 'children' | 'onSubmit'> {
    uploadImageUseCase: UploadImageUseCase;
    formData?: z.infer<typeof schema>;
    onSubmit: (data: z.infer<typeof schema>) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export const ServiceForm = ({
    formData,
    uploadImageUseCase,
    isLoading,
    onSubmit,
    onCancel,
    ...props
}: IServiceFormProps) => {
    const form = useForm({
        defaultValues: formData ?? {name: '', description: '', images: []},
        resolver: zodResolver(schema),
    });

    const uploadFile = useFileUpload(uploadImageUseCase.execute, imageToFileData);
    const handleUpload: IFileUploaderProps['onUpload'] = async data => {
        const uploadedImages = await uploadFile.mutateAsync(data);
        const prev = form.getValues('images') ?? [];
        form.setValue(
            'images',
            [
                ...prev,
                ...uploadedImages.map(img =>
                    imageDto.parse({
                        id: img.id,
                        created_at: null,
                        mime_type: img.mimeType || '',
                        original_path: img.path,
                        thumbnail_path: img.path,
                        size_bytes: img.sizyBytes,
                    } as TImageDto),
                ),
            ],
            {
                shouldValidate: true,
            },
        );
    };

    return (
        <Stack asChild {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack
                    borderWidth='1px'
                    borderRadius='xl'
                    overflow='hidden'
                    minH='calc(100dvh - 140px)'
                    justifyContent='space-between'
                >
                    <Stack gap='5' p='4' pb='28'>
                        <Controller
                            control={form.control}
                            name='name'
                            render={({field, fieldState}) => (
                                <Field.Root>
                                    <Field.Label>Название</Field.Label>
                                    <Input {...field} />
                                    <Show when={fieldState.error?.message}>
                                        {err => <Field.ErrorText>{err}</Field.ErrorText>}
                                    </Show>
                                </Field.Root>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name='description'
                            render={({field, fieldState}) => (
                                <Field.Root>
                                    <Field.Label>Описание</Field.Label>
                                    <Textarea {...field} value={field.value ?? ''} minH='140px' />
                                    <Show when={fieldState.error?.message}>
                                        {err => <Field.ErrorText>{err}</Field.ErrorText>}
                                    </Show>
                                </Field.Root>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name='images'
                            render={({field, fieldState}) => (
                                <FileUploader
                                    files={field.value?.map(f => ({
                                        id: f.id,
                                        path: f.original_path,
                                        thumbPath: f.thumbnail_path,
                                        mimeType: f.mime_type,
                                    }))}
                                    error={fieldState.error?.message}
                                    isLoading={uploadFile.isPending}
                                    onUpload={handleUpload}
                                    onDelete={async id => {
                                        field.onChange(
                                            (field.value ?? []).filter(f => f.id !== id),
                                        );
                                    }}
                                />
                            )}
                        />
                    </Stack>
                    <HStack
                        position='sticky'
                        bottom='0'
                        borderTopWidth='1px'
                        p='4'
                        bg='bg'
                        zIndex='1'
                    >
                        <Button type='button' variant='outline' flex='1' onClick={onCancel}>
                            Отмена
                        </Button>
                        <Button loading={isLoading} type='submit' flex='1'>
                            {formData ? 'Сохранить' : 'Создать'}
                        </Button>
                    </HStack>
                </Stack>
            </form>
        </Stack>
    );
};
