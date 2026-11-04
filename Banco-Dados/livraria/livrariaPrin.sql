INSERT INTO tbEnd(
	logrEnd
	,numEnd
	,cepEnd
	,bairroEnd
	,ufEnd
	,cidadeEnd
	,complementoEnd
)
VALUES(
	'Rua Lala'
	,'12'
	,'08761110'
	,'Bairro do limoeiro'
	,'Sp'
	,'Itingatingtá'
	,'Perto do banco de couro'
),(
	'Rua mortiça'
	,'17'
	,'05771112'
	,'Bairro do limoeiro azul'
	,'Sp'
	,'Itingatingtá'
	,'Perto do banco de malha'
),(
	'Rua arroz'
	,'25'
	,'09371410'
	,'Bairro do limoeiro branco'
	,'Sp'
	,'Itingatingtá'
	,'Perto do banco de ouro'
),(
	'Rua farinha'
	,'196'
	,'02764415'
	,'Bairro do limoeiro'
	,'Sp'
	,'Itingatingtá'
	,'Perto do banco de ferro'
),(
	'Rua pedra verde'
	,'125'
	,'09613240'
	,'Bairro carvalho'
	,'Sp'
	,'Itingatingtá'
	,'Perto do banco de diamante'
)

INSERT INTO tbTelefoneCliente(
	descTelefoneCliente 
)
VALUES(
	'95200-3456'
),(
	'97934-3130'
),(
	'91234-5678'
),(
	'93456-7890'
),(
	'98765-4321'
)

INSERT INTO tbEmailCliente(
	desctbEmailCliente 
)
VALUES(
	'maria.silva@example.com'
),(
	'joao.pereira123@example.com'
),(
	'carla.martins@email.com'
),(
	'pedro_souza2025@gmail.com'
),(
	'ana.menezes@mail.com'
)

INSERT INTO tbCliente(
	cpfCliente
	,nomeCliente
)
VALUES(
	'94287590074'
	,'Maria da Silva'
),(
	'37194628510'
	,'João Pereira'
),(
	'62107493586'
	,'Carla Martins'
),(
	'94321087659'
	,'Pedro Souza'
),(
	'25103749682'
	,'Ana Menezes'
)

INSERT INTO tbTelEditora(
	descTelEditora
)
VALUES(
	'90982-2690'
),(
	'84712-5309'
),(
	'56293-1847'
),(
	'74160-3985'
),(
	'98342-6571'
)

INSERT INTO tbEndEditora(
	logrEndEditora
	,numEndEditora
	,cepEndEditora
	,bairroEndEditora
	,ufEndEditora
	,cidadeEndEditora
	,complementoEndEditora
)
VALUES(
	'Rua Seu Ricardo'
	,'975'
	,'45237163'
	,'Bairro do Barro'
	,'SP'
	,'Bit City'
	,'Perto da loja de computador'
),( 
	'Rua do Sol' 
	,'314' 
	,'56789213' 
	,'Bairro Novo' 
	,'MG' 
	,'Lunar City' 
	,'Ao lado da farmácia'
),( 
	'Rua das Acácias' 
	,'125' 
	,'94857231' 
	,'Vila Santa Clara' 
	,'BA' 
	,'Sky City' 
	,'Próximo à praça central' 
),( 
	'Rua das Orquídeas' 
	,'478' 
	,'75382164' 
	,'Jardim das Palmeiras' 
	,'PR' 
	,'Dream City' 
	,'Perto do centro comercial' 
),(
	'Rua dos Lírios' 
	,'536' 
	,'61294580' 
	,'Vila Verde' 
	,'SP' 
	,'Ocean City' 
	,'Próximo à escola municipal' 
)

INSERT INTO tbEditora(
	nomeEditora
	,cnpjEditora
)
VALUES(
	'Galéra'
	,'75839264718539'
),(
	'Seguinte'
	,'34752098637452'
),(
	'Harper'
	,'67482910375820'
),(
	'Dark-side'
	,'18264739582074'
),(
	'Record'
	,'50938467219384'
)

INSERT INTO tbAutor(
	dataNaScAutor
	,nacionalidadeAutor
	,nomeAutor
)
VALUES(
	'15-10-2006'
	,'Brasileiro'
	,'Eduardo'
),(
	'08-12-2027'
	,'Butonês'
	,'Roberto'
),(
	'22-03-2025'
	,'Holandês'
	,'Carlos'
),(
	'12-09-2004'
	,'Colombiano'
	,'Faustão'
),(
	'03-05-1999'
	,'Português'
	,'Mario'
)

INSERT INTO 

USE bdLivraria

SELECT* FROM tbEndEditora
