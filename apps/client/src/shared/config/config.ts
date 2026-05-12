import type { IAppConfig } from "@appConfig";
import { appConfig } from "@root/app.config";

export const config = Object.freeze({
  apiDomain: import.meta.env.VITE_API_DOMAIN,
  app: appConfig,
} satisfies IAppConfig);
