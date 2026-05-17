import type { Fmt, ImagePath, ScrollLockLib } from "@repo/shared/presentation";
import type { Nullable } from "@repo/shared/types";
import type { IAppConfig } from "@appConfig";
import { NotImplementExc } from "@repo/shared/error";
import { createContext, useContext } from "react";

interface ISharedPresentationCtx {
  imagePath: ImagePath;
  fmt: Fmt;
  scrollLock: ScrollLockLib;
}

export const SharedPresentationCtx =
  createContext<Nullable<ISharedPresentationCtx>>(null);

export const useSharedPresentationCtx = () => {
  const ctx = useContext(SharedPresentationCtx);
  if (!ctx) {
    throw new NotImplementExc();
  }
  return ctx;
};

export const AppConfigCtx = createContext<Nullable<IAppConfig>>(null);

export const useAppConfigCtx = () => {
  const ctx = useContext(AppConfigCtx);
  if (!ctx) {
    throw new NotImplementExc();
  }
  return ctx;
};
