<?php
/**
 * Este script se utiliza para hacer la busqueda de objetos geometricos.
 * Funcionamiento:
 *   en la variable post 'a' recibe una marca para saber donde buscar.
 *   esa marca puede ser: 'calle', 'barrio', 'partida inmo', 'dependencia municipal', etc, etc.
 *   con esa marca se en que tabla de la base de datos tiene que buscar.
 * 
 * Desarrollo: Lic. Carlos Garcia - carlosgctes[@]gmail[.]com"
 * Fecha Modif.: 11/07/2019
 */

require_once('conPDO1921681051.php');

$ret = '';

$que_busca = is_null($_POST['a']) ? '' : $_POST['a'];

$nombre_calle = mb_strtoupper($_POST['nombre_calle'], 'utf-8');

if($nombre_calle == ""){

    echo -1; // no hay resultados

    exit;

}

// selecciona que buscar
switch($que_busca){

    case 'Calle':

        // st_transform(st_setsrid(t1.the_geom, 4326), 22185) AS the_geom,
        $qry_calle = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom_calles, 22185), 4326))::json as \"geometry\"
        FROM gismcc.calles 
        WHERE nombre_calles LIKE '%$nombre_calle%'";

        $rst_calle = $conPdoPg->query($qry_calle);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst_calle->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg_calle = $rst_calle->fetchObject()){
            if($c > 0) { 

                $ret .= ',';

            }

            $ret .=  $reg_calle->geometry;

            $c++;
        }
        
    break;

    case 'Barrio':

        $qry = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom_barrios, 22185), 4326))::json as \"geometry\"
        FROM gismcc.vw_barrios_de_la_ciudad 
        WHERE nombre_barrio LIKE '%$nombre_calle%'";

        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) { 

                $ret .= ',';

            }

            $ret .=  $reg->geometry;

            $c++;
        }

    break;

    case 'partida inmo':

        $qry = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as \"geometry\"
        FROM gismcc.vw_parcelas 
        WHERE adrema LIKE '%$nombre_calle%'";

        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) { 

                $ret .= ',';

            }

            $ret .=  $reg->geometry;

            $c++;
        }

    break;

    case 'dependencia municipal':

        $qry = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as \"geometry\"
        FROM gismcc.vw_dependencias_municipales 
        WHERE upper(descripcion) LIKE '%$nombre_calle%'";

        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) { 

                $ret .= ',';

            }

            $ret .=  $reg->geometry;

            $c++;
        }

    break;

}

echo '[' . $ret . ']'; // devuelve un string geojson

exit();

?>