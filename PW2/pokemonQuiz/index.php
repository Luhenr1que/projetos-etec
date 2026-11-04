<?php 
    session_start();
    $_SESSION["ramdom"] = 0;
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="icon" href="./img/pokeIcon.png">
    <link rel="stylesheet" href="./css/index.css">
</head>

<body>
    <div class="box">

        <img src="./img/titulo.png" id="titulo">

        <form action="./pokemons/arbok.php" method="post">

            <div id="nome">
                <input type="text" name="nome" class="nomeText" placeholder="Qual o nome do seu treinador?" required maxlength="20">
            </div>
            <div id="radio">
                <label class="radio-label">
                    <input type="radio" name="opcao" value="male" class="radio-input" required >
                    <img src="./img/male.png" alt="Imagem 1" class="radioImgM">
                </label>

                <label class="radio-label">
                    <input type="radio" name="opcao" value="female" class="radio-input" required>
                    <img src="./img/female.png" alt="Imagem 2" class="radioImgF">
                </label>
            </div>

            <input type="submit" value="Iniciar" class="botao">

        </form>
    </div>
    </div>
</body>

</html>