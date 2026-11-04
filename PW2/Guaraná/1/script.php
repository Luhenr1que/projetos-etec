<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../1/style.css">
    <title>Resultado</title>
</head>
<body>
<div class="container">
<div class="box">
    <?php
        $num = $_POST['Num'];
        if($num%2==0){
            echo "O número ".$num." é par";
        }else{
            echo "O número ".$num." é impar";
        }
    ?>
</div>
</div>
</body>
</html>
