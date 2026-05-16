import type { GetInfoSectionListUseCase } from "@/app/useCase/getInfoSectionList";
import type { Nullable } from "@repo/shared/types";
import type { GetContactUseCase } from "@root/src/app/useCase/getContact";
import type { GetHouseListUseCase } from "@root/src/app/useCase/getHouseList";
import type { GetServiceListUseCase } from "@root/src/app/useCase/getServiceList";
import { createContext, type RouterContext } from "react-router";

interface IHouseRouteCtx {
  getHouseListUseCase: GetHouseListUseCase;
  getServiceList: GetServiceListUseCase;
  getInfoSectionList: GetInfoSectionListUseCase;
  getContact: GetContactUseCase;
}

export const HouseRouteCtx: RouterContext<Nullable<IHouseRouteCtx>> =
  createContext(null);
