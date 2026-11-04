<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../2/style.css">
    <title>RESULTADO</title>
</head>
<body>
<div class="container">
<div class="box">
    <?php
                echo"<br>";
        $num = $_POST['Num'];
        $a = $num*$num;
        echo "Valor ao quadrado: " . $a."<br>";
        $b = $num*$num*$num;
        echo"<br>";
        echo "Valor ao cubo: " . $b."<br>";
        echo"<br>";
    ?>
</div>
</div>
</body>
</html>
