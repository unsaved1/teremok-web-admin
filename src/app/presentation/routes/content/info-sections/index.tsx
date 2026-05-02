import {Link, createFileRoute, useRouteContext, useRouter} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../../entry/ui/pageWrapper/PageWrapper';
import {Button, Card, Dialog, HStack, List, Portal, Stack, Text} from '@chakra-ui/react';
import {CloseButton} from '../../../shared/ui/base/close-button';
import {useMutation} from '@tanstack/react-query';
import type {IInfoSection} from '../../../../../domain/entity/content/interfaces';
import {CustomContainer} from '@/app/presentation/shared/ui/container/Container';

export const Route = createFileRoute('/content/info-sections/')({
    component: RouteComponent,
    loader: async ({context}) => ({
        infoSections: await context.useCases.getInfoSectionList().execute(),
    }),
});

function RouteComponent() {
    const router = useRouter();
    const routerCtx = useRouteContext({from: '__root__'});
    const {infoSections} = Route.useLoaderData();

    const deleteInfoSection = useMutation({
        mutationFn: async (id: IInfoSection['id']) =>
            await routerCtx.useCases.deleteInfoSection().execute(id),
    });

    return (
        <PageWrapperRoot>
            <PageWrapperContent>
                <CustomContainer asChild>
                    <Stack gap='6'>
                        <HStack justifyContent='space-between'>
                            <Text fontSize='xl' fontWeight='medium'>
                                Контент: Информационный раздел
                            </Text>
                            <Button asChild>
                                <Link to='/content/info-sections/create'>+ Добавить</Link>
                            </Button>
                        </HStack>
                        <List.Root listStyle='none' gap='12px'>
                            {infoSections.map(section => (
                                <List.Item key={section.id}>
                                    <Card.Root w='full' bg='surface.card'>
                                        <Card.Body>
                                            <Card.Title>{section.title}</Card.Title>
                                            <Card.Description>
                                                {section.description}
                                            </Card.Description>
                                        </Card.Body>
                                        <Card.Footer gap='2'>
                                            <Button variant='solid' flex='1' asChild>
                                                <Link
                                                    to='/content/info-sections/edit/$infoSectionId'
                                                    params={{infoSectionId: section.id}}
                                                >
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
                                                        <Dialog.Content
                                                            mt='30px'
                                                            background='white'
                                                        >
                                                            <Dialog.Header>
                                                                <Dialog.Title>
                                                                    Удаление
                                                                </Dialog.Title>
                                                            </Dialog.Header>
                                                            <Dialog.Body>
                                                                <p>
                                                                    Вы уверены, что хотите удалить
                                                                    запись
                                                                </p>
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
                                                                        onClick={async () => {
                                                                            await deleteInfoSection.mutateAsync(
                                                                                section.id,
                                                                            );
                                                                            router.invalidate();
                                                                        }}
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
