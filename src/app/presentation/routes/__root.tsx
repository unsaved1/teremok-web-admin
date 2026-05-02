import {Outlet, createRootRouteWithContext} from '@tanstack/react-router';
import {AppEntry} from '../entry/AppEntry';
import type {QueryClient} from '@tanstack/react-query';
import {EAuthIntent} from './-viewModel/auth/interfaces';
import type {useAuthVMStore} from '@/main';
import type {useCases} from '@/app/di/container';
import {PageWrapperContent, PageWrapperRoot} from '../entry/ui/pageWrapper/PageWrapper';
import {Header} from '../entry/ui/header';
import {CustomContainer} from '../shared/ui/container/Container';

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
    useAuthVMStore: typeof useAuthVMStore;
    useCases: Omit<typeof useCases, 'signin' | 'logout'>;
}>()({
    component: RootComponent,
    beforeLoad: async ({context}) => {
        const authDispatch = context.useAuthVMStore.getState().dispatch;
        await authDispatch({type: EAuthIntent.INIT});
    },
    preload: true,
    onError: () => {
        console.log('errro');
    },
    errorComponent: () => {
        return (
            <>
                <Header />
                <PageWrapperRoot>
                    <PageWrapperContent>
                        <CustomContainer>Произошла непредвиденная ошибка</CustomContainer>
                    </PageWrapperContent>
                </PageWrapperRoot>
            </>
        );
    },
});

function RootComponent() {
    return (
        <AppEntry>
            <Outlet />
        </AppEntry>
    );
}
