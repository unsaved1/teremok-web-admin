declare module "@appConfig" {
  export interface IAppConfig {
    apiDomain: string;
    appProdPort: string;
    app: {
      shared: {
        fmt: {
          currencyDevisor: number;
        };
      };
    };
  }
}
