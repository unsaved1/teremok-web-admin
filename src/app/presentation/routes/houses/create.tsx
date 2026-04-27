import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {HouseForm, type IHouseFormProps} from './-ui/HouseForm';
import {Text} from '@chakra-ui/react';

export const Route = createFileRoute('/houses/create')({
    component: RouteComponent,
    loader: ({context}) => ({
        createHouseUseCase: context.useCases.createHouse(),
    }),
});

function RouteComponent() {
    const navigate = useNavigate();
    const {createHouseUseCase} = Route.useLoaderData();
    const handleSubmit: IHouseFormProps['onSubmit'] = async data => {
        await createHouseUseCase.execute(data);
        navigate({to: '/houses', search: {offset: 0, limit: 24}});
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent>
                <Text mb='12px'>Добавить дом</Text>
                <HouseForm onSubmit={handleSubmit} />
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
