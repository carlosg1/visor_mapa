<?php 
session_id('obraspuntuales');
session_start();
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Acceder al sistema</title>
</head>
<body>
    <form action="validar.php" method="post">
        <h1>Ingresar con usuario y contraseña</h1>

        <div>

        <fieldset>
            <legend>Ingrese usuario y contrase&ntilde;a</legend>

            <label for="usuario"><span style="width:150px;">Usuario:</span></label>
            <input type="text" id="usuario" name="usuario" required minlength="4" maxlength="8" size="10">

            <br><br>

            <label for="pass">Contrase&ntilde;a</label>
            <input type="password" name="pass" id="pass" required>

            <br><br>

            <button type="submit">Acceder</button>
        </fieldset>
        


        </div>
        

    </form>
</body>
</html>