import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {PageWrapperContent, PageWrapperRoot} from '../../entry/ui/pageWrapper/PageWrapper';
import {Button, Field, Input, Stack, Text} from '@chakra-ui/react';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {runSubmitWithToast} from '../../shared/lib/runSubmitWithToast';
import { CustomContainer } from '../../shared/ui/container/Container';

type ContactForm = {phone: string; address: string; messenger: string};

export const Route = createFileRoute('/content/contacts')({
    component: RouteComponent,
    loader: async ({context}) => ({
        contact: await context.useCases.getContact().execute(),
        editContactUseCase: context.useCases.editContact(),
    }),
});

function RouteComponent() {
    const navigate = useNavigate();
    const {contact, editContactUseCase} = Route.useLoaderData();

    const form = useForm<ContactForm>({
        defaultValues: contact ?? {address: '', messenger: '', phone: ''},
    });
    const save = useMutation({
        mutationFn: async (data: ContactForm) =>
            await runSubmitWithToast(() => editContactUseCase.execute(data), {
                successTitle: 'Контакты обновлены',
                successDescription: 'Изменения сохранены',
                errorTitle: 'Ошибка обновления',
                errorDescription: 'Не удалось сохранить контакты',
            }),
    });

    return (
        <PageWrapperRoot>
            <PageWrapperContent gap='4'>
                <CustomContainer asChild >
                    <Stack asChild gap='6'>
                        <form
                            onSubmit={form.handleSubmit(async data => {
                                const ok = await save.mutateAsync(data);
                                if (ok) navigate({to: '/content'});
                            })}
                        >
                            <Text textTransform='uppercase' letterSpacing='wide'>
                                Контакты
                            </Text>
                            <Controller
                                control={form.control}
                                name='phone'
                                render={({field}) => (
                                    <Field.Root>
                                        <Field.Label>Телефон</Field.Label>
                                        <Input {...field} />
                                    </Field.Root>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='address'
                                render={({field}) => (
                                    <Field.Root>
                                        <Field.Label>Адрес</Field.Label>
                                        <Input {...field} />
                                    </Field.Root>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='messenger'
                                render={({field}) => (
                                    <Field.Root>
                                        <Field.Label>Мессенджер</Field.Label>
                                        <Input {...field} />
                                    </Field.Root>
                                )}
                            />
                            <Stack direction='row'>
                                <Button
                                    type='button'
                                    variant='outline'
                                    flex='1'
                                    onClick={() => navigate({to: '/content'})}
                                >
                                    Отмена
                                </Button>
                                <Button loading={save.isPending} type='submit' flex='1'>
                                    Сохранить
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </CustomContainer>
            </PageWrapperContent>
        </PageWrapperRoot>
    );
}
