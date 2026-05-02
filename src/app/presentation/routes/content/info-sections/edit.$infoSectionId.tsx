import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../../entry/ui/pageWrapper/PageWrapper';
import {Stack, Text} from '@chakra-ui/react';
import {InfoSectionForm, type IInfoSectionFormProps} from './-ui/InfoSectionForm';
import {useMutation} from '@tanstack/react-query';
import {runSubmitWithToast} from '../../../shared/lib/runSubmitWithToast';
import {imageDto} from '../../../../../data/shared/entity/image';
import {CustomContainer} from '@/app/presentation/shared/ui/container/Container';

export const Route = createFileRoute('/content/info-sections/edit/$infoSectionId')({
    component: RouteComponent,
    loader: async ({context, params}) => ({
        infoSection: await context.useCases.getInfoSection().execute(params.infoSectionId),
        services: await context.useCases.getServiceList().execute(),
        editInfoSectionUseCase: context.useCases.editInfoSection(),
        uploadImageUseCase: context.useCases.uploadImage(),
    }),
});

function RouteComponent() {
    const navigate = useNavigate();
    const router = useRouter();
    const {infoSection, services, editInfoSectionUseCase, uploadImageUseCase} =
        Route.useLoaderData();

    const editInfoSection = useMutation({
        mutationFn: async (data: Parameters<IInfoSectionFormProps['onSubmit']>[0]) =>
            await runSubmitWithToast(
                () =>
                    editInfoSectionUseCase.execute(infoSection.id, {
                        name: data.name,
                        title: data.title,
                        description: data.description,
                        serviceIds: data.serviceIds,
                        imageIds: data.images.map(img => img.id),
                    }),
                {
                    successTitle: 'Раздел обновлен',
                    successDescription: 'Изменения сохранены',
                    errorTitle: 'Ошибка обновления',
                    errorDescription: 'Не удалось сохранить изменения',
                },
            ),
    });

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <CustomContainer asChild>
                    <Stack gap='6'>
                        <Text textTransform='uppercase' letterSpacing='wide'>
                            Редактировать информационный раздел
                        </Text>
                        <InfoSectionForm
                            uploadImageUseCase={uploadImageUseCase}
                            services={services}
                            formData={{
                                name: infoSection.name,
                                title: infoSection.title,
                                description: infoSection.description,
                                serviceIds: infoSection.serviceIds,
                                images: infoSection.images.map(img => imageDto.parse(img)),
                            }}
                            isLoading={editInfoSection.isPending}
                            onSubmit={async data => {
                                const ok = await editInfoSection.mutateAsync(data);
                                if (ok) {
                                    await router.invalidate();
                                    navigate({to: '/content/info-sections'});
                                }
                            }}
                        />
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
