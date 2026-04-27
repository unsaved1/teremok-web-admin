import {AbsoluteCenter, Stack} from '@chakra-ui/react';
import type {IAppEntryProps} from './AppEntry.interfaces';
import {Header} from './ui/header';
import {SigninForm, type ISigninFormProps} from '../shared/ui/auth/SigninForm';
import {EAuthIntent} from '../routes/-viewModel/auth/interfaces';

import {useMutation} from '@tanstack/react-query';
import {Delay} from '@/shared/lib/delay';
import {useRouteContext} from '@tanstack/react-router';

export const AppEntry = ({children}: IAppEntryProps) => {
    const {useAuthVMStore} = useRouteContext({from: '__root__'});
    const isAuth = useAuthVMStore(s => s.isAuth);
    const dispatch = useAuthVMStore(s => s.dispatch);

    const submit = useMutation({
        mutationFn: async (data: Parameters<ISigninFormProps['onSubmit']>[0]) => {
            await Promise.all([
                dispatch({type: EAuthIntent.SIGNIN, payload: data}),
                Delay.run(3000),
            ]);
        },
    });

    const handleSubmit: ISigninFormProps['onSubmit'] = async data => {
        await submit.mutateAsync(data);
    };

    return (
        <Stack flex={'1'}>
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
