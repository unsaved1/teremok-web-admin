import {AuthRepositoryImpl} from '@/data/entity/auth/repositoryImpl';
import {HouseRemoteDataSource} from '@/data/entity/house';
import {HouseRepositoryImpl} from '@/data/entity/house/repositoryImpl';
import {SigninUseCase} from '../useCase/signin';
import {GetHouseListUseCase} from '../useCase/getHouseList';
import axios from 'axios';
import {config} from '@/shared/config';
import {AuthRemoteDataSource} from '@/data/entity/auth/ds/remoteImpl';
import {AxiosHttpClient} from '@/data/shared/remote';
import {AuthTokenStorageImpl} from '../presentation/auth/token/storageImpl';
import {LogoutUseCase} from '../useCase/logout';
import {InitAuthUseCase} from '../useCase/resfreshAuthTokens';
import {CreateHouseUseCase} from '../useCase/createHouseUseCase';
import {GetHouseUseCase} from '../useCase/getHouse';
import {DeleteHouseUseCase} from '../useCase/deleteHouseUseCase';
import {EditHouseUseCase} from '../useCase/editHouseUseCase';

const storages = {
    auth: new AuthTokenStorageImpl(),
} as const;

const api = axios.create({
    baseURL: config.apiDomain ? `${config.apiDomain}/api` : '/api',
    withCredentials: true,
});
api.interceptors.request.use(req => {
    const token = storages.auth.getAccessToken();
    req.headers.setAuthorization(`Bearer ${token}`);
    return req;
});
const httpClient = new AxiosHttpClient(api);

const repositories = {
    auth: new AuthRepositoryImpl(new AuthRemoteDataSource(httpClient)),
    house: new HouseRepositoryImpl(new HouseRemoteDataSource(httpClient)),
} as const;

export const useCases = {
    signin: () => new SigninUseCase(repositories.auth, storages.auth),
    logout: () => new LogoutUseCase(repositories.auth, storages.auth),
    authInit: () => new InitAuthUseCase(repositories.auth, storages.auth),
    getHouse: () => new GetHouseUseCase(repositories.house),
    getHouseList: () => new GetHouseListUseCase(repositories.house),
    createHouse: () => new CreateHouseUseCase(repositories.house),
    editHouse: () => new EditHouseUseCase(repositories.house),
    deleteHouse: () => new DeleteHouseUseCase(repositories.house),
} as const;
