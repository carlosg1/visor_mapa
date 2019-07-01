<?php

/**
 * Devuelve el grafico (legend graphic) de una capa, 
 * haciendo un request a la api rest de geoserver
 */

$layer = $_REQUEST['LAYER'];

$ruta_legend = 'images/legend/';

// si el archivo legend ya existe devuelvo ese archivo, sino
// crea el archivo, lo graba para futuras consultas y 
// devuelve el legend recien creado
// aca suponemos que existe la ruta: images/legend

if(file_exists($ruta_legend . $layer . '.png')){

    echo imagepng($ruta_legend . $layer . '.png');

    exit;

}

$ws = array_key_exists("WS", $_REQUEST) ? $_REQUEST['WS'] : "transporte";

$url = "http://192.168.10.51:8282/geoserver/$ws/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=16&HEIGHT=16&TRANSPARENT=true&LAYER=" . $layer;

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);

curl_setopt($curl, CURLOPT_HEADER, 0);

curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: image/png'));

curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$return_data = curl_exec($curl);

$http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

if(strpos($return_data, '<ServiceException>')){

    readfile('images/icon/linea-celeste.png');

    header('Content-Type: image/png');

    exit;
}

$imagen = $return_data;

$img = @imagecreatefromstring($imagen);

$ancho = imagesx($img);

$alto = imagesy($img);

if($ancho > 20){

    $img1 = imagecreatetruecolor(16, $alto);

    imagecopy($img1, $img, 0, 0, 0, 0, imagesx($img), imagesy($img));

    $img2 = imagecreatetruecolor(16, 16);

    // imagecopyresampled($img2, $img1, 0, 0, 0, 32, 16, 16, imagesx($img1), imagesy($img1));

    imagecopyresampled($img2, $img1, 0, 0, 0, 0, 16, 16, 16, 16);

    // color de fondo para hacer transparente
    $negro = imagecolorallocate($img2, 0, 0, 0);

    // hacer transparente el color de fondo seleccionado
    imagecolortransparent($img2, $negro);

    // color de fondo para hacer transparente
    //$blanco = imagecolorallocate($img2, 255, 255, 255);

    // hacer transparente el color de fondo seleccionado
    // imagecolortransparent($img2, $blanco);

    $fp = fopen($ruta_legend . $layer . '.png', 'w');

    fwrite($fp, $imagen);

    fclose($fp);

    header('Content-Type: image/png');

    echo imagepng($img2);

} else {

    // color de fondo para hacer transparente
    $blanco = imagecolorallocate($img, 255, 255, 255);

    // hacer transparente el fondo blanco
    imagecolortransparent($img, $blanco);

    $fp = fopen($ruta_legend . $layer . '.png', 'w');

    fwrite($fp, $imagen);

    fclose($fp);

    header('Content-Type: image/png');

    echo imagepng($img);

}



?>