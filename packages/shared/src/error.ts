import type { Nullable } from "./types";

export const appErrorCodes = {
  1000: {
    name: "default sys error",
    key: "sys.error.default",
  },
  1001: {
    name: "sys session get error",
    key: "sys.session.error.get",
  },
  1100: {
    name: "modfied product not found",
    key: "product.mods.error.product.notFound",
  },
  1101: {
    name: "mod_group_not_found",
    key: "product.mods.error.group.notFound",
  },
  1102: {
    name: "mod_not_found",
    key: "product.mods.error.mod.notFound",
  },
  1200: {
    name: "tableCode required",
    key: "tableCode.error.required",
  },

  1400: {
    name: "doc not found",
    key: "sys.doc.error.notFound",
  },

  4000: {
    name: "default ui-error",
    key: "ui.error",
  },
  4001: {
    name: "provider ui-error",
    key: "ui.provider.error",
  },
};

export const fileErrorCodes = {
  8000: {
    name: "file error",
    key: "file.error",
  },
};

type TAppErrorCodes = keyof typeof appErrorCodes;
type TFileErrorCodes = keyof typeof fileErrorCodes;

export class ChainedError<T extends Error = Error> extends Error {
  cause?: T;
  localeKey: string = "";

  constructor(cause?: Nullable<T>, msg?: string) {
    super(msg);
    if (cause) {
      this.cause = cause;
    }
    this.stack = cause
      ? `${this.stack} \n Caused by: ${cause.stack}`
      : this.stack;
  }
}

export class AppError<T extends Error = Error> extends ChainedError<T> {
  name = "AppError";
  code: TAppErrorCodes;

  constructor(message?: string, code: TAppErrorCodes = 1000, cause?: T) {
    super(cause, message);
    this.code = code;
  }
}

export class FileError extends Error {
  name = "fileError";

  code: TFileErrorCodes = 8000;
  data: unknown = null;

  constructor(
    message?: string,
    code: TFileErrorCodes = 8000,
    data: unknown = null,
  ) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export class MappingExc extends ChainedError {
  localeKey = "mapping.error";
}
export class NotImplementExc extends ChainedError {}
