CREATE DATABASE bdLojaRoupa

CREATE TABLE tbCliente(
	idCliente INT PRiMARY KEY NOT NULL
	,nomeCliente VARCHAR(100)
	,cpfCliente CHAR(11)
)
CREATE TABLE tbVendedor(
	idVendedor INT PRIMARY KEY NOT NULL
	,nomeVendedor VARCHAR(100)
	,cpfVendedor CHAR(11)
)
CREATE TABLE  tbCategoria(
	idCategoria INT PRIMARY KEY NOT NULL
	,descCategoria VARCHAR(50)
)
CREATE TABLE tbFormaPagto(
	idtbFormaPagto INT PRIMARY KEY NOT NULL
	,descFormaPagto CHAR (15)
)
CREATE TABLE tbProduto(
	idProduto INT PRIMARY KEY
	,descProduto VARCHAR(100)
	,valorProduto MONEY
	,idCategoria INT FOREIGN KEY REFERENCES tbCategoria(idCategoria)
)
CREATE TABLE tbVenda(
	idVenda	INT PRIMARY KEY
	,dataVenda DATE
	,valorTotalVenda MONEY
	,idCliente INT FOREIGN KEY REFERENCES tbCliente(idCliente)
	,idVendedor INT FOREIGN KEY REFERENCES tbVendedor(idVendedor)
)
CREATE TABLE tbParcela(
	idParcela INT PRIMARY KEY NOT NULL
	,valorParcela MONEY
	,dtVencParcela DATE
	,idVenda INT FOREIGN KEY REFERENCES tbVenda(idVenda)
	,idFormaPagto INT FOREIGN KEY REFERENCES tbFormaPagto(idtbFormaPagto) 
)
CREATE TABLE tbItemVenda(
	idItemVenda INT PRIMARY KEY NOT NULL
	,qtde INT
	,subTotal MONEY
	,idVenda INT FOREIGN KEY REFERENCES tbVenda(idVenda)
	,idProduto INT FOREIGN KEY REFERENCES tbProduto(idProduto)
)
