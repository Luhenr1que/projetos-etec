<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['nome'])) { header('Location: ../index.php'); exit; }
?>

<?php
    $a = ($_POST["select"] ?? null);

    $_SESSION["select"] = $a;
    if(isset($a)){
    
            if ($a == "certo") {
                $_SESSION["mew"]=2;
            } else{
                $_SESSION["mew"]=3;
            }
        }
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lugia</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
<link rel="stylesheet" href="../css/quiz.css?v=2">
</head>
<body style="--button-color: #A98FF3; --button-color-hover: #836FBD;" class="backMar">
<div class="box">

<img src="../img/titulo.png" class="titulo" alt="Pokémon Quiz">
<h1>*BÔNUS 2*</h1>
<p class="eyebrow">RODADA BÔNUS</p><h1>Qual é a cor da versão shiny?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/lugia.png" alt="Lugia">

    <form class="form" method="post" action="../pokemons/rayquaza.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required id="answer-1"><label for="answer-1">Branco e Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-2"><label for="answer-2">Vermelho e Branco</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-3"><label for="answer-3">Azul e Dourado</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-4"><label for="answer-4">Branco e Preto</label></div>
    
         <input  style="background-color: #A98FF3"  type="submit" value="Confirmar resposta →" class="botao">
    </form>

</div>
<a class="exit-link" href="../index.php">← Recomeçar jornada</a><script src="../js/quiz.js" defer></script></body>
</html>