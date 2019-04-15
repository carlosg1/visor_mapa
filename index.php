<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link rel="stylesheet" href="css/leaflet.css">
        <link rel="stylesheet" href="css/qgis2web.css">
        <link rel="stylesheet" href="css/Control.OSMGeocoder.css">
        <link rel="stylesheet" href="css/leaflet-measure.css">
    
        <link rel="stylesheet" href="css/estilo.css"> 
    
        <script src="js/qgis2web_expressions.js"></script>
        <script src="js/leaflet.js"></script>
        <script src="js/leaflet.rotatedMarker.js"></script>
        <script src="js/leaflet.pattern.js"></script>
        <script src="js/leaflet-hash.js"></script>
        <script src="js/Autolinker.min.js"></script>
        <script src="js/rbush.min.js"></script>
        <script src="js/labelgun.min.js"></script>
        <script src="js/labels.js"></script>
        <script src="js/leaflet.wms.js"></script>
        <script src="js/Control.OSMGeocoder.js"></script>
        <script src="js/leaflet-measure.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>

        <script src="js/mostrar-infowindow.js"></script>

        <script src="js/appmcc.js"></script>
       
        <title>Visor de mapa Municipalidad de Corrientes</title>

    </head>
    <body>
        <!-- ARBOL DE CAPAS -->
        <div id="lateral">
			<div>
                <div id="contraer">
                    <span><img src="images/collapse-arrow.png" border="0" width="12" height="12" /></span>
                </div>
                <div style="clear:both;"></div>
            </div>
            
			<!-- contenedor para el arbol -->
            <div id="contenedorArboles">
                <div id="arbolCapaBase">
                     <!-- incluyo capas base --> 
                     <?php include("capas/capa_base.php"); ?>
                </div>

				<div id="arbolMCC">
                    <!-- arbol de capa publico -->
                    <?php include("capas/publico.php"); ?>

				</div>
			</div>
		</div>

        <div id="map"></div>

       

    </body>
</html>
