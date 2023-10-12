import { Controller, Get, Post, HttpStatus, Body } from '@nestjs/common';
import { SerieService } from '../service/serie.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObserSeriesResponse } from './request/obterSeries.response';
import { InserirSerieRequest } from './request/inserirSerie.request';

@Controller('/series')
@ApiTags('Series')
export class SerieController {
  constructor(private readonly _serieService: SerieService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ObserSeriesResponse,
  })
  async obterSeries(): Promise<ObserSeriesResponse[]> {
    return await this._serieService.obterSeries();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Serie foi inserida com sucesso",
    type: ObserSeriesResponse
  })
  async inserirSerie(
    @Body() parametros: InserirSerieRequest
  ): Promise<ObserSeriesResponse> {
    return await this._serieService.inserirSeries(parametros);
  }
}
