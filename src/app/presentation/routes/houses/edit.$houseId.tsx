import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router';
import {HouseForm, type IHouseFormProps} from './-ui/HouseForm';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {Stack, Text} from '@chakra-ui/react';
import {imageDto} from '../../../../data/shared/entity/image';
import {runSubmitWithToast} from '../../shared/lib/runSubmitWithToast';
import {useMutation} from '@tanstack/react-query';
import {CustomContainer} from '../../shared/ui/container/Container';

export const Route = createFileRoute('/houses/edit/$houseId')({
    component: RouteComponent,
    loader: async ({context, params}) => {
        const getHouseUseCase = context.useCases.getHouse();
        const house = await getHouseUseCase.execute(params.houseId);
        return {
            house,
            editHouseUseCase: context.useCases.editHouse(),
            uploadImageUseCase: context.useCases.uploadImage(),
        };
    },
});

function RouteComponent() {
    const router = useRouter();
    const navigate = useNavigate();
    const {house, editHouseUseCase, uploadImageUseCase} = Route.useLoaderData();

    const editHouse = useMutation({
        mutationFn: async (data: Parameters<IHouseFormProps['onSubmit']>[0]) => {
            return await runSubmitWithToast(
                () =>
                    editHouseUseCase.execute(house.id, {
                        name: data.name,
                        beds: data.beds,
                        price: data.price,
                        description: data.description,
                        imageIds: data.images.map(img => img.id),
                    }),
                {
                    successTitle: 'Дом обновлен',
                    successDescription: 'Изменения успешно сохранены',
                    errorTitle: 'Ошибка обновления',
                    errorDescription: 'Не удалось сохранить изменения',
                },
            );
        },
    });

    const handleSubmit: IHouseFormProps['onSubmit'] = async data => {
        const isSubmitted = await editHouse.mutateAsync(data);
        if (!isSubmitted) {
            return;
        }

        router.invalidate();
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <CustomContainer asChild>
                    <Stack gap={'6'}>
                        <Text textTransform='uppercase' letterSpacing='wide'>
                            Редактировать дом
                        </Text>
                        <HouseForm
                            isLoading={editHouse.isPending}
                            formData={{
                                name: house.name,
                                description: house.description,
                                beds: house.beds,
                                price: house.price,
                                images: house.images.map(item => imageDto.parse(item.image)),
                            }}
                            onSubmit={handleSubmit}
                            onCancel={() =>
                                navigate({to: '/houses', search: {offset: 0, limit: 24}})
                            }
                            uploadImageUseCase={uploadImageUseCase}
                        />
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
