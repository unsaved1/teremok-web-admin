declare module "@appConfig" {
  export interface IAppConfig {
    apiDomain: string;
    app: {
      shared: {
        fmt: {
          currencyDevisor: number;
        };
      };
    };
  }
}
