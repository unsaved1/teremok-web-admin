import { NotImplementExc } from "@repo/shared/error";
import { RootRouterCtx } from "../../ctx";
import type { Route } from "./+types";
import { CtaBanner } from "./ui/CtaBanner";
import { Footer } from "./ui/Footer";
import { Hero } from "./ui/Hero";
import { CabinsSection } from "./ui/HousesSection";
import { ServicesSection } from "./ui/ServicesSection";
import { StatsStrip } from "./ui/StatsStrip";
import { HouseRouteCtx } from "./ctx";
import { AboutSection } from "./ui/AboutSection";
import { Show } from "../../shared/ui/utils";
import { createHomeVM } from "./viewModel";

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
          {(info) => <AboutSection data={info} />}
        </Show>
        <CabinsSection data={vm.data.houses.items} />
        <ServicesSection services={vm.data.services} />
        {vm.data.contact && <CtaBanner contacts={vm.data.contact} />}
      </main>
      {vm.data.contact && <Footer contacts={vm.data.contact} />}
    </>
  );
};
