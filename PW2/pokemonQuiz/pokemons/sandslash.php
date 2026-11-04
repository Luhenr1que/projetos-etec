
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["ninetales"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["ninetales"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sandslash</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #E2BF65;  --button-color: #E2BF65; --button-color-hover: #B0944E;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/sandslash.png" alt="Sandslash">

    <form class="form" method="post" action="../pokemons/rapidash.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required><label>Amarelo e Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Rosa e Branco</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Preto e Verde</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Preto e Azul</label></div>
    
         <input   style="background-color: #E2BF65" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>