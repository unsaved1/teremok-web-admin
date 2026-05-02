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
    type ButtonProps,
    Stack,
    Carousel,
    Badge,
    Box,
    HStack,
} from '@chakra-ui/react';
import type {IHouse} from '@/domain/entity/house/interfaces';
import {ImageLib} from '../../../shared/lib/image';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {LuImage} from 'react-icons/lu';
import {CloseButton} from '../../shared/ui/base/close-button';
import {Fmt} from '../../../shared/lib/fmt';
import {CustomContainer} from '../../shared/ui/container/Container';

type HousesRouteSearchParams = {
    limit?: number;
    offset?: number;
};

export const Route = createFileRoute('/houses/')({
    validateSearch: (search: Record<string, unknown>): HousesRouteSearchParams => {
        return {
            limit: search.limit ? parseInt(search.limit as string) : 24,
            offset: search.offset ? parseInt(search.offset as string) : 0,
        };
    },
    component: RouteComponent,
    loaderDeps: ({search: {offset, limit}}) => ({offset, limit}),
    loader: async ({context, deps: {offset, limit}}) => {
        const getHouseListUseCase = context.useCases.getHouseList();
        const res = await getHouseListUseCase.execute(offset!!, limit!!);
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
                <CustomContainer asChild>
                    <Stack gap={'6'}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'xl'} fontWeight={'medium'}>
                                Домики
                            </Text>
                            <Button asChild>
                                <Link to='/houses/create'>+ Добавить</Link>
                            </Button>
                        </HStack>
                        <List.Root listStyle={'none'} gap={'12px'}>
                            {houses.items.map(h => (
                                <List.Item w={'full'} key={h.id}>
                                    <HouseCard data={h} onDelete={handleDelete} />
                                </List.Item>
                            ))}
                        </List.Root>
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}

interface IHouseCardProps extends CardRootProps {
    data: IHouse;
    onDelete: (id: IHouse['id']) => Promise<void>;
}

function getHouseImageUrls(data: IHouse['images']) {
    return data
        .map(item => item.image.thumbnail_path ?? item.image.original_path)
        .filter((path): path is string => Boolean(path))
        .map(path => ImageLib.createUrl(path));
}

const HouseCard = ({data, onDelete}: IHouseCardProps) => {
    const [activeSlideIndex, setPage] = useState(0);
    const [failedImageIndexes, setFailedImageIndexes] = useState<Record<number, boolean>>({});
    const validImageUrls = getHouseImageUrls(data.images).filter(
        (_, index) => !failedImageIndexes[index],
    );

    const hasImages = validImageUrls.length > 0;

    const handleDelete: ButtonProps['onClick'] = e => {
        e.preventDefault();
        onDelete(data.id);
    };

    return (
        <Card.Root w='full' overflow='hidden' position={'relative'} bg='surface.card'>
            <Box position='relative' bg='bg.muted' minH='140px'>
                <Show when={hasImages}>
                    <Carousel.Root
                        allowMouseDrag
                        autoSize
                        maxH={'240px'}
                        page={activeSlideIndex}
                        slideCount={validImageUrls.length}
                        onPageChange={details => setPage(details.page)}
                    >
                        <Carousel.ItemGroup>
                            {validImageUrls.map((src, index) => (
                                <Carousel.Item
                                    key={`${data.id}-${index}`}
                                    index={index}
                                    alignItems={'center'}
                                    display={'flex'}
                                    bg={'green.600'}
                                >
                                    <Image
                                        src={src}
                                        alt={`${data.name}-${index + 1}`}
                                        w='full'
                                        h='200px'
                                        objectFit='contain'
                                        onError={() => {
                                            setFailedImageIndexes(prev => ({
                                                ...prev,
                                                [index]: true,
                                            }));
                                            setPage(0);
                                        }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel.ItemGroup>
                    </Carousel.Root>
                </Show>
                <Show when={!hasImages}>
                    <Center h='140px'>
                        <Icon color='fg.muted' boxSize='6'>
                            <LuImage />
                        </Icon>
                    </Center>
                </Show>
                {hasImages && (
                    <Box position='absolute' right='8px' bottom='8px'>
                        <Text
                            px='2'
                            py='1'
                            borderRadius='md'
                            textStyle='xs'
                            bg='blackAlpha.700'
                            color='white'
                        >
                            {`${activeSlideIndex + 1} / ${validImageUrls.length}`}
                        </Text>
                    </Box>
                )}
            </Box>
            <Card.Body gap='2'>
                <Stack direction='row' justify='space-between' align='center'>
                    <Card.Title fontWeight={'medium'}>{data.name}</Card.Title>
                    <Badge
                        bg={hasImages ? 'status.active.bg' : 'status.warning.bg'}
                        color={hasImages ? 'status.active.fg' : 'status.warning.fg'}
                    >
                        {hasImages ? 'Активен' : 'Без фото'}
                    </Badge>
                </Stack>
                <Show when={data.description}>
                    {value => <Card.Description>{value}</Card.Description>}
                </Show>
                <Text textStyle='xl' fontWeight='medium' letterSpacing='tight' mt='2'>
                    {Fmt.price(data.price)} руб
                </Text>
            </Card.Body>
            <Card.Footer gap='2'>
                <Button variant='solid' flex='1' asChild>
                    <Link to='/houses/edit/$houseId' params={{houseId: data.id}}>
                        Редактировать
                    </Link>
                </Button>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button flex='1' variant={'outline'}>
                            Удалить
                        </Button>
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
                                        <Button onClick={handleDelete}>
                                            Удалить
                                        </Button>
                                    </Dialog.ActionTrigger>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size='sm' />
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Card.Footer>
        </Card.Root>
    );
};
