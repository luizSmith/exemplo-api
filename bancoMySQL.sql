CREATE DATABASE db_serie;

CREATE TABLE IF NOT EXISTS db_serie.tb_serie (
	cd_serie INT AUTO_INCREMENT PRIMARY KEY,
	nm_serie VARCHAR(55) NOT NULL,
	dt_lancamento DATE NOT NULL
);
