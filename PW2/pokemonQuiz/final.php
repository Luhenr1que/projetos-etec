<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['nome'])) { header('Location: index.php'); exit; }
?>
<?php

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado</title>
    <link rel="icon" href="./img/pokeIcon.png">
    <link rel="stylesheet" href="./css/style.css">
<link rel="stylesheet" href="css/quiz.css?v=2">
</head>



<body>
    <div class="box">

        <img src="./img/titulo.png" id="titulo" alt="Pokémon Quiz">
            
            <p class="eyebrow">JORNADA CONCLUÍDA</p><h1 class="results-title">Sua coleção de acertos.</h1><div class="nome"><?php echo htmlspecialchars($_SESSION["nome"], ENT_QUOTES, "UTF-8"); ?></div>

            <div class="aprenseta"><?php 



                if($_SESSION["opcao"] == "male"){
                    echo "<img src='./img/male.png' alt='Imagem 1' class='ImgM'>";
                }
                else{
                    echo "<img src='./img/female.png' alt='Imagem 1' class='ImgF'>";
                }
            
            ?></div>

            <div class="porcentagem"><?php
                echo "Acertos: ".$_SESSION["porc"]."%";
            ?></div>

    <div>

            <div class="linha">
                <?php if($_SESSION["arbok"]==true) {
                    echo "<div class='arbok on'></div>";
                    }
                    else{
                    echo "<div class='arbok off'></div>";;
                    }
                ?>

                <?php if($_SESSION["ditto"]==true) {
                    echo "<div class='ditto on'></div>";
                    }
                    else{
                    echo "<div class='ditto off'></div>";;
                    }
                ?>

                <?php if($_SESSION["blastoise"]==true) {
                    echo "<div class='blastoise on'></div>";
                    }
                    else{
                    echo "<div class='blastoise off'></div>";;
                    }
                ?>
            </div>
                
            <div class="linha">

            <?php if($_SESSION["charizard"]==true) {
                    echo "<div class='charizard on'></div>";
                    }
                    else{
                    echo "<div class='charizard off'></div>";;
                    }
                ?>
            <?php if($_SESSION["vennusar"]==true) {
                    echo "<div class='vennusar on'></div>";
                    }
                    else{
                    echo "<div class='vennusar off'></div>";;
                    }
                ?>
            <?php if($_SESSION["gengar"]==true) {
                    echo "<div class='gengar on'></div>";
                    }
                    else{
                    echo "<div class='gengar off'></div>";;
                    }
                ?>
            </div>

            <div class="linha">
            <?php if($_SESSION["gyaradus"]==true) {
                    echo "<div class='gyaradus on'></div>";
                    }
                    else{
                    echo "<div class='gyaradus off'></div>";;
                    }
                ?>
            <?php if($_SESSION["ninetales"]==true) {
                    echo "<div class='ninetales on'></div>";
                    }
                    else{
                    echo "<div class='ninetales off'></div>";;
                    }
                ?>
            <?php if($_SESSION["sandslash"]==true) {
                    echo "<div class='sandslash on'></div>";
                    }
                    else{
                    echo "<div class='sandslash off'></div>";;
                    }
                ?>
            </div>

            <div class="linha">
            <?php if($_SESSION["rapidash"]==true) {
                    echo "<div class='rapidash on'></div>";
                    }
                    else{
                    echo "<div class='rapidash off'></div>";;
                    }
                ?>
            </div>

            <div class="linha">
            <?php if($_SESSION["mew"]==1) {
                    echo "<div class='erroMew dark'></div>";
                    }
                    else if($_SESSION["mew"]==2){
                    echo "<div class='mew on'></div>";
                    }
                    else{
                    echo"<div class='mew off'></div>";
                    }
                ?>
            <?php if($_SESSION["lugia"]==1) {
                    echo "<div class='erroLugia dark'></div>";
                    }
                    else if($_SESSION["lugia"]==2){
                    echo "<div class='lugia on'></div>";
                    }
                    else{
                    echo"<div class='lugia off'></div>";
                    }
                ?>
            <?php if($_SESSION["rayquaza"]==1) {
                    echo "<div class='erroRayquaza dark'></div>";
                    }
                    else if($_SESSION["rayquaza"]==2){
                    echo "<div class='rayquaza on'></div>";
                    }
                    else{
                    echo"<div class='rayquaza off'></div>";
                    }
                ?>
            </div>

            <?php 

                    switch($_SESSION["ramdom"]){
                        case 4:
                            echo "<div class='linha'><div class='blue'><div class='arceus'></div></div></div>";
                            break;
                        case 5:
                                    echo "<div class='linha'><div class='blue'><div class='kyogre'></div></div></div>";  
                            break;
                        case 11:
                                    echo "<div class='linha'><div class='blue'><div class='giratina'></div></div></div>";
                            break;
                        case 15:
                                echo "<div class='linha'><div class='blue'><div class='groudon'></div></div></div>";
                            break;
                        case 24:
                                echo "<div class='linha'><div class='blue'><div class='dragonite'></div></div></div></div>";
                            break;
                        default:

                    }
            ?>

        <form method="post" action="./index.php">
            <input style="background-color:rgb(207, 42, 42);" value="Nova aventura" type="submit" class="botao">
        </form><a class="section-link" href="compaWild.php">Tentar um encontro raro ✦</a>
    </div>



    </div>
<script src="js/quiz.js" defer></script></body>
</html>