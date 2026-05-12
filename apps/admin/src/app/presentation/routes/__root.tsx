import {Outlet, createRootRouteWithContext} from '@tanstack/react-router';
import {AppEntry} from '../entry/AppEntry';
import type {QueryClient} from '@tanstack/react-query';
import {EAuthIntent} from './-viewModel/auth/interfaces';
import type {useAuthVMStore} from '@/main';
import type {useCases} from '@/app/di/container';
import {PageWrapperContent, PageWrapperRoot} from '../entry/ui/pageWrapper/PageWrapper';
import {Header} from '../entry/ui/header';
import {CustomContainer} from '../shared/ui/container/Container';
import {Logging} from '@repo/shared/lib';

const logger = new Logging('root');

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
    onError: err => {
        logger.error('exc', err.data);
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
