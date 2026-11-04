
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["arbok"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["arbok"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ditto</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #A8A77A; --button-color: #A8A77A; --button-color-hover: #83825F;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/ditto.png" alt="Ditto">

    <form class="form" method="post" action="../pokemons/blastoise.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="errado" required><label>Branco</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="errado" required><label>Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required><label>Azul</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="errado" required><label>Laranja</label></div>
    
         <input  style="background-color: #A8A77A"  type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>


