import { Injectable } from '@nestjs/common';
import { InserirSerieRequest } from 'src/controller/request/inserirSerie.request';
import { ObserSeriesResponse } from 'src/controller/request/obterSeries.response';
import { CustomException } from 'src/infraestructure/customExceptions/customError.exception';
import { SerieRepository } from 'src/repository/serie.repository';

@Injectable()
export class SerieService {
    constructor(
        private readonly _serieRepository: SerieRepository,
    ) {}

  async obterSeries(): Promise<ObserSeriesResponse[]> {
    const retornoSeries = await this._serieRepository.buscarSeries();
    return retornoSeries;
  }

  async obterSerieId(id: number): Promise<ObserSeriesResponse> {
    const retornoSeries = await this._serieRepository.buscarSerieId(id);

    if (!retornoSeries) {
        throw new CustomException(['Já não foi encontrada'], 404);
    } 
    return retornoSeries;
  }

  async inserirSeries(parametros: InserirSerieRequest): Promise<ObserSeriesResponse> {
    const verificaExistencia = await this._serieRepository.buscarSerieNome(parametros.nomeSerie);

    if (verificaExistencia) {
        throw new CustomException(['Já existe uma serie com este nome'], 400);
    }

    const retornoSeries = await this._serieRepository.inserirSerie(parametros);
    return retornoSeries;
  }

  async deletarSerie(id: number): Promise<void> {
    const serie = await this._serieRepository.buscarSerieId(id);

    if (!serie) {
        throw new CustomException(['Identificador da serie nao existe'], 404);
    }

    await this._serieRepository.deletarSerie(id);
  }
}
