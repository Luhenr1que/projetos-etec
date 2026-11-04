<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylePhp.css">
    <title>Document</title>
</head>
<body>
<div lass="php">
    <div class="box2">
        <?php
        $nome = $_POST["nome"];     
        $email = $_POST["email"];     
        $defeito = $_POST["defeito"];   
        $marca = $_POST['marca'];          
        $noti = $_POST["noti"];
        $desc = $_POST["desc"];

            echo"<div id='box'>";

                echo"<img src='./img/logo.png' class='logo'>";

                echo"<div>";
                echo"<h1>Nome: {$nome}</h1>";
                echo"</div>";

                echo"<div>";
                echo"<h1>E-mail: {$email}</h1>";
                echo"</div>";

                echo"<div>";
                echo"<h1>Defeito: {$defeito}</h1>";
                echo"</div>";
            
                echo"<div>";
                echo"<h1>Marca: {$marca}</h1>";
                echo"</div>";

                if($noti=='sim'){
                    echo"<div><h1>Você receberá <br> notificações!</h1></div>";
                }
                else{
                    echo"<div><h1>Você não receberá notificações!</h1></div>";
                };

                echo"<div>";
                echo"<h1>Descrição do problema: <br></h1>";

                    echo"<div class='textArea'>";
                    echo"<h2>{$desc}</h2>";
                    echo"</div>";

                echo"</div>";            
            echo"</div>";
        
        ?>
    </div>
</div>    
</body>
</html>