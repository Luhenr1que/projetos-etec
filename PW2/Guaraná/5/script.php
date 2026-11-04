
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../5/style.css">
    <title>Área</title>
</head>
<body>
<div class="container">
<div class="box">
    <?php
        $alt = $_POST ['D'];
        $dia = $_POST ['d'];
        $A = $alt*$dia/2;
        echo "<p class='t'>A área do losangulo é ". $A."</p>";
    ?>
</div>
</div>
</body>
</html>


