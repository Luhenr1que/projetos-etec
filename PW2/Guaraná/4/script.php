<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../4/style.css">
    <title>Reajuste</title>
</head>
<body>
<div class="container">
<div class="box">
    <?php
                echo"<br>";
        $nome = $_POST['nome'];

        echo "Nome: " . $nome . "<br>";
            echo"<br>";
        $num = $_POST['sal'];

        echo "Salário: " . number_format($num, 2, ',', '.') . "<br>";
        $ajus = $num*0.12;
            echo"<br>";
        echo "Reajuste: " . number_format($ajus, 2, ',', '.') . "<br>";
        $num = $num+$ajus;
            echo "<br>";
        echo "Valor final: " . number_format($num, 2, ',', '.') . "<br>";
        echo"<br>";
    ?>
</div>
</div>
</body>
</html>
