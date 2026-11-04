<?php 
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    $_SESSION = ['ramdom' => 0];
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Quiz</title>
    <link rel="icon" href="./img/pokeIcon.png">
    <link rel="stylesheet" href="./css/index.css">
    <link rel="stylesheet" href="css/quiz.css?v=2">
</head>

<body>
    <div class="box">

        <img src="./img/titulo.png" id="titulo" alt="Pokémon Quiz">

        <form action="./pokemons/arbok.php" method="post">

            <div id="nome">
                <label class="name-label" for="trainer-name">Qual o nome do seu treinador?</label>
                <input id="trainer-name" type="text" name="nome" class="nomeText" placeholder="Qual o nome do seu treinador?" required maxlength="20" pattern=".*\S.*" autocomplete="nickname">
            </div>
            <fieldset class="trainer-choices"><legend>Escolha seu personagem</legend><div id="radio">
                <label class="radio-label">
                    <input type="radio" name="opcao" value="male" class="radio-input" required >
                    <img src="./img/male.png" alt="Treinador" class="radioImgM">
                </label>

                <label class="radio-label">
                    <input type="radio" name="opcao" value="female" class="radio-input" required>
                    <img src="./img/female.png" alt="Treinadora" class="radioImgF">
                </label>
            </div></fieldset>

            <input type="submit" value="Iniciar" class="botao">

        </form>
    </div>
<script src="js/quiz.js" defer></script></body>

</html>