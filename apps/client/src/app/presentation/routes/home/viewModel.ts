import type { IHouse } from "@root/src/domain/entity/house/interfaces";
import { create } from "zustand";
import { createContext } from "zustand-di";
import type { IPagination } from "@repo/shared/domain";
import type {
  IContact,
  IInfoSection,
  IService,
} from "@/domain/entity/content/interfaces";
import type { Nullable } from "@repo/shared/types";

interface IHomeVM {
  isError: false;
  errorData?: never;
  data: {
    houses: IPagination<IHouse>;
    services: Array<IService>;
    contact: Nullable<IContact>;
    infoSections: Array<IInfoSection>;
  };
}

interface IHomeVMError {
  isError: true;
  errorData: unknown;
  houses?: never;
}

type THomeVMState = IHomeVM | IHomeVMError;

export function createHomeVM() {
  const [HomeVMProvider, useHomeVMStore] = createContext<THomeVMState>();

  const createHomeVMStore = (initState: THomeVMState) => {
    return create<THomeVMState>(() => ({
      ...initState,
    }));
  };

  return {
    HomeVMProvider,
    createHomeVMStore,
    useHomeVMStore,
  };
}
