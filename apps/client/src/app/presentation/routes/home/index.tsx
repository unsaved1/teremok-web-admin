import type { Route } from "./+types";
import { NotImplementExc } from "@repo/shared/error";
import { RootRouterCtx } from "../../ctx";
import { Offer } from "./ui/offer";
import { Footer } from "./ui/footer";
import { Hero } from "./ui/hero";
import { Houses } from "./ui/houses";
import { Services } from "./ui/services";
import { StatsStrip } from "./ui/statsStrip";
import { HouseRouteCtx } from "./ctx";
import { About } from "./ui/about";
import { Show } from "../../shared/ui/utils";
import { createHomeVM } from "./viewModel";
import { Rules } from "./ui/rules";

const houseRouteMiddleware: Route.MiddlewareFunction = async ({ context }) => {
  const rootCtx = context.get(RootRouterCtx);
  if (!rootCtx) {
    throw new NotImplementExc();
  }
  context.set(HouseRouteCtx, {
    getHouseListUseCase: rootCtx.useCases.getHouseList(),
    getServiceList: rootCtx.useCases.getServiceList(),
    getContact: rootCtx.useCases.getContact(),
    getInfoSectionList: rootCtx.useCases.getInfoSectionList(),
  });
};

export const middleware: Route.MiddlewareFunction[] = [houseRouteMiddleware];

export async function loader({ context, url }: Route.LoaderArgs) {
  const ctx = context.get(HouseRouteCtx);
  if (!ctx) {
    throw new NotImplementExc();
  }
  const housesData = await ctx.getHouseListUseCase.execute(
    url.searchParams.has("offset")
      ? parseInt(url.searchParams.get("offset")!!)
      : 0,
    url.searchParams.has("limit")
      ? parseInt(url.searchParams.get("limit")!!)
      : 12,
  );
  const servicesData = await ctx.getServiceList.execute();
  const contactData = await ctx.getContact.execute();
  const infoSectionsData = await ctx.getInfoSectionList.execute();

  return {
    houses: housesData,
    services: servicesData,
    contact: contactData,
    infoSections: infoSectionsData,
  };
}

const vmMiddleware: Route.ClientMiddlewareFunction = async (
  { context },
  next,
) => {
  await next();
  const ctx = context.get(HouseRouteCtx);
  console.log(ctx);
  console.log("asdadcnalskdjn");
};

// Framework mode
export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  vmMiddleware,
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const { HomeVMProvider, createHomeVMStore, useHomeVMStore } = createHomeVM();

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <HomeVMProvider
      createStore={() =>
        createHomeVMStore({ isError: false, data: loaderData })
      }
    >
      <HomeContent />
    </HomeVMProvider>
  );
}

const HomeContent = () => {
  const vm = useHomeVMStore((s) => s);
  if (vm.isError) {
    return null;
  }
  return (
    <>
      <main>
        <Hero />
        <StatsStrip />
        <Show when={vm.data.infoSections.length > 0 && vm.data.infoSections[0]}>
          {(info) => <About data={info} />}
        </Show>
        <Houses data={vm.data.houses.items} />
        <Services services={vm.data.services} />
        <Rules />
        {vm.data.contact && <Offer contacts={vm.data.contact} />}
      </main>
      {vm.data.contact && <Footer contacts={vm.data.contact} />}
    </>
  );
};
