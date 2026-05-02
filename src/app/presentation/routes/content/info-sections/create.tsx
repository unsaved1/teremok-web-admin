import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../../entry/ui/pageWrapper/PageWrapper';
import {Stack, Text} from '@chakra-ui/react';
import {InfoSectionForm, type IInfoSectionFormProps} from './-ui/InfoSectionForm';
import {useMutation} from '@tanstack/react-query';
import {runSubmitWithToast} from '../../../shared/lib/runSubmitWithToast';
import {CustomContainer} from '@/app/presentation/shared/ui/container/Container';

export const Route = createFileRoute('/content/info-sections/create')({
    component: RouteComponent,
    loader: async ({context}) => ({
        services: await context.useCases.getServiceList().execute(),
        createInfoSectionUseCase: context.useCases.createInfoSection(),
        uploadImageUseCase: context.useCases.uploadImage(),
    }),
});

function RouteComponent() {
    const navigate = useNavigate();
    const {services, createInfoSectionUseCase, uploadImageUseCase} = Route.useLoaderData();

    const createInfoSection = useMutation({
        mutationFn: async (data: Parameters<IInfoSectionFormProps['onSubmit']>[0]) =>
            await runSubmitWithToast(
                () =>
                    createInfoSectionUseCase.execute({
                        name: data.name,
                        title: data.title,
                        description: data.description,
                        serviceIds: data.serviceIds,
                        imageIds: data.images.map(img => img.id),
                    }),
                {
                    successTitle: 'Раздел создан',
                    successDescription: 'Запись успешно добавлена',
                    errorTitle: 'Ошибка создания',
                    errorDescription: 'Не удалось добавить запись',
                },
            ),
    });

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <CustomContainer asChild>
                    <Stack gap='6'>
                        <Text textTransform='uppercase' letterSpacing='wide'>
                            Добавить информационный раздел
                        </Text>
                        <InfoSectionForm
                            uploadImageUseCase={uploadImageUseCase}
                            services={services}
                            isLoading={createInfoSection.isPending}
                            onSubmit={async data => {
                                const ok = await createInfoSection.mutateAsync(data);
                                if (ok) navigate({to: '/content/info-sections'});
                            }}
                        />
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
