
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["vennusar"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["vennusar"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gengar</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #735797; --button-color: #735797; --button-color-hover: #594375;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/gengar.png" alt="Gengar">

    <form class="form" method="post" action="../pokemons/gyaradus.php">
         <div class="text"><input type="radio" class="radio" name="select" value="certo" required><label>Cinza</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Azul Escuro</label></div>
         <div class="text secret"><input type="radio" class="radio" name="select" value="false" required><label>Dourado</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Branco</label></div>
    
         <input  style="background-color: #735797"  type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>