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

import {type UploadImageUseCase} from '@/app/useCase/uploadImageUseCase';
import {type ChangeEvent} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {imageDto} from '@/data/shared/entity/image';
import {Fmt} from '@/app/shared/lib/fmt';
import {
    FileUploader,
    type IFileUploaderProps,
} from '@/app/presentation/shared/ui/form/FileUploader';
import {useFileUpload} from '@/app/presentation/shared/ui/form/lib/fileUpload';
import {imageToFileData} from '@/app/presentation/shared/ui/form/lib/mapping';

import * as z from 'zod';

const schema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
    beds: z.number(),
    price: z.number(),
    images: z.array(imageDto),
});

export interface IHouseFormProps extends Omit<StackProps, 'children' | 'onSubmit'> {
    uploadImageUseCase: UploadImageUseCase;
    formData?: z.infer<typeof schema>;
    onSubmit: (data: z.infer<typeof schema>) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export const HouseForm = ({
    formData,
    uploadImageUseCase,
    isLoading,
    onSubmit,
    onCancel,
    ...props
}: IHouseFormProps) => {
    const form = useForm({
        defaultValues: formData ?? {
            name: '',
            description: '',
            beds: 0,
            price: 0,
            images: [],
        },
        resolver: zodResolver(schema),
    });

    const uploadFile = useFileUpload(uploadImageUseCase.execute, imageToFileData);
    const handleUpload: IFileUploaderProps['onUpload'] = async data => {
        const uploadedImages = await uploadFile.mutateAsync(data);
        const prev = form.getValues('images') ?? [];
        form.setValue('images', [...prev, ...uploadedImages.map(img => imageDto.parse(img))], {
            shouldValidate: true,
        });
    };

    return (
        <Stack asChild {...props}>
            <form
                onSubmit={form.handleSubmit(data => {
                    onSubmit(data);
                })}
            >
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
                                        {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
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
                                    <Textarea {...field} value={field.value ?? ''} minH='110px' />
                                    <Show when={fieldState.error?.message}>
                                        {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                                    </Show>
                                </Field.Root>
                            )}
                        />
                        <HStack alignItems='start'>
                            <Controller
                                control={form.control}
                                name='beds'
                                render={({field, fieldState}) => (
                                    <Field.Root flex='1'>
                                        <Field.Label>Спальных мест</Field.Label>
                                        <Input
                                            {...field}
                                            type='number'
                                            value={handleTransformInput(field.value)}
                                            onChange={e => field.onChange(handleTransformOutput(e))}
                                        />
                                        <Show when={fieldState.error?.message}>
                                            {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                                        </Show>
                                    </Field.Root>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='price'
                                render={({field, fieldState}) => {
                                    const fmtValue = field.value > 0 ? Fmt.price(field.value) : '';
                                    return (
                                        <Field.Root flex='1'>
                                            <Field.Label>Цена (₽)</Field.Label>
                                            <Input
                                                {...field}
                                                value={fmtValue}
                                                onChange={e => {
                                                    field.onChange(Fmt.parsePrice(e.target.value));
                                                }}
                                            />
                                            <Show when={fieldState.error?.message}>
                                                {errMsg => (
                                                    <Field.ErrorText>{errMsg}</Field.ErrorText>
                                                )}
                                            </Show>
                                        </Field.Root>
                                    );
                                }}
                            />
                        </HStack>
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

const handleTransformInput = (value: number) =>
    isNaN(value) || value === 0 ? '' : value.toString();

const handleTransformOutput = (e: ChangeEvent<HTMLInputElement>) => {
    const output = parseInt(e.target.value.trim(), 10);
    return output;
};
