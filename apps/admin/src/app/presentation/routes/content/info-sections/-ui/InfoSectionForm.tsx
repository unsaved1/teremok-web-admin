import {Button, Checkbox, Field, Input, Stack, Textarea} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import type {IService} from '@/domain/entity/content/interfaces';
import {imageDto, type TImageDto} from '@/data/shared/entity/image';
import type {UploadImageUseCase} from '@/app/useCase/uploadImageUseCase';
import {
    FileUploader,
    type IFileUploaderProps,
} from '@/app/presentation/shared/ui/form/FileUploader';
import {useFileUpload} from '@/app/presentation/shared/ui/form/lib/fileUpload';
import {imageToFileData} from '@/app/presentation/shared/ui/form/lib/mapping';

const schema = z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    description: z.string().nullable(),
    serviceIds: z.array(z.string()).default([]),
    images: z.array(imageDto),
});

export interface IInfoSectionFormProps {
    uploadImageUseCase: UploadImageUseCase;
    services: Array<IService>;
    formData?: z.infer<typeof schema>;
    isLoading?: boolean;
    onSubmit: (data: z.infer<typeof schema>) => Promise<void>;
}

export const InfoSectionForm = ({
    uploadImageUseCase,
    services,
    formData,
    isLoading,
    onSubmit,
}: IInfoSectionFormProps) => {
    const form = useForm({
        defaultValues: formData ?? {
            name: '',
            title: '',
            description: '',
            serviceIds: [],
            images: [],
        },
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack gap='3'>
                <Controller
                    name='name'
                    control={form.control}
                    render={({field}) => <Input {...field} placeholder='name' />}
                />
                <Controller
                    name='title'
                    control={form.control}
                    render={({field}) => <Input {...field} placeholder='title' />}
                />
                <Controller
                    name='description'
                    control={form.control}
                    render={({field}) => (
                        <Textarea {...field} value={field.value ?? ''} placeholder='description' />
                    )}
                />
                <Controller
                    name='serviceIds'
                    control={form.control}
                    render={({field}) => (
                        <Field.Root>
                            <Field.Label>Services</Field.Label>
                            <Stack>
                                {services.map(service => (
                                    <Checkbox.Root
                                        key={service.id}
                                        checked={(field.value ?? []).includes(service.id)}
                                        onCheckedChange={v => {
                                            if (v.checked) {
                                                field.onChange([
                                                    ...(field.value ?? []),
                                                    service.id,
                                                ]);
                                                return;
                                            }
                                            field.onChange(
                                                (field.value ?? []).filter(id => id !== service.id),
                                            );
                                        }}
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{service.name}</Checkbox.Label>
                                    </Checkbox.Root>
                                ))}
                            </Stack>
                        </Field.Root>
                    )}
                />
                <Controller
                    control={form.control}
                    name='images'
                    render={({field, fieldState}) => (
                        <FileUploader
                            files={field.value.map(f => ({
                                id: f.id,
                                path: f.original_path,
                                thumbPath: f.thumbnail_path,
                                mimeType: f.mime_type,
                            }))}
                            error={fieldState.error?.message}
                            isLoading={uploadFile.isPending}
                            onUpload={handleUpload}
                            onDelete={async id => {
                                field.onChange((field.value ?? []).filter(f => f.id !== id));
                            }}
                        />
                    )}
                />
                <Button loading={isLoading} type='submit'>
                    Сохранить
                </Button>
            </Stack>
        </form>
    );
};
