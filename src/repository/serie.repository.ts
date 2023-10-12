import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Serie } from "./entity/series.entity";

@EntityRepository(Serie)
export class SerieRepository extends BaseRepository<Serie> {
    async buscarSeries(): Promise<Serie[]> {
        const result = this.createQueryBuilder('series')
        .getRawMany();
        return result;
    }
}
