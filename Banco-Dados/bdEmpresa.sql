CREATE DATABASE bdEmpresa
GO
USE bdEmpresa

CREATE TABLE tbFuncionario(
	idFuncionario INT PRIMARY KEY IDENTITY(1,1)
	,nomeFuncionario VARCHAR(100)
	,ufFuncionario CHAR(2)
	,idadeFuncionario INT
	,quantFilhoFuncionario INT
)

CREATE TABLE tbFuncional(
	idFuncional INT PRIMARY KEY IDENTITY(1,1)
	,cargoFuncional VARCHAR(30)
	,salarioFuncional MONEY
	,tempEmpresaFuncional INT
	,tempCargoFuncional INT
	,sindicalizadoFuncional CHAR 
	,idFuncionario INT FOREIGN KEY REFERENCES tbFuncionario(idFuncionario)
)

CREATE TABLE tbPedidos(
	idPedidos INT PRIMARY KEY IDENTITY(1,1)
	,nomeClientePedido VARCHAR(50)
	,idadeClientePedido INT
	,cidadeClientePedido VARCHAR(50)
	,dataPedido DATE
	,valorPedido MONEY
)

INSERT INTO tbFuncionario(nomeFuncionario, ufFuncionario, idadeFuncionario, quantFilhoFuncionario)

VALUES 
('HUMBERTO ANTONIO MENDONCA', 'SP', 42, 2),
('ELVIRA ALVES DA CONCEICAO', 'RJ', 30, 1),
('RITA DE CASSIA SOARES DA SILVA', 'MG', 27, 1),
('AFIF ZEIDAN', 'PA', 30, 0),
('MARIA APARECIDA DE ALENCAR MOREIRA', 'SP', 40, 3),
('JOAO ALCIDES REIS DE FREITAS', 'MG', 41, 5),
('FIDELIS ALCIDES REIS DE FREITAS', 'MG', 39, 4),
('IRENIA BRITO DA PALMA', 'RJ', 47, 2),
('ILAIDE DAS VIRGES NOGUEIRA SILVA', 'MA', 18, 1),
('MARIA JOSE BARBOSA PAIVA', 'CE', 25, 0),
('JOSE ROMAO FILHO', 'CE', 30, 6);

INSERT INTO tbFuncional(cargoFuncional, salarioFuncional,tempEmpresaFuncional,tempCargoFuncional,sindicalizadoFuncional,idFuncionario)

VALUES 
('TI', 3500, 9, 2, 1, 1),
('RH', 2500, 2, 2, 0, 2),
('Assistente', 1700, 1, 1, 1, 3),
('Encarregado', 5000, 25, 2, 1, 4),
('Atendente', 2300, 3, 2, 0, 5),
('Motorista', 2700, 14, 4, 0, 6),
('Gerente', 6000, 8, 5, 1, 7),
('Porteiro', 2000, 15, 4, 1, 8),
('Motorista', 2400, 3, 3, 0, 9),
('Analista', 4500, 4, 4, 1, 10);

INSERT INTO tbPedidos(nomeClientePedido,idadeClientePedido,cidadeClientePedido,dataPedido,valorPedido)

VALUES
('João', 35, 'São Paulo', '2021-01-05', 250),
('João', 35, 'São Paulo', '2021-02-08', 100),
('Maria', 28, 'Rio de Janeiro', '2021-02-10', 150),
('Ana', 42, 'Belo Horizonte', '2021-03-20', 300),
('Pedro', 21, 'Porto Alegre', '2021-04-05', 80),
('Carolina', 29, 'Recife', '2021-05-15', 200),
('Carolina', 29, 'Recife', '2021-06-10', 120),
('João', 35, 'São Paulo', '2021-06-15', 180),
('Maria', 28, 'Rio de Janeiro', '2021-07-01', 90),
('Ana', 42, 'Belo Horizonte', '2021-07-20', 220);

SELECT SUM (idFuncionario) AS'Soma de ids' FROM tbFuncionario
SELECT SUM (idadeFuncionario) AS'Soma de idades' FROM tbFuncionario
SELECT SUM (quantFilhoFuncionario) AS'Soma de filhos ' FROM tbFuncionario

