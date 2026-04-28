import {AbsoluteCenter, Stack} from '@chakra-ui/react';
import type {IAppEntryProps} from './AppEntry.interfaces';
import {Header} from './ui/header';
import {SigninForm, type ISigninFormProps} from '../shared/ui/auth/SigninForm';
import {EAuthIntent} from '../routes/-viewModel/auth/interfaces';

import {useMutation} from '@tanstack/react-query';
import {useRouteContext} from '@tanstack/react-router';
import {runSubmitWithToast} from '../shared/lib/runSubmitWithToast';

export const AppEntry = ({children}: IAppEntryProps) => {
    const {useAuthVMStore} = useRouteContext({from: '__root__'});
    const isAuth = useAuthVMStore(s => s.isAuth);
    const dispatch = useAuthVMStore(s => s.dispatch);

    const submit = useMutation({
        mutationFn: async (data: Parameters<ISigninFormProps['onSubmit']>[0]) => {
            await dispatch({type: EAuthIntent.SIGNIN, payload: data});
        },
    });

    const handleSubmit: ISigninFormProps['onSubmit'] = async data => {
        await runSubmitWithToast(() => submit.mutateAsync(data), {
            successTitle: 'Успешный вход',
            successDescription: 'Авторизация выполнена',
            errorTitle: 'Ошибка входа',
            errorDescription: 'Не удалось выполнить авторизацию',
        });
    };

    return (
        <Stack flex={'1'} gap={'0'}>
            <Header />
            {isAuth ? (
                children
            ) : (
                <AbsoluteCenter width={'full'} maxWidth={'440px'}>
                    <SigninForm onSubmit={handleSubmit} />
                </AbsoluteCenter>
            )}
        </Stack>
    );
};
