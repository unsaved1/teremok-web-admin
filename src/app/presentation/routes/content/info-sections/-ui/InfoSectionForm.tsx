import {
    Box,
    Button,
    Checkbox,
    Field,
    FileUpload,
    HStack,
    Icon,
    Image,
    Input,
    Show,
    Stack,
    Text,
    Textarea,
    type FileUploadRootProps,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import type {IService} from '@/domain/entity/content/interfaces';
import {imageDto} from '@/data/shared/entity/image';
import {LuImage, LuUpload, LuX} from 'react-icons/lu';
import {ImageLib} from '@/app/shared/lib/image';
import {HiUpload} from 'react-icons/hi';
import {useMutation} from '@tanstack/react-query';
import type {UploadImageUseCase} from '@/app/useCase/uploadImageUseCase';

const schema = z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    description: z.string().nullable(),
    serviceIds: z.array(z.string()).default([]),
    images: z.array(imageDto).default([]),
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
                                                    when={img.original_path ?? img.thumbnail_path}
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
                <Button loading={isLoading} type='submit'>
                    Сохранить
                </Button>
            </Stack>
        </form>
    );
};
