import { type RouterContext, createContext } from "react-router";
import type { GetInfoSectionUseCase } from "../useCase/getInfoSection";
import type { GetInfoSectionListUseCase } from "../useCase/getInfoSectionList";
import type { GetContactUseCase } from "../useCase/getContact";
import type { GetServiceListUseCase } from "../useCase/getServiceList";
import type { GetServiceUseCase } from "../useCase/getService";
import type { GetHouseListUseCase } from "../useCase/getHouseList";
import type { GetHouseUseCase } from "../useCase/getHouse";
import type { Nullable } from "@repo/shared/types";

type TReturn<T> = () => T;

interface IRootRouterCtx {
  useCases: {
    getHouse: TReturn<GetHouseUseCase>;
    getHouseList: TReturn<GetHouseListUseCase>;
    getService: TReturn<GetServiceUseCase>;
    getServiceList: TReturn<GetServiceListUseCase>;
    getContact: TReturn<GetContactUseCase>;
    getInfoSectionList: TReturn<GetInfoSectionListUseCase>;
    getInfoSection: TReturn<GetInfoSectionUseCase>;
  };
}

export const RootRouterCtx: RouterContext<Nullable<IRootRouterCtx>> =
  createContext(null);
