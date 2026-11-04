<?php
    session_start();

    $usariosApp = array(
        array('id'=>1,'email'=>'teste@gmail.com','senha'=>'1234'),
        array('id'=>2,'email'=>'mario@gmail.com','senha'=>'1234')
    );

    $autenticador = false;
    foreach($usariosApp as $user){
        if($user['email']==$_POST['email'] && $user['senha']==$_POST['senha']){
            $autenticador = true;
        }
    }
    if($autenticador){
        $_SESSION['autenticado'] = "Sim";
        header('Location: home.php');
    }else{
        $_SESSION['autenticado'] = "Não";
        header('Location: index.php?login=erro');
    }
?>