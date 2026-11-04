<?php

$a = $_POST["select"];

session_start();
$_SESSION["select"] = $a;
if(isset($_POST["select"])){

        if ($_SESSION["select"] == "certo") {
            $_SESSION["acertos"] += 1;
            $_SESSION["rapidash"]=true;
        } else{
            $_SESSION["erros"] += 1; 
            $_SESSION["rapidash"]=false;
        }
    }

    $_SESSION["mew"] = 1;
    $_SESSION["lugia"] = 1;
    $_SESSION["rayquaza"] = 1;

    $_SESSION["porc"] = ($_SESSION["acertos"] / 10) * 100;

    $_SESSION["erros"] = 0;
    $_SESSION["acertos"] = 0;

if($_SESSION["porc"] >= 100){
    header("location: ./pokemons/mew.php");
    exit;
} else {
    header("location: ./final.php");
    exit;
}

?>