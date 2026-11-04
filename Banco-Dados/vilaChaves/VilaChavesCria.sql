CREATE DATABASE dbVilaChaves;

GO

USE dbVilaChaves;

GO

CREATE TABLE tbOcupacao(
	idOcupacao INT PRIMARY KEY IDENTITY (1000,10),
	descOcupacao VARCHAR (50) NOT NULL

)

CREATE TABLE tbPersonagem (
	idPersonagem INT PRIMARY KEY IDENTITY (1,1),
	nomePersonagem VARCHAR (100) NOT NULL,
	cpfPersonagem INT NOT NULL,
	telPersonagem INT NOT NULL,
	idOcupacao INT FOREIGN KEY REFERENCES tbOcupacao(idOcupacao)
)

