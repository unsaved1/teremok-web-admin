import type { TDivProps } from "@/presentation/shared/types";
import type { IHouse } from "@/domain/entity/house/interfaces";

export interface IHousesSectionProps extends TDivProps {
  data: Array<IHouse>;
}
