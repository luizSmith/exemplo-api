import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieRepository } from 'src/repository/serie.repository';
import { SerieService } from './serie.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SerieRepository,
        ]),
    ],
    providers: [SerieService],
    exports: [SerieService],
})
export class SerieServiceModule {}
