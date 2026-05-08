import type { IAppConfig } from "@appConfig";
export const appConfig: IAppConfig["app"] = {
  shared: {
    fmt: {
      currencyDevisor: 1,
    },
  },
} as const;
