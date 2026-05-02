import type {AuthTokenStorage} from '@/data/entity/auth/interfaces';
import type {ISigninInput} from '@/domain/entity/auth/interfaces';
import type {AuthRepository} from '@/domain/entity/auth/repository';

export class SigninUseCase {
    constructor(
        private authRepo: AuthRepository,
        private authTokenStorage: AuthTokenStorage,
    ) {}

    async execute(data: ISigninInput): Promise<void> {
        const res = await this.authRepo.signin(data);
        this.authTokenStorage.setRefreshToken(res.refreshToken);
    }
}
