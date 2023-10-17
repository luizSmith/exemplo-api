import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Serie } from "./entity/series.entity";
import { InserirSerieDTO } from "src/service/DTO/inserirSerie.dto";
import { InserirSerieDAO } from "./DAO/inserirSerie.dao";
import { AtualizarDadosCompletosDTO } from "src/service/DTO/atualizarDadosCompleto.dto";

@EntityRepository(Serie)
export class SerieRepository extends BaseRepository<Serie> {
    async buscarSeries(nomeBusca?: string): Promise<Serie[]> {
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
        );

        if (nomeBusca) {
            result.where(
                `nm_serie LIKE "${nomeBusca}%"`, {
                    nomeBusca
                }
            )
        }

        console.log(result.getQueryAndParameters);
        
        
        return result.getRawMany();
    }

    async buscarSerieNome(nome: string): Promise<Serie> {
        const result = this.createQueryBuilder('series')
        .where("nm_serie = :nome", {
            nome
        })
        .getRawOne();
        return result;
    }

    async buscarSerieId(id: number): Promise<Serie | undefined> {
        const result = await this.createQueryBuilder('series')
            .where('series.cd_serie = :id', {
                id
            })
            .getOne();

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

    async atualizarDadosCompleto(id: number, parametros: AtualizarDadosCompletosDTO): Promise<void> {
        await this.createQueryBuilder('series')
            .update(Serie)
            .set({
                nomeSerie: parametros.nomeSerie,
                dataSerie: parametros.dataSerie,
            })
            .where('cd_serie = :id', { id })
            .execute();

        console.info('updated patient: ', id);
    }
}
