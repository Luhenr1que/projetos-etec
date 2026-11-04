<?php
$ramdom = rand(1,30);

session_start();
$_SESSION["ramdom"] = $ramdom;
$a = $_SESSION["selectW"];
if($a =="certo"){
    $_SESSION["pokewild"] = true;
}
else{
    $_SESSION["pokewild"] = false;
}

if ($ramdom == 4){
    header("location: ./pokemons/wild/arceus.php");
}
else if ($ramdom == 11){
    header("location: ./pokemons/wild/giratina.php");
}
else if ($ramdom == 15){
    header("location: ./pokemons/wild/groudon.php");
}
else if ($ramdom == 5){
    header("location: ./pokemons/wild/kyogre.php");
}
else if ($ramdom == 24){
    header("location: ./pokemons/wild/dragonite.php");
}
else{
    header("location: ./index.php");
}
    
?>