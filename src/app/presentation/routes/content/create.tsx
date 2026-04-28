import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {ServiceForm, type IServiceFormProps} from './-ui/ServiceForm';
import {Container, Stack, Text} from '@chakra-ui/react';
import {runSubmitWithToast} from '../../shared/lib/runSubmitWithToast';
import {useMutation} from '@tanstack/react-query';

export const Route = createFileRoute('/content/create')({
    component: RouteComponent,
    loader: ({context}) => ({
        createServiceUseCase: context.useCases.createService(),
        uploadImageUseCase: context.useCases.uploadImage(),
    }),
});

function RouteComponent() {
    const navigate = useNavigate();
    const {createServiceUseCase, uploadImageUseCase} = Route.useLoaderData();

    const createService = useMutation({
        mutationFn: async (data: Parameters<IServiceFormProps['onSubmit']>[0]) => {
            return await runSubmitWithToast(
                () =>
                    createServiceUseCase.execute({
                        name: data.name,
                        description: data.description,
                        imageIds: data.images.map(img => img.id),
                    }),
                {
                    successTitle: 'Услуга создана',
                    successDescription: 'Запись успешно добавлена',
                    errorTitle: 'Ошибка создания',
                    errorDescription: 'Не удалось добавить запись',
                },
            );
        },
    });

    const handleSubmit: IServiceFormProps['onSubmit'] = async data => {
        const isSubmitted = await createService.mutateAsync(data);
        if (!isSubmitted) {
            return;
        }

        navigate({to: '/content'});
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <Container asChild maxW='md'>
                    <Stack gap='6'>
                        <Text textTransform='uppercase' letterSpacing='wide'>
                            Добавить услугу
                        </Text>
                        <ServiceForm
                            isLoading={createService.isPending}
                            uploadImageUseCase={uploadImageUseCase}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate({to: '/content'})}
                        />
                    </Stack>
                </Container>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
