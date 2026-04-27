import type {HouseRepository} from '@/domain/entity/house';
import type {ICreateHouseInput, IHouse} from '@/domain/entity/house/interfaces';

export class CreateHouseUseCase {
    constructor(private house_repo: HouseRepository) {}

    async execute(data: ICreateHouseInput): Promise<IHouse> {
        return await this.house_repo.create(data);
    }
}
