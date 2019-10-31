<?php
    session_name('obras_puntuales');
    session_start();

    if(!isset($_SESSION['usuario'])){
        echo 'falta login';
        header('location: login/');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Carga imagenes de obras puntuales</title>
</head>
<body>
    <h1>Carga imagenes obras puntuales</h1>

    <h3>para:</h3>

    <p>Obra:</p>
    <p>Descripcion:</p>

    <form action="cargar_foto.php" method="post">
        <fieldset>
            <legend>Puede subir hasta 4 fotos</legend>

            <label for="foto1">Foto 1: </label>
            <input type="file" name="foto1" id="foto1" accept="image/png, image/jpeg">

            <br><br>

            <label for="foto2">Foto 2: </label>
            <input type="file" name="foto2" id="foto2" accept="image/png, image/jpeg">

            <br><br>

            <label for="foto3">Foto 3: </label>
            <input type="file" name="foto3" id="foto3" accept="image/png, image/jpeg">

            <br><br>

            <label for="foto4">Foto 4: </label>
            <input type="file" name="foto4" id="foto4" accept="image/png, image/jpeg">

            <br><br>

            <button type="submit">Subir foto</button>
            <button id="btnSalir">Salir</button>
        </fieldset>

    </form>
    
</body>
</html>