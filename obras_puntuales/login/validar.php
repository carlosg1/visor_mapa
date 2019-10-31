<?php
$username = $_GET['usuario'];
$password = $_GET['password'];

$permitido = 'NO';

if($username=='carlosg' && $password=='147') $permitido = 'SI';
if($username=='dario' && $password=='147') $permitido = 'SI';
if($username=='romina' && $password=='147') $permitido = 'SI';
if($username=='consulta' && $password=='ver125') $permitido = 'SI';


if($permitido=='SI'){

    session_name('obras_puntuales');
    session_start();

    $_SESSION['validado'] = 'SI';
    $_SESSION['usuario'] = $username;

}

echo $permitido;

?>
