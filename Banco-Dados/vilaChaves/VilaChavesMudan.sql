INSERT INTO tbOcupacao(
	descOcupacao
)
VALUES(
	'Jogador de io-io'
),(
	'Vendedor de churros'
),(
	'Cobrador de aluguel'
),(
	'Professor Linguiça'
),(
	'Vendedor de suco'
)

ALTER TABLE tbPersonagem
ADD emailPersonagem VARCHAR(100)
GO
ALTER TABLE tbPersonagem
ADD dataNascPersonagem DATE
GO
ALTER TABLE tbPersonagem
ADD sexoPersonagem VARCHAR(9)
GO
ALTER TABLE tbPersonagem
ADD estadoCivilPersonagem VARCHAR(10)
GO

ALTER TABLE tbPersonagem ALTER COLUMN cpfPersonagem char(12)
GO
ALTER TABLE tbPersonagem ALTER COLUMN telPersonagem char(13)
GO

INSERT INTO tbPersonagem (

	nomePersonagem
	,cpfPersonagem
	,telPersonagem
)
VALUES
	( 'Seu Madruga', '12345678901', '5511987654321'),
	( 'Dona Florinda', '23456789012', '5511988765432'),
	( 'Professor Girafales', '34567890123', '5511979876543'),
	( 'Chiquinha', '56789012345', '5511955432109'),
	( 'Seu Barriga', '67890123456', '5511944321098'),
	( 'Pópis', '78901234567', '5511933210987'),
	( 'Jaiminho', '89012345678', '5511922109876'),
	( 'Godinez', '90123456789', '5511911098765'),
	( 'Pati', '01234567890', '5511900987654'),
	( 'Chapolin','14565466416','5511903348654');


UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1030),
	emailPersonagem = COALESCE(	emailPersonagem,'kiko.turma@chaves.com')
	,dataNascPersonagem = COALESCE(dataNascPersonagem,'12-05-1980')
	,sexoPersonagem = COALESCE(sexoPersonagem,'Masculino')
	,estadoCivilPersonagem = COALESCE(estadoCivilPersonagem,'Solteiro')
WHERE idPersonagem = 1

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1000),
    emailPersonagem = COALESCE(emailPersonagem, 'chaves.turma@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '20-02-1975'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 2;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1040),
    emailPersonagem = COALESCE(emailPersonagem, 'pernalonga.looney@looneytunes.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '29-09-1972'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 3;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1020),
    emailPersonagem = COALESCE(emailPersonagem, 'patolino.looney@looneytunes.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '01-03-1974'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 4;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1000),
    emailPersonagem = COALESCE(emailPersonagem, 'bobsponja@fenda.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '14-07-1985'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 5;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1030),
    emailPersonagem = COALESCE(emailPersonagem, 'lula.molusco@fenda.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '27-10-1980'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 6;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1010),
    emailPersonagem = COALESCE(emailPersonagem, 'eufrasino@tvg.com.br'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '09-11-1978'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Casado')
WHERE idPersonagem = 8;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1010),
    emailPersonagem = COALESCE(emailPersonagem, 'seumadruga@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '02-06-1945'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Viúvo')
WHERE idPersonagem = 9;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1020),
    emailPersonagem = COALESCE(emailPersonagem, 'dona.florinda@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '04-10-1950'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Feminino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Divorciada')
WHERE idPersonagem = 10;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1020),
    emailPersonagem = COALESCE(emailPersonagem, 'professor.girafales@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '21-08-1955'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Casado')
WHERE idPersonagem = 11;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1030),
    emailPersonagem = COALESCE(emailPersonagem, 'chiquinha.chaves@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '10-01-1990'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Feminino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteira')
WHERE idPersonagem = 12;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1010),
    emailPersonagem = COALESCE(emailPersonagem, 'seubarriga@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '15-03-1940'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Casado')
WHERE idPersonagem = 13;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1000),
    emailPersonagem = COALESCE(emailPersonagem, 'popis@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '22-09-2000'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Feminino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteira')
WHERE idPersonagem = 14;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1010),
    emailPersonagem = COALESCE(emailPersonagem, 'jaiminho@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '17-05-1970'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 15;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1000),
    emailPersonagem = COALESCE(emailPersonagem, 'godinez@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '03-03-1995'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 16;

UPDATE tbPersonagem 
SET 	
	idOcupacao = COALESCE(idOcupacao,1010),
    emailPersonagem = COALESCE(emailPersonagem, 'pati@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '13-06-1998'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Feminino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteira')
WHERE idPersonagem = 17;

UPDATE tbPersonagem 
SET 
	idOcupacao = COALESCE(idOcupacao,1000),
    emailPersonagem = COALESCE(emailPersonagem, 'chapolin@chaves.com'),
    dataNascPersonagem = COALESCE(dataNascPersonagem, '10-04-1950'),
    sexoPersonagem = COALESCE(sexoPersonagem, 'Masculino'),
    estadoCivilPersonagem = COALESCE(estadoCivilPersonagem, 'Solteiro')
WHERE idPersonagem = 18;


DELETE FROM tbPersonagem
WHERE idPersonagem= 3

DELETE FROM tbPersonagem
WHERE idPersonagem= 4

DELETE FROM tbPersonagem
WHERE idPersonagem= 5

DELETE FROM tbPersonagem
WHERE idPersonagem= 6

DELETE FROM tbPersonagem
WHERE idPersonagem= 7

SELECT * FROM tbPersonagem
WHERE sexoPersonagem = 'Masculino'

SELECT * FROM tbPersonagem
WHERE idPersonagem < 10 and idPersonagem > 2

SELECT COUNT(nomePersonagem) AS 'quantidade de nomes' FROM tbPersonagem

SELECT SUM (idPersonagem) FROM tbPersonagem
WHERE idPersonagem <= 10

SELECT * FROM tbPersonagem
WHERE dataNascPersonagem BETWEEN 03/03/1995 AND 22/09/2000

SELECT nomePersonagem FROM tbPersonagem
WHERE nomePersonagem LIKE 'C%'
