import {Link, createFileRoute, useRouteContext, useRouter} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {Button, Card, Dialog, HStack, List, Portal, Stack, Text} from '@chakra-ui/react';
import {CloseButton} from '../../shared/ui/base/close-button';
import {useMutation} from '@tanstack/react-query';
import type {IService} from '@/domain/entity/content/interfaces';
import { CustomContainer } from '../../shared/ui/container/Container';

export const Route = createFileRoute('/content/')({
    component: RouteComponent,
    loader: async ({context}) => ({services: await context.useCases.getServiceList().execute()}),
});

function RouteComponent() {
    const router = useRouter();
    const routerCtx = useRouteContext({from: '__root__'});
    const {services} = Route.useLoaderData();

    const deleteService = useMutation({
        mutationFn: async (id: IService['id']) => await routerCtx.useCases.deleteService().execute(id),
    });

    const handleDelete = async (id: IService['id']) => {
        await deleteService.mutateAsync(id);
        router.invalidate();
    };

    return (
        <PageWrapperRoot>
            <PageWrapperContent>
                <CustomContainer asChild >
                    <Stack gap='6'>
                        <HStack justifyContent='space-between'>
                            <Text fontSize='xl' fontWeight='medium'>
                                Контент: Услуги
                            </Text>
                            <HStack>
                                <Button variant='outline' asChild>
                                    <Link to='/content/info-sections'>Инфо раздел</Link>
                                </Button>
                                <Button variant='outline' asChild>
                                    <Link to='/content/contacts'>Контакты</Link>
                                </Button>
                                <Button asChild>
                                    <Link to='/content/create'>+ Добавить</Link>
                                </Button>
                            </HStack>
                        </HStack>
                        <List.Root listStyle='none' gap='12px'>
                            {services.map(s => (
                                <List.Item key={s.id}>
                                    <Card.Root w='full' bg='surface.card'>
                                        <Card.Body>
                                            <Card.Title>{s.name}</Card.Title>
                                            <Card.Description>{s.description}</Card.Description>
                                        </Card.Body>
                                        <Card.Footer gap='2'>
                                            <Button variant='solid' flex='1' asChild>
                                                <Link to='/content/edit/$serviceId' params={{serviceId: s.id}}>
                                                    Редактировать
                                                </Link>
                                            </Button>
                                            <Dialog.Root>
                                                <Dialog.Trigger asChild>
                                                    <Button flex='1' colorPalette='red'>
                                                        Удалить
                                                    </Button>
                                                </Dialog.Trigger>
                                                <Portal>
                                                    <Dialog.Backdrop />
                                                    <Dialog.Positioner padding='10px'>
                                                        <Dialog.Content mt='30px' background='white'>
                                                            <Dialog.Header>
                                                                <Dialog.Title>Удаление</Dialog.Title>
                                                            </Dialog.Header>
                                                            <Dialog.Body>
                                                                <p>Вы уверены, что хотите удалить запись</p>
                                                            </Dialog.Body>
                                                            <Dialog.Footer>
                                                                <Dialog.ActionTrigger asChild>
                                                                    <Button variant='outline'>
                                                                        Отмена
                                                                    </Button>
                                                                </Dialog.ActionTrigger>
                                                                <Dialog.ActionTrigger asChild>
                                                                    <Button
                                                                        colorPalette='red'
                                                                        onClick={() =>
                                                                            handleDelete(s.id)
                                                                        }
                                                                    >
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
                                </List.Item>
                            ))}
                        </List.Root>
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
