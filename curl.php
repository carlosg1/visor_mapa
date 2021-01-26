<?php
/*
 * curl.php
 * consulta al geoserver por los datos de una capa con getFeatureInfo
 * y devuelve los resultados en formato JSON
 *
 * Developer: Lic. Carlos Garcia - carlosgctes@gmail.com
 * Fecha actualizacion: 28/03/2019
 *
 */
// arma la url de los datos recibidos por GET
$url = '';

foreach($_GET as $clave => $valor){
  $t = strpos($valor, '?') ? '' : '&';
  $url .= ($clave == 'url') ? $valor : $clave . '=' . $valor . $t;
}

// elimina el ultimo & (ampersand) de la cadena
$url = trim($url, '&');

// lee los datos utilizando la libreria curl y
// devuelve los datos en formato JSON
$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);

//curl_setopt($curl, CURLOPT_HEADER, 0);

curl_setopt($curl, CURLOPT_PORT, 8282);

curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);

curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);


curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);


curl_setopt($curl, CURLOPT_TIMEOUT, 5);
//curl_setopt($curl, CURLOPT_MUTE, 1);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

//curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

//curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

//curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$return_data = curl_exec($curl);

$http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

$error = curl_error($curl);

curl_close($curl);

if($http_status != 200) {
  
    error_log('CDG - ' . date('Y') . ' - ' . $http_status);

  echo '{"error":"true"}'.$http_status;
    echo $error;
  exit;
}

if ($http_status=="401")
{
  $content="{error:401}";
}

// $content = utf8_encode($return_data);
$content = $return_data;
// $content = json_encode($content);

echo $content;

?>
