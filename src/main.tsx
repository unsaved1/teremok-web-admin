import {config} from './shared/config/config.ts';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {useCases} from './app/di/container.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createAuthVMStore} from './app/presentation/routes/-viewModel/auth/store.ts';

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

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    if (config.app.strictMode) {
        root.render(
            <StrictMode>
                <RouterProvider router={router} />
            </StrictMode>,
        );
    }
    root.render(<RouterProvider router={router} />);
}
