import {ImageLib} from '@/app/shared/lib/image';
import {
    Box,
    Button,
    Field,
    HStack,
    Icon,
    Image,
    Input,
    Show,
    Stack,
    Text,
    Textarea,
    type StackProps,
    FileUpload,
    type FileUploadRootProps,
} from '@chakra-ui/react';

import {type UploadImageUseCase} from '@/app/useCase/uploadImageUseCase';
import {type ChangeEvent} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {LuImage, LuUpload, LuX} from 'react-icons/lu';
import {HiUpload} from 'react-icons/hi';
import {useMutation} from '@tanstack/react-query';
import {imageDto} from '@/data/shared/entity/image';
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

    const uploadFile = useMutation({
        mutationFn: async (files: Array<File>) => {
            const uploadedImages = [];
            for (const f of files) {
                const uploaded = await uploadImageUseCase.execute(f);
                uploadedImages.push(uploaded);
            }
            const prev = form.getValues('images') ?? [];
            form.setValue('images', [...prev, ...uploadedImages.map(img => imageDto.parse(img))], {
                shouldValidate: true,
            });
        },
    });

    const handleSelectFile: FileUploadRootProps['onFileAccept'] = async e => {
        await uploadFile.mutateAsync(e.files);
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
                                render={({field, fieldState}) => (
                                    <Field.Root flex='1'>
                                        <Field.Label>Цена (₽)</Field.Label>
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
                        </HStack>
                        <Controller
                            control={form.control}
                            name='images'
                            render={({field, fieldState}) => (
                                <Field.Root>
                                    <Field.Label>Изображения</Field.Label>
                                    <Stack gap='2' w='full'>
                                        {(field.value ?? []).map((img, idx) => (
                                            <HStack
                                                key={img.id}
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
                                                            when={
                                                                img.original_path ??
                                                                img.thumbnail_path
                                                            }
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
                                                    onClick={() =>
                                                        field.onChange(
                                                            (field.value ?? []).filter(
                                                                item => item !== img,
                                                            ),
                                                        )
                                                    }
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
                                        disabled={uploadFile.isPending}
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
                                    <Show when={fieldState.error?.message}>
                                        {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                                    </Show>
                                </Field.Root>
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
    const output = parseInt(e.target.value, 10);
    return isNaN(output) ? 0 : output;
};
