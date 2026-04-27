import {Outlet, createRootRouteWithContext} from '@tanstack/react-router';
import {AppEntry} from '../entry/AppEntry';
import type {QueryClient} from '@tanstack/react-query';
import {UiProvider} from '../shared/ui/base/provider';
import {EAuthIntent} from './-viewModel/auth/interfaces';
import type {useAuthVMStore} from '@/main';
import type {useCases} from '@/app/di/container';

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
});

function RootComponent() {
    return (
        <UiProvider>
            <AppEntry>
                <Outlet />
            </AppEntry>
        </UiProvider>
    );
}
