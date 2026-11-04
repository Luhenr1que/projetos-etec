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
                $_SESSION["gengar"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["gengar"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gyarados</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
<link rel="stylesheet" href="../css/quiz.css?v=2">
</head>
<body style="background-color: #6390F0; --button-color: #6390F0; --button-color-hover: #4D70BB;">
<div class="box">

<img src="../img/titulo.png" class="titulo" alt="Pokémon Quiz">
<p class="eyebrow">PERGUNTA 07 / 10</p><progress value="6" max="10" aria-label="Perguntas concluídas"></progress><h1>Qual é a cor da versão shiny?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/gyarados-f.png" alt="Gyarados">

    <form class="form" method="post" action="../pokemons/ninetales.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-1"><label for="answer-1">Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required id="answer-2"><label for="answer-2">Vermelho</label></div>
         <div class="text secret"><input type="radio" class="radio" name="select" value="false" required  id="answer-3"><label for="answer-3">Dourado</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-4"><label for="answer-4">Verde</label></div>
    
         <input  style="background-color: #6390F0"  type="submit" value="Confirmar resposta →" class="botao">
    </form>

</div>
<a class="exit-link" href="../index.php">← Recomeçar jornada</a><script src="../js/quiz.js" defer></script></body>
</html>