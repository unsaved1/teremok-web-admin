import {config} from './shared/config/config.ts';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {useCases} from './app/di/container.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createAuthVMStore} from '@/presentation/routes/-viewModel/auth/store.ts';

import {UiProvider} from '@/presentation/shared/ui/base/provider.tsx';
import {Stack} from '@chakra-ui/react';

import '@/presentation/fonts.css';

export const queryClient = new QueryClient();

export const useAuthVMStore = createAuthVMStore({
    user: null,
    isAuth: false,
    _logoutUseCase: useCases.logout(),
    _signinUseCase: useCases.signin(),
});

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: {
        queryClient: queryClient,
        useAuthVMStore: useAuthVMStore,
        useCases: useCases,
    },
    Wrap: function WrapComponent({children}) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById('root')!;

const Main = () => {
    return (
        <UiProvider>
            <Stack flex={'1'} gap={0}>
                <RouterProvider router={router} />
            </Stack>
        </UiProvider>
    );
};

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    if (config.app.strictMode) {
        root.render(
            <StrictMode>
                <Main />
            </StrictMode>,
        );
    }
    root.render(<Main />);
}
