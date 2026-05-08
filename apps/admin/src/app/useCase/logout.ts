import type {AuthTokenStorage} from '@/data/entity/auth/interfaces';
import type {ILogoutInput} from '@/domain/entity/auth/interfaces';
import type {AuthRepository} from '@/domain/entity/auth/repository';

export class LogoutUseCase {
    constructor(
        private authRepo: AuthRepository,
        private authTokenStorage: AuthTokenStorage,
    ) {}

    async execute(data: ILogoutInput): Promise<void> {
        await this.authRepo.logout(data);
        this.authTokenStorage.clearTokens();
    }
}
