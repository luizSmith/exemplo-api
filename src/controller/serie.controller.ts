import { Controller, Get, HttpStatus } from '@nestjs/common';
import { SerieService } from '../service/serie.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObserSeriesResponse } from './request/obterSeries.response';

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
}
