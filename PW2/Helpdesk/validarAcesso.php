<?php
require_once "validarAcesso.php";
session_start();
if(!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] == 'Não'){
    header('Location: index.php?login=erro2');
}

?>