<?php
mb_internal_encoding("UTF-8");
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/leaflet.css">
    <link rel="stylesheet" href="css/Control.OSMGeocoder.css">
    <link rel="stylesheet" href="css/leaflet-measure.css">

    <link rel="stylesheet" href="css/estilo.css">

    <!--MAPILLARY-->
    <link href='https://unpkg.com/mapillary-js@2.20.0/dist/mapillary.min.css' rel='stylesheet' />
    <script src='https://unpkg.com/mapillary-js@2.20.0/dist/mapillary.min.js'></script>

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
    <!-- link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/humanity/jquery-ui.css" -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/start/jquery-ui.css" -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script> -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.8/jstree.min.js" integrity="sha256-NPMXVob2cv6rH/kKUuzV2yXKAQIFUzRw+vJBq4CLi2E=" crossorigin="anonymous"></script>

    <script src="mapa/mapa.js"></script>
    <script src="js/mostrar-infowindow.js"></script>

    <script src="js/appmcc.js"></script>
    <script src="capas/publico.js"></script>

    

    <title>Visor de mapa Municipalidad de Corrientes</title>

    <style>
        #opciones {
            height: 0px;
            opacity: 0;
            transition: all 0.2s ease-in;
        }

        .form-control:active,
        .form-control:focus {
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(0, 0, 0, 0.6);
            outline: 0 none;
        }
    </style>
</head>

<body>

    <div id="map"></div>

    <div id="mly-container" class="col-md-12 col-sm-12" style="height: 50vh;padding:0; display: none;">
        <i class="fa fa-times-circle close" aria-hidden="true"></i>
        <div id="mly"></div>
    </div>
    <div id="pano-container" class="col-md-12 col-sm-12" style="height: 50vh;padding:0;display: none;">
        <div id="pano" style="width: 100%;"></div>
    </div>

    <link rel="stylesheet" href="css/mapillary.css">
    <script src="js/funciones-mapillary.js"></script>
    <script src="js/modal.js"></script>

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

            <!-- BUSCADOR -->
            <div class="input-group mb-3" style="">
                <input type="text" id="input-busqueda" class="form-control shadow-none" autocomplete="off" placeholder="Buscar calle, ej: Mendoza" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append" id="busca-root_borrar-busqueda" style="display:none">
                    <span class="input-group-text"><i class="fa fa-times"></i></span>
                </div>
                <div class="input-group-append">
                    <span class="input-group-text" id="lupa"><i class="fa fa-search"></i></span>
                </div>
            </div>

            <!-- OPCIONES DE BUSCADOR -->
            <div id="opciones" class="oculto" style="text-align: center; width: 90%; margin:0 auto;">
                <i id="cerrarOpciones" class="fa fa-times"></i>
                <div class="btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-block btn-outline-primary">
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-calle" checked autocomplete="off" value="Calle"> Calle
                    </label>
                    <label class="btn btn-block btn-outline-primary ">
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-barrio" autocomplete="off" value="Barrio"> Barrio
                    </label>
                    <label class="btn btn-block btn-outline-primary ">
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-partidainmo" autocomplete="off" value="partida inmo"> Partida Inmo
                    </label>
                    <label class="btn btn-block btn-outline-primary ">
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-depmunicipal" autocomplete="off" value="dependencia municipal"> Dep. Municipal
                    </label>
                </div>
            </div>

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
    <div class="obj-no-encontre">
        <p id="obj-no-encontre_cuerpo" style="margin-right: 5px;">La busqueda no di&oacute; ning&uacute;n resultado</p>
        <span class="x-cierre"> <a href="#" id="x-cierre-btn">x</a></span>
    </div>

    <!-- mensaje que no se encontro ningun elemento -->
    <div id="msg-no-encontre" title="Aviso!!!">
        <p>La busqueda no dió ningun resultado. <br /> Por favor, intente de nuevo con otra busqueda.</p>
    </div>

    <div id="dialogo1">
        <p id="dlgTitulo"></p>
        <div id="dlgCuerpo"></div>
    </div>

    <!-- Referencias -->
    <div class="ref-bacheo">
        <img src="images/ref/referencias-bacheo.png" alt="">
    </div>



</body>

</html>