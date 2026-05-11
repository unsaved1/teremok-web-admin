export interface AuthTokenStorage {
    getAccessToken(): string | null;
    setAccessToken(value: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(value: string): void;
    clearTokens(): void;
}
