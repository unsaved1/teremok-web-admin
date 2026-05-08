import { BaseRepository } from "@/domain/shared/repository";
import type { IHouse } from "./interfaces";

export abstract class HouseRepository extends BaseRepository<IHouse> {}
