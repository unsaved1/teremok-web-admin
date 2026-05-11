import { Component, type ErrorInfo, type ReactNode } from "react";

import { Logging } from "@repo/shared/lib";
import { ChainedError } from "@repo/shared/error";
import type { Nullable } from "@repo/shared/types";

interface IProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface IState {
  data: Nullable<unknown>;
  hasError: boolean;
}

const logger = new Logging("features/error/ui/errorBoundary");

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, data: null };
  }

  public static getDerivedStateFromError(error: unknown): IState {
    logger.error("error boundary triggered", { error: error });
    return { hasError: true, data: error };
  }

  public componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    logger.error("Uncaught error: ", { error: error });
    logger.error("Uncaught error info: ", errorInfo);
  }

  public render() {
    if (this.state.hasError && this.state.data) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      if (this.state.data instanceof ChainedError) {
        return (
          <div>{this.state.data.localeKey || this.state.data.message}</div>
        );
      }
      return <div>Произошла непредвиденная ошибка</div>;
    }
    return this.props.children;
  }
}
