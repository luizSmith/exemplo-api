import { Module } from '@nestjs/common';
import { SerieServiceModule } from 'src/service/serie.module';
import { SerieController } from './serie.controller';

@Module({
    controllers: [SerieController],
    imports: [SerieServiceModule],
})
export class SerieModule {}
