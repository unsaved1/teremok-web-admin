import type {Nullable} from '@repo/shared/types';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type TAuthTokenStore = {
    accessToken?: Nullable<string>;
    refreshToken: Nullable<string>;
};

export const useAuthTokenStore = create(
    persist<TAuthTokenStore>(
        () => ({
            accessToken: null,
            refreshToken: null,
        }),
        {
            name: 'trmkAuth',
            partialize: s => ({refreshToken: s.refreshToken}),
        },
    ),
);
