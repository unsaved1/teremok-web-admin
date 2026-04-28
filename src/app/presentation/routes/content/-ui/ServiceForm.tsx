import {ImageLib} from '@/app/shared/lib/image';
import {type UploadImageUseCase} from '@/app/useCase/uploadImageUseCase';
import {imageDto} from '@/data/shared/entity/image';
import {
    Box,
    Button,
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
    type StackProps,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';
import {HiUpload} from 'react-icons/hi';
import {LuImage, LuUpload, LuX} from 'react-icons/lu';
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
                                        {err => <Field.ErrorText>{err}</Field.ErrorText>}
                                    </Show>
                                </Field.Root>
                            )}
                        />
                    </Stack>
                    <HStack position='sticky' bottom='0' borderTopWidth='1px' p='4' bg='bg' zIndex='1'>
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
