import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_serie', {
    database: 'db_serie',
})
export class Serie extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'cd_serie',
    })
    idSerie: number;

    @Column({
        name: 'nm_serie',
    })
    nomeSerie: string;

    @Column({
        name: 'dt_lancamento',
    })
    dataSerie: string;
}
