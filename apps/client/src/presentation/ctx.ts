import { type RouterContext, createContext } from "react-router";
import type { GetInfoSectionUseCase } from "../app/useCase/getInfoSection";
import type { GetInfoSectionListUseCase } from "../app/useCase/getInfoSectionList";
import type { GetContactUseCase } from "../app/useCase/getContact";
import type { GetServiceListUseCase } from "../app/useCase/getServiceList";
import type { GetServiceUseCase } from "../app/useCase/getService";
import type { GetHouseListUseCase } from "../app/useCase/getHouseList";
import type { GetHouseUseCase } from "../app/useCase/getHouse";
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
