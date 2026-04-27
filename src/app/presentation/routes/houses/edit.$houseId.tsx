import {createFileRoute, useRouter} from '@tanstack/react-router';
import {HouseForm, type IHouseFormProps} from './-ui/HouseForm';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {Text} from '@chakra-ui/react';

export const Route = createFileRoute('/houses/edit/$houseId')({
    component: RouteComponent,
    loader: async ({context, params}) => {
        const getHouseUseCase = context.useCases.getHouse();
        const house = await getHouseUseCase.execute(params.houseId);
        return {
            house,
            editHouseUseCase: context.useCases.editHouse(),
        };
    },
});

function RouteComponent() {
    const router = useRouter();
    const {house, editHouseUseCase} = Route.useLoaderData();
    const handleSubmit: IHouseFormProps['onSubmit'] = async data => {
        await editHouseUseCase.execute(house.id, data);
        router.invalidate();
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent>
                <Text mb='12px'>Редактировать дом</Text>
                <HouseForm
                    formData={{
                        name: house.name,
                        description: house.description,
                        beds: house.beds,
                        price: house.price,
                        image_ids: house.house_images.map(item => item.id),
                    }}
                    onSubmit={handleSubmit}
                />
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
