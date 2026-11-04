<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['nome'])) { header('Location: ../index.php'); exit; }
?>


<?php
    $a = ($_POST["select"] ?? null);

    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["blastoise"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["blastoise"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Charizard</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
<link rel="stylesheet" href="../css/quiz.css?v=2">
</head>
<body style="background-color: #EE8130; --button-color: #EE8130; --button-color-hover: #B96425;">
<div class="box">

<img src="../img/titulo.png" class="titulo" alt="Pokémon Quiz">
<p class="eyebrow">PERGUNTA 04 / 10</p><progress value="3" max="10" aria-label="Perguntas concluídas"></progress><h1>Qual é a cor da versão shiny?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/charizard.png" alt="Charizard">

    <form class="form" method="post" action="../pokemons/venossaur.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-1"><label for="answer-1">Branco e Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required id="answer-2"><label for="answer-2">Preto e Vermelho</label></div>
         <div class="text secret"><input type="radio" class="radio" name="select" value="false" required id="answer-3"><label for="answer-3">Dourado e Preto</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-4"><label for="answer-4">Azul e Vermelho</label></div>
    
         <input  style="background-color: #EE8130" type="submit" value="Confirmar resposta →" class="botao">
    </form>

</div>
<a class="exit-link" href="../index.php">← Recomeçar jornada</a><script src="../js/quiz.js" defer></script></body>
</html>