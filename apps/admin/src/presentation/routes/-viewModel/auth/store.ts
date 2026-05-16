import {type TAuthStore, type TAuthIntent, EAuthIntent, type TAuthState} from './interfaces';
import {useCases} from '@/app/di/container';
import {AuthInitException} from '@/app/useCase/resfreshAuthTokens';
import {create} from 'zustand';

export const createAuthVMStore = (initState: TAuthState) => {
    return create<TAuthStore>(set => ({
        ...initState,
        async dispatch({type, payload}: TAuthIntent) {
            switch (type) {
                case EAuthIntent.INIT: {
                    const authInitUseCase = useCases.authInit();
                    try {
                        await authInitUseCase.execute();
                        set({isAuth: true});
                    } catch (exc) {
                        if (exc instanceof AuthInitException) {
                            set({isAuth: false});
                            return;
                        }
                        throw exc;
                    }
                    break;
                }
                case EAuthIntent.SIGNIN: {
                    const signinUseCase = useCases.signin();
                    await signinUseCase.execute(payload);
                    set({isAuth: true});
                    break;
                }
                case EAuthIntent.LOGOUT: {
                    const logoutUseCase = useCases.logout();
                    await logoutUseCase.execute(payload);
                    set({isAuth: false, user: null});
                    break;
                }
            }
        },
    }));
};
