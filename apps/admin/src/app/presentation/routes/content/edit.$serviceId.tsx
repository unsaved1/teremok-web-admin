import {imageDto} from '../../../../data/shared/entity/image';
import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {ServiceForm, type IServiceFormProps} from './-ui/ServiceForm';
import {Stack, Text} from '@chakra-ui/react';
import {runSubmitWithToast} from '../../shared/lib/runSubmitWithToast';
import {useMutation} from '@tanstack/react-query';
import {CustomContainer} from '../../shared/ui/container/Container';

export const Route = createFileRoute('/content/edit/$serviceId')({
    component: RouteComponent,
    loader: async ({context, params}) => ({
        service: await context.useCases.getService().execute(params.serviceId),
        editServiceUseCase: context.useCases.editService(),
        uploadImageUseCase: context.useCases.uploadImage(),
    }),
});

function RouteComponent() {
    const router = useRouter();
    const navigate = useNavigate();
    const {service, editServiceUseCase, uploadImageUseCase} = Route.useLoaderData();

    const editService = useMutation({
        mutationFn: async (data: Parameters<IServiceFormProps['onSubmit']>[0]) => {
            return await runSubmitWithToast(
                () =>
                    editServiceUseCase.execute(service.id, {
                        name: data.name,
                        description: data.description,
                        imageIds: data.images.map(img => img.id),
                    }),
                {
                    successTitle: 'Услуга обновлена',
                    successDescription: 'Изменения сохранены',
                    errorTitle: 'Ошибка обновления',
                    errorDescription: 'Не удалось сохранить изменения',
                },
            );
        },
    });

    const handleSubmit: IServiceFormProps['onSubmit'] = async data => {
        const isSubmitted = await editService.mutateAsync(data);
        if (!isSubmitted) {
            return;
        }

        router.invalidate();
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <CustomContainer asChild>
                    <Stack gap='6'>
                        <Text textTransform='uppercase' letterSpacing='wide'>
                            Редактировать услугу
                        </Text>
                        <ServiceForm
                            isLoading={editService.isPending}
                            formData={{
                                name: service.name,
                                description: service.description,
                                images: service.images.map(({image}) => imageDto.parse(image)),
                            }}
                            uploadImageUseCase={uploadImageUseCase}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate({to: '/content'})}
                        />
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
