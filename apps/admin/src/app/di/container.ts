import {AuthRepositoryImpl} from '@/data/entity/auth/repositoryImpl';
import {HouseRemoteDataSource} from '@/data/entity/house';
import {HouseRepositoryImpl} from '@/data/entity/house/repositoryImpl';
import {ContentRemoteDataSource} from '@/data/entity/content';
import {ContentRepositoryImpl} from '@/data/entity/content/repositoryImpl';
import {ImageRemoteDataSource} from '@/data/shared/entity/image/remote';
import {ImageRepositoryImpl} from '@/data/shared/entity/image/repositoryImpl';
import {SigninUseCase} from '../useCase/signin';
import {GetHouseListUseCase} from '../useCase/getHouseList';
import axios from 'axios';
import {config} from '@/shared/config';
import {AuthRemoteDataSource} from '@/data/entity/auth/ds/remoteImpl';
import {AxiosHttpClient} from '@/data/shared/remote';
import {AuthTokenStorageImpl} from '@/presentation/auth/token/storageImpl';
import {LogoutUseCase} from '../useCase/logout';
import {InitAuthUseCase} from '../useCase/resfreshAuthTokens';
import {CreateHouseUseCase} from '../useCase/createHouseUseCase';
import {GetHouseUseCase} from '../useCase/getHouse';
import {DeleteHouseUseCase} from '../useCase/deleteHouseUseCase';
import {EditHouseUseCase} from '../useCase/editHouseUseCase';
import {UploadImageUseCase} from '../useCase/uploadImageUseCase';
import {GetServiceListUseCase} from '../useCase/getServiceList';
import {GetServiceUseCase} from '../useCase/getService';
import {CreateServiceUseCase} from '../useCase/createServiceUseCase';
import {EditServiceUseCase} from '../useCase/editServiceUseCase';
import {DeleteServiceUseCase} from '../useCase/deleteServiceUseCase';
import {GetContactUseCase} from '../useCase/getContact';
import {EditContactUseCase} from '../useCase/editContactUseCase';
import {GetInfoSectionListUseCase} from '../useCase/getInfoSectionList';
import {GetInfoSectionUseCase} from '../useCase/getInfoSection';
import {CreateInfoSectionUseCase} from '../useCase/createInfoSectionUseCase';
import {EditInfoSectionUseCase} from '../useCase/editInfoSectionUseCase';
import {DeleteInfoSectionUseCase} from '../useCase/deleteInfoSectionUseCase';

const storages = {auth: new AuthTokenStorageImpl()} as const;
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
    content: new ContentRepositoryImpl(new ContentRemoteDataSource(httpClient)),
    image: new ImageRepositoryImpl(new ImageRemoteDataSource(httpClient)),
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
    getService: () => new GetServiceUseCase(repositories.content),
    getServiceList: () => new GetServiceListUseCase(repositories.content),
    createService: () => new CreateServiceUseCase(repositories.content),
    editService: () => new EditServiceUseCase(repositories.content),
    deleteService: () => new DeleteServiceUseCase(repositories.content),
    getContact: () => new GetContactUseCase(repositories.content),
    editContact: () => new EditContactUseCase(repositories.content),
    getInfoSectionList: () => new GetInfoSectionListUseCase(repositories.content),
    getInfoSection: () => new GetInfoSectionUseCase(repositories.content),
    createInfoSection: () => new CreateInfoSectionUseCase(repositories.content),
    editInfoSection: () => new EditInfoSectionUseCase(repositories.content),
    deleteInfoSection: () => new DeleteInfoSectionUseCase(repositories.content),
    uploadImage: () => new UploadImageUseCase(repositories.image),
} as const;
