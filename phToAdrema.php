<?php
require_once('conPDO1921681051.php');
$gid = $_GET['gid'];

$sql = "SELECT t1.the_geom, t1.gid , t2.* FROM gismcc.parcelas AS t1
        LEFT JOIN gismcc.ph_parcelas t2 ON ST_Intersects(t2.the_geom,t1.the_geom)
        WHERE t1.gid= $gid ORDER BY t2.piso, t2.dpto LIMIT 1000";

$sql = $conPdoPg->prepare($sql);
$sql->execute();

$data = [];
while ($reg = $sql->fetch(PDO::FETCH_ASSOC)) {
    $res = [];
    $res['adrema'] = $reg['adrema'];
    $res['dpto'] = $reg['dpto'];
    $res['piso'] = $reg['piso'];
    $res['descripcion'] = $reg['descripcio'];
    $res['puerta'] = $reg['puerta'];
    $res['frente'] = $reg['frente'];
    $res['fondo'] = $reg['fondo'];
    $data[] = $res;
}

$sql->closeCursor();
$conPdoPg = null;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);