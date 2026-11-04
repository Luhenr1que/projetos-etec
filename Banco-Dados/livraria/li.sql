CREATE DATABASE bdLivraria

CREATE TABLE tbEnd(
	idEnd INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,logrEnd VARCHAR(100) NOT NULL
	,numEnd VARCHAR(30) NOT NULL
	,cepEnd VARCHAR(8) NOT NULL
	,bairroEnd VARCHAR(100) NOT NULL
	,ufEnd CHAR(2) NOT NULL
	,cidadeEnd VARCHAR(100) NOT NULL
	,complementoEnd	VARCHAR(150) NOT NULL
)

CREATE TABLE tbTelefoneCliente(
	idTelefoneCliente INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,descTelefoneCliente VARCHAR(20)
)

CREATE TABLE tbEmailCliente(
	idEmailCliente INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,desctbEmailCliente VARCHAR(100) 
)

CREATE TABLE tbCliente(
	idCliente INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,cpfCliente VARCHAR(11) NOT NULL
	,nomeCliente VARCHAR(100) NOT NULL
	,emailCliente VARCHAR(150) NOT NULL
	,idtbEmailCliente INT FOREIGN KEY REFERENCES tbEmailCliente(idEmailCliente)
	,idTelefoneCliente INT FOREIGN KEY REFERENCES tbTelefoneCliente(idTelefoneCliente)
)

CREATE TABLE tbTelEditora(
	idTelEditora INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,descTelEditora VARCHAR (100)
)

CREATE TABLE tbEndEditora(
	idEndEditora INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,logrEndEditora VARCHAR(100) NOT NULL
	,numEndEditora VARCHAR(30) NOT NULL
	,cepEndEditora VARCHAR(8) NOT NULL
	,bairroEndEditora VARCHAR(100) NOT NULL
	,ufEndEditora CHAR(2) NOT NULL
	,cidadeEndEditora VARCHAR(100) NOT NULL
	,complementoEndEditora	VARCHAR(150) NOT NULL
)

CREATE TABLE tbEditora(
	idEditora INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,nomeEditora VARCHAR (50) 
	,cnpjEditora VARCHAR (30)
	,idEndEditora INT FOREIGN KEY REFERENCES tbEndEditora(idEndEditora) 
	,idTelEditora INT FOREIGN KEY REFERENCES TBTelEditora(IDTelEditora)
)

CREATE TABLE tbAutor(
	idAutor INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,dataNaScAutor DATE
	,nacionalidadeAutor VARCHAR(50)
	,nomeAutor VARCHAR(100)
)
CREATE TABLE tbLivro (
	idLivro INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,isbnLivro VARCHAR (13)
	,autorLivro VARCHAR (100)
	,idiomaLivro VARCHAR (30)
	,dataLancamentoLivro DATE
	,qtdePagLivro INT
	,tituloLivro VARCHAR (100)
	,generoLivro VARCHAR (100)
	,precoLivro MONEY
	,idEditora INT FOREIGN KEY REFERENCES tbEditora(idEditora)
)

CREATE TABLE tbLivroAutor(
	idLivroAutor INT IDENTITY(1,1) NOT NULL
	,idLivro INT FOREIGN KEY REFERENCES tbLivro(idLivro)
	,idAutor INT FOREIGN KEY REFERENCES tbAutor(idAutor)
)
CREATE TABLE tbCompraLivro (
	idCompraLivro INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	,dataCompraLivro DATE
	,idCliente INT FOREIGN KEY REFERENCES tbCliente(idCliente)
	,idLivro INT FOREIGN KEY REFERENCES tbLivro(idLivro)
)
