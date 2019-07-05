<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link rel="stylesheet" href="css/leaflet.css">
        <link rel="stylesheet" href="css/Control.OSMGeocoder.css">
        <link rel="stylesheet" href="css/leaflet-measure.css">

        <link rel="stylesheet" href="css/estilo.css"> 

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

        <!-- script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script -->
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/humanity/jquery-ui.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>

        <script src="mapa/mapa.js"></script>
        <script src="js/mostrar-infowindow.js"></script>

        <script src="js/appmcc.js"></script>
        <script src="capas/publico.js"></script>
       
        <title>Visor de mapa Municipalidad de Corrientes</title>

    </head>
    <body>

        <div id="map"></div>

        <!-- menu hamburguesa --> 
        <div id="contenedor-hamburguesa">
            <div id="botonmax">
                <div id="botonmax-simple" style="text-align: left;">
                    <div id="botonmax-simple-root botonmax-activo">
                        <div class="cajabusqueda-caja-contenedor">
                            <button id="btn-abrir" class="icono-hamburgesa"> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- caja de busqueda --> 
        <div id="busca-contenedor">
            <div id="busca-root">
                <form id="frmBusca">
                    <input type="text" id="input-busqueda" autocomplete="off" placeholder="Buscar calle, ej: Mendoza">
                </form>

                <div id="lupa-busca-contenedor">
                    <button id="lupa-busca-boton"></button>
                    
                    
                </div>

                <span id="busca-separador"></span>
            </div>
        </div>

        <!-- ARBOL DE CAPAS -->
        <div id="lateral">
            <!-- div style="display: block;" -->
                <div id="contraer">
                    <button id="btn-contraer" class="sprite-arrow"> </button>
                    <!--
                    <span><img src="images/collapse-arrow.png" border="0" width="12" height="12" /></span>
                    -->
                </div>
            <!-- /div -->

            <div class="topBanner">
                <span>
                    <img src="images/topBanner.jpg" alt="Municipalidad de Corrientes">
                </span>
            </div>

            <!-- contenedor para el arbol -->
            <div id="contenedorArboles">
                <div id="arbolCapaBase">
                        <!-- incluyo capas base --> 
                        <?php include("capas/tree_capa_base.php"); ?>
                </div>

                <div id="arbolMCC">
                    <!-- arbol de capa publico -->
                    <?php include("capas/tree_publico.php"); ?>

                </div>
            </div>

        </div>

        <!-- dialogos -->
        <!-- mensaje que no se encontro ningun elemento -->
        <div id="msg-no-encontre"><p>La busqueda no arrojó ningun resultado. <br /> Por favor, intente de nuevo con otra busqueda.</p></div>

        <div id="dialogo1">
            <p id="dlgTitulo"></p>
            <div id="dlgCuerpo"></div>
        </div>
    </body>
</html>
