import type { Route } from "./+types/root";
import { config } from "@root/src/shared/config";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import axios from "axios";

import { AxiosHttpClient } from "@repo/shared/data";
import { Fmt, ImagePath, ScrollLockLib } from "@repo/shared/presentation";

import { HouseRemoteDataSource } from "@root/src/data/entity/house";
import { HouseRepositoryImpl } from "@root/src/data/entity/house/repositoryImpl";
import { ContentRemoteDataSource } from "@root/src/data/entity/content";
import { ContentRepositoryImpl } from "@root/src/data/entity/content/repositoryImpl";

import { GetHouseUseCase } from "../app/useCase/getHouse";
import { GetHouseListUseCase } from "../app/useCase/getHouseList";
import { GetServiceUseCase } from "../app//useCase/getService";
import { GetServiceListUseCase } from "../app/useCase/getServiceList";
import { GetContactUseCase } from "../app/useCase/getContact";
import { GetInfoSectionListUseCase } from "../app/useCase/getInfoSectionList";
import { GetInfoSectionUseCase } from "../app/useCase/getInfoSection";

import { AppConfigCtx, SharedPresentationCtx } from "../app/di/context";

import { Navbar, MobileBar } from "./ui";

import { RootRouterCtx } from "./ctx";

import "./shared/styles/index.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollRestoration  />
        <Scripts />
      </body>
    </html>
  );
}

const api = axios.create({
  baseURL: config.apiDomain ? `${config.apiDomain}/api/pub` : "/api",
  withCredentials: true,
});

const rootMiddleware: Route.MiddlewareFunction = async ({ context }) => {
  const httpClient = new AxiosHttpClient(api);

  const repositories = {
    house: new HouseRepositoryImpl(new HouseRemoteDataSource(httpClient)),
    content: new ContentRepositoryImpl(new ContentRemoteDataSource(httpClient)),
  } as const;

  const useCases = {
    getHouse: () => new GetHouseUseCase(repositories.house),
    getHouseList: () => new GetHouseListUseCase(repositories.house),
    getService: () => new GetServiceUseCase(repositories.content),
    getServiceList: () => new GetServiceListUseCase(repositories.content),
    getContact: () => new GetContactUseCase(repositories.content),
    getInfoSectionList: () =>
      new GetInfoSectionListUseCase(repositories.content),
    getInfoSection: () => new GetInfoSectionUseCase(repositories.content),
  } as const;

  context.set(RootRouterCtx, { useCases: useCases });
};

export const middleware: Route.MiddlewareFunction[] = [rootMiddleware];

export default function App() {
  return (
    <AppConfigCtx.Provider value={config}>
      <SharedPresentationCtx.Provider
        value={{
          imagePath: new ImagePath(config.apiDomain),
          fmt: new Fmt(config.app.shared.fmt.currencyDevisor),
          scrollLock: new ScrollLockLib(),
        }}
      >
        <Outlet />
      </SharedPresentationCtx.Provider>
    </AppConfigCtx.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
