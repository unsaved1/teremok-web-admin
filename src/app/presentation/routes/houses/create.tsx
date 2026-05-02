import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {HouseForm, type IHouseFormProps} from './-ui/HouseForm';
import {Stack, Text} from '@chakra-ui/react';
import {runSubmitWithToast} from '../../shared/lib/runSubmitWithToast';
import {useMutation} from '@tanstack/react-query';
import {CustomContainer} from '../../shared/ui/container/Container';

export const Route = createFileRoute('/houses/create')({
    component: RouteComponent,
    loader: ({context}) => ({
        createHouseUseCase: context.useCases.createHouse(),
        uploadImageUseCase: context.useCases.uploadImage(),
    }),
});

function RouteComponent() {
    const navigate = useNavigate();
    const {createHouseUseCase, uploadImageUseCase} = Route.useLoaderData();

    const createHouse = useMutation({
        mutationFn: async (data: Parameters<IHouseFormProps['onSubmit']>[0]) => {
            return await runSubmitWithToast(
                () =>
                    createHouseUseCase.execute({
                        name: data.name,
                        beds: data.beds,
                        description: data.description,
                        price: isNaN(+data.price) ? 0 : parseInt(data.price),
                        imageIds: data.images.map(img => img.id),
                    }),
                {
                    successTitle: 'Дом создан',
                    successDescription: 'Карточка дома успешно добавлена',
                    errorTitle: 'Ошибка создания',
                    errorDescription: 'Не удалось добавить дом',
                },
            );
        },
    });

    const handleSubmit: IHouseFormProps['onSubmit'] = async data => {
        const isSubmitted = await createHouse.mutateAsync(data);
        if (!isSubmitted) {
            return;
        }
        navigate({to: '/houses', search: {offset: 0, limit: 24}});
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <CustomContainer asChild>
                    <Stack gap={'6'}>
                        <Text textTransform='uppercase' letterSpacing='wide'>
                            Добавить дом
                        </Text>
                        <HouseForm
                            isLoading={createHouse.isPending}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate({to: '/houses'})}
                            uploadImageUseCase={uploadImageUseCase}
                        />
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
