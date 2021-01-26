<?php
require('conPDO1921681051.php');

$busqueda = $_GET['busqueda'];
$busqueda = strtoupper($busqueda);

$sql = "SELECT set_limit(0.5), * FROM (
            SELECT nombre_calles || ' ' || altur_par AS nombre,
                    'Calle' AS tipo,
                    the_geom_calles AS the_geom
            FROM gismcc.vw_calles_de_la_ciudad

            UNION ALL

            SELECT descripcion AS  nombre,
                   tipo AS tipo,
                   the_geom AS the_geom
            FROM gismcc.vw_dependencias_municipales

            UNION ALL

            SELECT nombre_barrio AS nombre,
                   'Barrio' AS tipo,
                   the_geom_barrios AS the_geom
            FROM gismcc.vw_barrios_de_la_ciudad

            UNION ALL

            SELECT
                (
                    CASE
                        WHEN nombre_plaza IS NULL THEN 'S/N'
                        ELSE nombre_plaza
                    END
                ) AS nombre,
                (
                    CASE
                        WHEN clasificacion IS NULL THEN 'ESPACIO VERDE'
                        ELSE clasificacion
                    END
                ) AS tipo,
                the_geom AS the_geom
            FROM
                gismcc.vw_espacio_verde

            
) AS foo WHERE foo.nombre % '%$busqueda%' AND similarity(foo.nombre, '$busqueda') >= 0.3";

$sql = $conPdoPg->prepare($sql);
$sql->execute();

$datos = [];
while ($fila = $sql->fetch(PDO::FETCH_ASSOC)) {
    $datos[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($datos);