import {appConfig} from '@root/app.config';

export const config = Object.freeze({
    apiDomain: import.meta.env.VITE_API_DOMAIN,
    wsDomain: import.meta.env.VITE_API_WS_DOMAIN,

    initShopMode: import.meta.env.VITE_INIT_SHOP_MODE,

    shopId: import.meta.env.VITE_SHOP_ID,

    rootLogin: import.meta.env.VITE_ROOT_LOGIN,
    rootPassword: import.meta.env.VITE_ROOT_PASSWORD,

    apiKey: import.meta.env.VITE_API_KEY,
    app: appConfig,
});
