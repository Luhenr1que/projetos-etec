CREATE DATABASE bdLanchonete


CREATE TABLE tbProduto(
	codProduto INT PRIMARY KEY IDENTITY(200,1)
	,nomeProduto VARCHAR(40)
	,precoQuiloProduto MONEY
	,descricao VARCHAR(50)
);

INSERT INTO tbProduto(nomeProduto,precoQuiloProduto,descricao)
VALUES('Coxinha', 22,'Coxinha de Carne Seca')
	  ,('Kibe',30.50 ,'Kibe Árabe')
	  ,('Doce de Abóbora',12.30,'Doce')
	  ,('Cerveja Skol',6.25,'Cerveja em lata')

SELECT nomeProduto, precoQuiloProduto FROM tbProduto

SELECT COUNT(nomeProduto) FROM tbProduto
SELECT * FROM tbProduto
SELECT SUM(precoQuiloProduto) FROM tbProduto 
SELECT AVG(precoQuiloProduto) FROM tbProduto 
SELECT MAX(precoQuiloProduto) FROM tbProduto 
SELECT MIN(precoQuiloProduto) FROM tbProduto 


SELECT nomeProduto,SUM(precoQuiloProduto)AS 'Valor Total' FROM tbProduto	
		WHERE nomeProduto = 'Coxinha'
			GROUP BY nomeProduto
				--ORDER BY nomeProduto DESC 
				ORDER BY nomeProduto ASC