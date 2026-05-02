import type {AuthTokenStorage} from '@/data/entity/auth/interfaces';
import type {AuthRepository} from '@/domain/entity/auth/repository';

export class AuthInitException extends Error {}

export class InitAuthUseCase {
    constructor(
        private authRepo: AuthRepository,
        private tokenStorage: AuthTokenStorage,
    ) {}

    async execute(): Promise<void> {
        const refreshToken = this.tokenStorage.getRefreshToken();
        if (!refreshToken) {
            throw new AuthInitException();
        }
        const res = await this.authRepo.refresh({refresh_token: refreshToken});
        this.tokenStorage.setRefreshToken(res.refreshToken);
        this.tokenStorage.setAccessToken(res.accessToken);
    }
}
