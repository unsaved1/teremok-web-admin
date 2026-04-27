import type {AuthTokenStorage} from '@/data/entity/auth/interfaces';
import {useAuthTokenStore} from '.';

const LS_AUTH_REFRESH_TOKEN = 'trmk_refresh_token';

export class AuthTokenStorageImpl implements AuthTokenStorage {
    getAccessToken(): string | null {
        const s = useAuthTokenStore.getState();
        return s.accessToken ?? null;
    }
    setAccessToken(value: string): void {
        useAuthTokenStore.setState({accessToken: value});
    }
    getRefreshToken(): string | null {
        const s = useAuthTokenStore.getState();
        return s.refreshToken;
    }
    setRefreshToken(value: string): void {
        localStorage.setItem(LS_AUTH_REFRESH_TOKEN, value);
        useAuthTokenStore.setState({refreshToken: value});
    }
    clearTokens(): void {
        localStorage.removeItem(LS_AUTH_REFRESH_TOKEN);
        const initState = useAuthTokenStore.getInitialState();
        useAuthTokenStore.setState(initState);
    }
}
