
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["sandslash"]=true;
            } else{
                $_SESSION["erros"] += 1;
                $_SESSION["sandslash"]=false; 
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapidash</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #EE8130; --button-color: #EE8130; --button-color-hover: #B96425;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/rapidash.png" alt="Rapidash">

    <form class="form" method="post" action="../compa.php">
         <div class="text"><input type="radio" class="radio" name="select" value="false" required><label>Fogo Verde</label></div>
         <div class="text"><input type="radio" class="radio" name="select" value="false" required><label>Fogo Rosa</label></div>
         <div class="text"><input type="radio" class="radio" name="select" value="certo" required><label>Fogo Cinza</label></div>
         <div class="text"><input type="radio" class="radio" name="select" value="false" required><label>Fogo Roxo</label></div>
    
         <input   style="background-color: #EE8130" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>