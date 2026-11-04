
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($a)){
    
            if ($a == "certo") {
                $_SESSION["rayquaza"]=2;
            } else{
                $_SESSION["rayquaza"]=3;
            }
            header("location: ./final.php");
        }
    gettype("select")


    
?>