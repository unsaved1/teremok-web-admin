import {Link, createFileRoute, useRouteContext, useRouter} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {
    Button,
    Card,
    Text,
    type CardRootProps,
    Show,
    Image,
    List,
    Center,
    Dialog,
    Portal,
    Icon,
    IconButton,
    type ButtonProps,
} from '@chakra-ui/react';
import type {IHouse} from '@/domain/entity/house/interfaces';
import {ImageLib} from '../../../shared/lib/image';
import {CloseButton} from '../../shared/ui/base/close-button';
import {MdDelete} from 'react-icons/md';
import {useMutation} from '@tanstack/react-query';

export const Route = createFileRoute('/houses/')({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            limit: search.limit ? parseInt(search.limit as string) : 24,
            offset: search.offset ? parseInt(search.offset as string) : 0,
        };
    },
    component: RouteComponent,
    loaderDeps: ({search: {offset, limit}}) => ({offset, limit}),
    loader: async ({context, deps: {offset, limit}}) => {
        const getHouseListUseCase = context.useCases.getHouseList();
        const res = await getHouseListUseCase.execute(offset, limit);
        return {
            houses: res,
        };
    },
});

function RouteComponent() {
    const router = useRouter();
    const routerCtx = useRouteContext({from: '__root__'});
    const {houses} = Route.useLoaderData();

    const deleteHouse = useMutation({
        mutationFn: async (id: IHouse['id']) => {
            const deleteHouseUseCase = routerCtx.useCases.deleteHouse();
            await deleteHouseUseCase.execute(id);
        },
    });

    const handleDelete = async (id: IHouse['id']) => {
        await deleteHouse.mutateAsync(id);
        router.invalidate();
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent>
                <Text>Домики</Text>
                <Button asChild>
                    <Link to='/houses/create'>Добавить</Link>
                </Button>
                <Center>
                    <List.Root w='full' maxW='md' listStyle={'none'} gap={'12px'}>
                        {houses.items.map(h => (
                            <List.Item w={'full'} key={h.id}>
                                <HouseCard data={h} onDelete={handleDelete} />
                            </List.Item>
                        ))}
                    </List.Root>
                </Center>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}

interface IHouseCardProps extends CardRootProps {
    data: IHouse;
    onDelete: (id: IHouse['id']) => Promise<void>;
}

const HouseCard = ({data, onDelete}: IHouseCardProps) => {
    const handleDelete: ButtonProps['onClick'] = e => {
        e.preventDefault();
        onDelete(data.id);
    };
    return (
        <Card.Root w='full' overflow='hidden' position={'relative'}>
            <Show
                when={
                    data.house_images.length > 1 && data.house_images[0].thumbnail_path
                        ? data.house_images[0].thumbnail_path
                        : null
                }
            >
                {thumbPath => (
                    <Image
                        src={ImageLib.createUrl(thumbPath)}
                        alt={data.description || data.name}
                    />
                )}
            </Show>
            <Card.Body gap='2'>
                <Card.Title>{data.name}</Card.Title>
                <Show when={data.description}>
                    {value => <Card.Description>{value}</Card.Description>}
                </Show>
                <Text textStyle='2xl' fontWeight='medium' letterSpacing='tight' mt='2'>
                    {data.price}
                </Text>
            </Card.Body>
            <Card.Footer gap='2'>
                <Button variant='solid' asChild>
                    <Link to='/houses/edit/$houseId' params={{houseId: data.id}}>
                        Редактировать
                    </Link>
                </Button>
            </Card.Footer>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <IconButton size={'xs'} position={'absolute'} right={'8px'} top={'8px'}>
                        <Icon>
                            <MdDelete />
                        </Icon>
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner padding={'10px'}>
                        <Dialog.Content mt={'30px'} background={'white'}>
                            <Dialog.Header>
                                <Dialog.Title>Удаление</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <p>Вы уверены, что хотите удалить запись</p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant='outline'>Отмена</Button>
                                </Dialog.ActionTrigger>
                                <Dialog.ActionTrigger asChild>
                                    <Button onClick={handleDelete}>Удалить</Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Card.Root>
    );
};
