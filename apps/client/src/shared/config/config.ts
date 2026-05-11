import type { IAppConfig } from "@appConfig";
import { appConfig } from "@root/app.config";

export const config = Object.freeze({
  apiDomain: import.meta.env.VITE_API_DOMAIN,
  appProdPort: import.meta.env.VITE_APP_PROD_PORT,
  app: appConfig,
} satisfies IAppConfig);
