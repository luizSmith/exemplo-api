import { Controller, Get, Post, HttpStatus, Body, Param, Delete, Put } from '@nestjs/common';
import { SerieService } from '../service/serie.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObserSeriesResponse } from './request/obterSeries.response';
import { InserirSerieRequest } from './request/inserirSerie.request';
import { CustomException } from 'src/infraestructure/customExceptions/customError.exception';
import { AtualizarDadosCompletoRequest } from './request/atualizarDadosCompleto.request';
import { AtualizarDadosCompletoResponse } from './request/atualizarDadosCompleto.request copy';

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

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ObserSeriesResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serie não encontrada',
    type: CustomException,
 })
 @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno, contate o administrador',
    type: CustomException,
 })
  async obterSeriesId(
        @Param('id') id: number
    ): Promise<ObserSeriesResponse> {
    return await this._serieService.obterSerieId(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Serie foi inserida com sucesso",
    type: ObserSeriesResponse
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serie não encontrada',
    type: CustomException,
 })
 @ApiResponse({
     status: HttpStatus.INTERNAL_SERVER_ERROR,
     description: 'Erro interno, contate o administrador',
     type: CustomException,
 })
  async inserirSerie(
    @Body() parametros: InserirSerieRequest
  ): Promise<ObserSeriesResponse> {
    return await this._serieService.inserirSeries(parametros);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'serie Deletada'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serie não encontrado',
    type: CustomException,
  })
  @ApiResponse({
     status: HttpStatus.INTERNAL_SERVER_ERROR,
     description: 'Erro interno, contate o administrador',
     type: CustomException,
  })
  async deletarSerie(
    @Param('id') id: number,
  ): Promise<void> {
    await this._serieService.deletarSerie(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'serie Deletada',
    type: AtualizarDadosCompletoResponse
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serie não encontrado',
    type: CustomException,
  })
  @ApiResponse({
     status: HttpStatus.INTERNAL_SERVER_ERROR,
     description: 'Erro interno, contate o administrador',
     type: CustomException,
  })
  async atualizarDadosCompleto(
    @Param('id') id: number,
    @Body() parametros: AtualizarDadosCompletoRequest
  ): Promise<AtualizarDadosCompletoResponse> {
    return await this._serieService.atualizarDadosCompleto(id, parametros);
  }
}