SELECT SUM (salarioFuncional) AS'Soma de salários' FROM tbFuncional
SELECT SUM (tempEmpresaFuncional) AS'Soma de tempo na empresa' FROM tbFuncional

SELECT MAX (idFuncionario) AS 'Maior codigo' FROM tbFuncionario
SELECT MIN (idFuncionario) AS 'MENor codigo' FROM tbFuncionario

SELECT MAX (idadeFuncionario) AS 'Maior idade' FROM tbFuncionario
SELECT MIN (idadeFuncionario) AS 'MeNor idade' FROM tbFuncionario

SELECT MAX (quantFilhoFuncionario) AS 'Mais filhos' FROM tbFuncionario
SELECT MIN (quantFilhoFuncionario) AS 'Menos filhos' FROM tbFuncionario

SELECT MAX (salarioFuncional) AS 'Maior salário' FROM tbFuncional
SELECT MIN (salarioFuncional) AS 'Menor salário' FROM tbFuncional

SELECT MAX (tempEmpresaFuncional) AS 'Maior tempo de empresa' FROM tbFuncional
SELECT MIN (tempEmpresaFuncional) AS 'Menor tempo de empresa' FROM tbFuncional

SELECT MAX (tempCargoFuncional) AS 'Maior tempo no cargo' FROM tbFuncional
SELECT MIN (tempCargoFuncional) AS 'Menor tempo no cargo' FROM tbFuncional

SELECT AVG (idFuncionario) AS'Media de ids' FROM tbFuncionario
SELECT AVG (idadeFuncionario) AS'Media de idades' FROM tbFuncionario
SELECT AVG (quantFilhoFuncionario) AS'Media de filhos' FROM tbFuncionario

SELECT AVG (salarioFuncional) AS'Media de salários' FROM tbFuncional
SELECT AVG (tempEmpresaFuncional) AS'Media de tempo na empresa' FROM tbFuncional
SELECT AVG (tempCargoFuncional) AS'Media de tempo no cargo' FROM tbFuncional

SELECT COUNT (salarioFuncional) AS'funcionarios com mais de 800 de salario' FROM tbFuncional
WHERE salarioFuncional > 800;

SELECT COUNT (salarioFuncional) AS'funcionarios com mais de 1000 de salario' FROM tbFuncional
WHERE salarioFuncional > 1000;

SELECT COUNT (salarioFuncional) AS'funcionarios com menos de 400 de salario' FROM tbFuncional
WHERE salarioFuncional < 400;

SELECT COUNT (salarioFuncional) AS'funcionarios com menos de 2000 de salario' FROM tbFuncional
WHERE salarioFuncional < 2000;

SELECT COUNT (salarioFuncional) AS'funcionarios com mais de 8000 de salario' FROM tbFuncional
WHERE salarioFuncional > 8000;

SELECT COUNT (salarioFuncional) AS'funcionarios com menos de 1000 de salario' FROM tbFuncional
WHERE salarioFuncional < 1000;

SELECT valorPedido AS 'Valor do maior para menor' FROM tbPedidos
	GROUP BY valorPedido
		ORDER BY valorPedido DESC

SELECT cidadeClientePedido AS 'Cidade', SUM(valorPedido) AS 'Total' FROM tbPedidos
	GROUP BY cidadeClientePedido
		ORDER BY 'Total' DESC;

SELECT AVG(idadeClientePedido) AS 'Faixa etária dos clientes', cidadeClientePedido AS 'Cidade dos clientes' FROM tbPedidos
	GROUP BY cidadeClientePedido

SELECT DATEPART(MONTH, dataPedido) AS 'Mês', COUNT(*) AS 'Pedidos do mes' FROM tbPedidos
	GROUP BY DATEPART(MONTH, dataPedido)

SELECT cidadeClientePedido AS 'Cidade', MAX(valorPedido) AS 'Valor maximo', MIN(valorPedido) AS 'Valor Minimo' FROM tbPedidos
	GROUP BY cidadeClientePedido

SELECT * FROM tbFuncionario
SELECT * FROM tbFuncional
SELECT *FROM tbPedidos