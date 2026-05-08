import type {HouseRepository} from '@/domain/entity/house';
import type {IHouse} from '@/domain/entity/house/interfaces';
import type {IPagination} from '@/domain/shared/interfaces/base';

export class GetHouseListUseCase {
    constructor(private house_repo: HouseRepository) {}

    async execute(offset: number, limit: number): Promise<IPagination<IHouse>> {
        return await this.house_repo.getList(offset, limit);
    }
}
