import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Serie } from "./entity/series.entity";
import { InserirSerieDTO } from "src/service/DTO/inserirSerie.dto";
import { InserirSerieDAO } from "./DAO/inserirSerie.dao";

@EntityRepository(Serie)
export class SerieRepository extends BaseRepository<Serie> {
    async buscarSeries(): Promise<Serie[]> {
        const result = this.createQueryBuilder('series')
        .select(
            'series.cd_serie',
            'idSerie'
        )
        .addSelect(
            'series.nm_serie',
            'nomeSerie'
        )
        .addSelect(
            'series.dt_lancamento',
            'dataSerie'
        )
        .getRawMany();
        return result;
    }

    async inserirSerie(parametros: InserirSerieDTO): Promise<InserirSerieDAO> {
        const resultadoInserir = await this.create({
            nomeSerie: parametros.nomeSerie,
            dataSerie: parametros.dataSerie
        }).save();

        return resultadoInserir;
    }

    async deletarSerie(id: number): Promise<void> {
        await this.delete({
            idSerie: id
        })
    }
}
