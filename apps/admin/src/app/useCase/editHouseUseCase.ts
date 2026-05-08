import type {HouseRepository} from '@/domain/entity/house';
import type {IEditHouseInput, IHouse} from '@/domain/entity/house/interfaces';

export class EditHouseUseCase {
    constructor(private houseRepo: HouseRepository) {}

    async execute(id: IHouse['id'], data: IEditHouseInput): Promise<IHouse> {
        return await this.houseRepo.edit(id, data);
    }
}
