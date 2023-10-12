import { Injectable } from '@nestjs/common';
import { InserirSerieRequest } from 'src/controller/request/inserirSerie.request';
import { ObserSeriesResponse } from 'src/controller/request/obterSeries.response';
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

  async inserirSeries(parametros: InserirSerieRequest): Promise<ObserSeriesResponse> {
    const retornoSeries = await this._serieRepository.inserirSerie(parametros);
    return retornoSeries;
  }
}
