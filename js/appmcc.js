let hash,measureControl;
let overlay_GooglecnSatellite, overlay_GoogleRoad, overlay_GoogleTraffic;
let overlay_BingMap, overlay_BingSatellite;
let overlay_OSMStandard;
let overlay_CapabaseGIS, wmsMcc;
let arbolCapaBase = arbolMCC = nodo_base_anterior = nodoSeleccionado = undefined;
let nodo_pub_selec, nodo_pub_anterior = undefined;

$(document).ready(function() {

    // incompatibilidad con navegadores
    if (L.Browser.ielt9) {
        alert('Esta aplicacion no es compatible con su Navegador, debera actualizarlo para continuar...');
        return false;
      }

    overlay_GooglecnSatellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        opacity: 1.0
    });

    overlay_GoogleRoad = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        opacity: 1.0
    });

    overlay_GoogleTraffic = L.tileLayer('https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}', {
        opacity: 1.0
    });

// no funciona el enlace wms de bing
    overlay_OSMStandard = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 1.0
    });

    overlay_BingMap = L.tileLayer('http://ecn.dynamic.t0.tiles.virtualearth.net/comp/CompositionHandler/?mkt=en-us&it=G,VE,BX,L,LA&shading=hill', {
        opacity: 1.0
    });

    overlay_CapabaseGIS = L.WMS.layer("http://190.7.30.142:8000/geoserver/wms?version=1.1.1&", "Capa_Base", {
        format: 'image/png',
        uppercase: true,
        transparent: true,
        continuousWorld : true,
        tiled: true,
        info_format: 'text/html',
        opacity: 1,
        identify: false,
    });

    wmsMcc = new wms_GIS("http://gis.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", {
        format: 'image/png',
        uppercase: true,
        transparent: true,
        version: '1.1.1',
        continuousWorld : true,
        tiled: true,
        attribution: "Direccion Gral de GIS",
        info_format: 'application/json',
        opacity: 1
    });

    // localhost en 192.168.10.51
    wmsMcc51 = new wms_GIS("http://gis.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", {
        format: 'image/png',
        uppercase: true,
        transparent: true,
        version: '1.1.1',
        continuousWorld : true,
        tiled: true,
        attribution: "Direccion Gral de GIS",
        info_format: 'application/json',
        opacity: 1
    });

    // armo el tree de capas base
    arbolCapaBase = $('#arbolCapaBase').jstree({
        'plugins': ["checkbox", "wholerow"]
    })
    .on('changed.jstree', function(e, data) {

        nodoSeleccionado = data.instance.get_node(data.selected[data.selected.length-1]).id;
// console.log(this);
// console.log(data.instance.get_node(nodo_base_anterior));
        if (nodoSeleccionado === nodo_base_anterior) {
            arbolCapaBase.jstree('deselect_all');
            $(this).jstree('select_node', data.instance.get_node(nodo_base_anterior));
            return false;
        }

        switch (data.action) {
            case 'ready':
               map.addLayer(overlay_CapabaseGIS);
                nodo_base_anterior = data.selected[0];
                return  true;
                break;

            case 'select_node':
                // prendo el nodo seleccionado
                switch (nodoSeleccionado) {
                    case 'cbMcc':
                        map.addLayer(overlay_CapabaseGIS);
                        break;
                    case 'OpenstreetMap':
                        map.addLayer(overlay_OSMStandard);
                        break;
                    case 'google_satellite':
                        map.addLayer(overlay_GooglecnSatellite);
                        break;
                   case 'google_road':
                        map.addLayer(overlay_GoogleRoad);
                        break;
                    case 'google_traffic':
                        map.addLayer(overlay_GoogleTraffic);
                        break; 
                }

                // deselecciona el nodo anterior
                $(this).jstree('deselect_node', data.instance.get_node(nodo_base_anterior));

                break;

            case 'deselect_node':
                switch (nodo_base_anterior) {
                    case 'cbMcc':
                        overlay_CapabaseGIS.remove();
                    break;
                    case 'OpenstreetMap':
                        overlay_OSMStandard.remove();
                    break;
                    case 'google_satellite':
                        overlay_GooglecnSatellite.remove();
                    break;
                    case 'google_road':
                        overlay_GoogleRoad.remove();
                    break;
                    case 'google_traffic':
                        overlay_GoogleTraffic.remove();
                    break; 
                }

                nodo_base_anterior = nodoSeleccionado;

            break;
        }

        return true;

    });

    // el tree de capas mcc
    arbolMCC = $('#arbolMCC').jstree({
        'plugins': ["wholerow", "checkbox"]
    }).on('changed.jstree', function(e, data) {
        nodo_pub_selec = data.instance.get_node(data.selected[data.selected.length-1]).id;

        switch (data.action) {

            // prende las capas 
            case 'select_node':
                switch (data.node.id) {
                    case 'infoCatastral':
                        // deseleccionar los nodos hijos
                        break;

                    case 'rehabilitacionDesaguesPluviales':
                        map.addLayer(lyr_man_pluv);
                        break;
                    case 'rehabilitacionSumideros':
                        map.addLayer(lyr_man_sumidero);
                        break;
                    case 'redAguaPotable':
                        map.addLayer(lyr_red_agua_potable);
                        break;
                    case 'vw_desagues_pluviales':
                        map.addLayer(vw_desagues_pluviales);
                        break;
                    case 'red_desague_cloacal':
                        map.addLayer(vw_red_desague_cloaca);
                        break;
                    case 'vw_alumbrado_publico':
                        map.addLayer(vw_alumbrado_publico);
                        break;
                    case 'vw_bocas_de_registro':
                        map.addLayer(vw_bocas_de_registro);
                        break;
                    case 'vw_centros_distribuidores_dpec':
                        map.addLayer(vw_centros_distribuidores_dpec);
                        break;
                    case 'vw_obras_santa_catalina_viviendas':
                        map.addLayer(vw_obras_santa_catalina_viviendas);
                        break;
                    case 'vw_distritos_planeamiento_urbano':
                        map.addLayer(vw_distritos_planeamiento_urbano);
                        break;
                    case 'vw_ejido_urbano':
                        map.addLayer(vw_ejido_urbano);
                        break;
                    case 'vw_medianas':
                        map.addLayer(vw_medianas);
                        break;
                    case 'vw_edificios_historicos':
                        map.addLayer(vw_edificios_historicos);
                        break;
                    case 'vw_centros_de_pago':
                        map.addLayer(vw_centros_de_pago);
                        break;
                    case 'vw_dependencias_municipales':
                        map.addLayer(vw_dependencias_municipales);
                        break;
                    case 'vw_poblacion':
                        map.addLayer(vw_poblacion);
                        break;
                    case 'vw_densidad_de_poblacion':
                        map.addLayer(vw_densidad_de_poblacion);
                        break;

                    // Desarrollo Social Comunitario
                    case 'vw_cic':
                        map.addLayer(vw_cic);
                        break;
                    case 'vw_delegaciones_municipales':
                        map.addLayer(vw_delegaciones_municipales);
                        break;
                    case 'vw_sum':
                        map.addLayer(vw_sum);
                        break;
                    case 'vw_zonas_municipales':
                        map.addLayer(vw_zonas_municipales);
                        break;

                    // Salud
                    case 'vw_caps':
                        map.addLayer(vw_caps);
                        break;
                    case 'vw_saps_municipales':
                        map.addLayer(vw_saps_municipales);
                        break;
                    case 'vw_centros_de_salud':
                        map.addLayer(vw_centros_de_salud);
                        break;
                    case 'vw_farmacias':
                        map.addLayer(vw_farmacias);
                        break;
                    case 'vw_hospitales':
                        map.addLayer(vw_hospitales);
                        break;
                    case 'vw_areas_programaticas_saps':
                        map.addLayer(vw_areas_programaticas_saps);
                        break;

                    /*
                     * Transporte
                     */

                    case 'vw_puntos_de_recarga_sube':
                        map.addLayer(vw_puntos_de_recarga_sube);
                        break;

                    case 'vw_recorrido_total_colectivos_corrientes':
                        map.addLayer(vw_recorrido_total_colectivos_corrientes);
                        break;

                    case 'vw_estacionamiento_privado':
                        map.addLayer(vw_estacionamiento_privado);
                        break;

                    case 'vw_paradas_colectivos':
                        map.addLayer(vw_paradas_colectivos);
                        break;


                    /**
                     * Recorrido por ramal
                     */

                    // recorrido ramal 101 B
                    case 'recorrido_ramal_101_B':
                        map.addLayer(recorrido_ramal_101_B);
                        break;

                    // recorrido ramal 101 B
                    case 'recorrido_ramal_101_C':
                        map.addLayer(recorrido_ramal_101_C);
                        break;

                    // recorrido ramal 102 a
                    case 'recorrido_ramal_102_A':
                        map.addLayer(recorrido_ramal_102_A);
                        break;





                    case 'vw_paradas_barranqueras':
                        map.addLayer(vw_paradas_barranqueras);
                        break;
                    case 'vw_recorrido_barranqueras':
                        map.addLayer(vw_recorrido_barranqueras);
                        break;
                    case 'vw_paradas_campus':
                        map.addLayer(vw_paradas_campus);
                        break;
                    case 'vw_recorrido_campus':
                        map.addLayer(vw_recorrido_campus);
                        break;
                    case 'vw_paradas_sarmiento':
                        map.addLayer(vw_paradas_sarmiento);
                        break;
                    case 'vw_recorrido_sarmiento':
                        map.addLayer(vw_recorrido_sarmiento);
                        break;

                    /*
                     * Red vial
                     */

                    case 'vw_ide_calle':
                        map.addLayer(vw_ide_calle);
                        break;
                    case 'vw_ide_calle_por_tipo_calzada':
                        map.addLayer(vw_ide_calle_por_tipo_calzada);
                        break;

                    // Informacion catastral
                    case 'vw_asentamiento_renabap':
                        map.addLayer(vw_asentamiento_renabap);
                        break;
                    case 'vw_cordones':
                        map.addLayer(vw_cordones);
                        break;
                    case 'vw_grupo_viviendas_invico':
                        map.addLayer(vw_grupo_viviendas_invico);
                        break;
                    case 'vw_parcelas':
                        map.addLayer(vw_parcelas);
                        break;
                    case 'vw_ph_parcelas':
                        map.addLayer(vw_ph_parcelas);
                        break;
                    case 'vw_barrios':
                        map.addLayer(vw_barrios);
                        break;
                    case 'vw_manzanas':
                        map.addLayer(vw_manzanas);
                        break;
                }
            break;


            // apaga las capas
            case 'deselect_node':
                switch (data.node.id) {
                    case 'rehabilitacionDesaguesPluviales':
                        lyr_man_pluv.remove();
                        break;
                    case 'rehabilitacionSumideros':
                        lyr_man_sumidero.remove();
                        break;
                    case 'redAguaPotable':
                        lyr_red_agua_potable.remove();
                        break;
                    case 'vw_desagues_pluviales':
                        vw_desagues_pluviales.remove();
                    break;
                    case 'red_desague_cloacal':
                        vw_red_desague_cloaca.remove();
                    break;
                    case 'vw_alumbrado_publico':
                        vw_alumbrado_publico.remove();
                    break;
                    case 'vw_bocas_de_registro':
                        vw_bocas_de_registro.remove();
                    break;
                    case 'vw_centros_distribuidores_dpec':
                        vw_centros_distribuidores_dpec.remove();
                        break;
                    case 'vw_obras_santa_catalina_viviendas':
                        vw_obras_santa_catalina_viviendas.remove();
                        break;
                    case 'vw_distritos_planeamiento_urbano':
                        vw_distritos_planeamiento_urbano.remove();
                        break;
                    case 'vw_ejido_urbano':
                        vw_ejido_urbano.remove();
                        break;
                    case 'vw_medianas':
                        vw_medianas.remove();
                        break;
                    case 'vw_edificios_historicos':
                        vw_edificios_historicos.remove();
                        break;
                    case 'vw_centros_de_pago':
                        vw_centros_de_pago.remove();
                        break;
                    case 'vw_dependencias_municipales':
                        vw_dependencias_municipales.remove();
                        break;
                    case 'vw_poblacion':
                    vw_poblacion.remove();
                        break;
                    case 'vw_densidad_de_poblacion':
                    vw_densidad_de_poblacion.remove();
                        break;

                    // Desarrollo Social Comunitario
                    case 'vw_cic':
                    vw_cic.remove();
                        break;
                    case 'vw_delegaciones_municipales':
                    vw_delegaciones_municipales.remove();
                        break;
                    case 'vw_sum':
                    vw_sum.remove();
                        break;
                    case 'vw_zonas_municipales':
                    vw_zonas_municipales.remove();
                        break;

                    // Salud
                    case 'vw_caps':
                    vw_caps.remove();
                        break;
                    case 'vw_saps_municipales':
                    vw_saps_municipales.remove();
                        break;
                    case 'vw_centros_de_salud':
                    vw_centros_de_salud.remove();
                        break;
                    case 'vw_farmacias':
                        vw_farmacias.remove();
                        break;
                    case 'vw_hospitales':
                        vw_hospitales.remove();
                        break;
                    case 'vw_areas_programaticas_saps':
                        vw_areas_programaticas_saps.remove();
                        break;

                    /*
                     * Transporte
                     */

                    case 'vw_puntos_de_recarga_sube':
                        vw_puntos_de_recarga_sube.remove();
                        break;
                    case 'vw_recorrido_total_colectivos_corrientes':
                        vw_recorrido_total_colectivos_corrientes.remove();
                        break;
                    case 'vw_estacionamiento_privado':
                        vw_estacionamiento_privado.remove();
                        break;

                    case 'vw_paradas_colectivos':
                        vw_paradas_colectivos.remove();
                        break;

                    /**
                     * Recorrido por ramal
                     */

                    // recorrido ramal 101 B
                    case 'recorrido_ramal_101_B':
                        recorrido_ramal_101_B.remove();
                        break;

                    // recorrido ramal 101 C
                    case 'recorrido_ramal_101_C':
                        recorrido_ramal_101_C.remove();
                        break;

                    // recorrido ramal 102 A
                    case 'recorrido_ramal_102_A':
                        recorrido_ramal_102_A.remove();
                        break;


                    case 'vw_paradas_barranqueras':
                        vw_paradas_barranqueras.remove();
                        break;
                    case 'vw_recorrido_barranqueras':
                        vw_recorrido_barranqueras.remove();
                        break;
                    case 'vw_paradas_campus':
                        vw_paradas_campus.remove();
                        break;
                    case 'vw_recorrido_campus':
                        vw_recorrido_campus.remove();
                        break;
                    case 'vw_paradas_sarmiento':
                        vw_paradas_sarmiento.remove();
                        break;
                    case 'vw_recorrido_sarmiento':
                        vw_recorrido_sarmiento.remove();
                        break;
                    
                    /*
                     * Red vial
                     */

                    case 'vw_ide_calle':
                    vw_ide_calle.remove();
                        break;
                    case 'vw_ide_calle_por_tipo_calzada':
                    vw_ide_calle_por_tipo_calzada.remove();
                        break;

                    // Informacion catastral
                    case 'vw_asentamiento_renabap':
                        vw_asentamiento_renabap.remove();
                        break;
                    case 'vw_cordones':
                        vw_cordones.remove();
                        break;
                    case 'vw_grupo_viviendas_invico':
                        vw_grupo_viviendas_invico.remove();
                        break;
                    case 'vw_parcelas':
                        vw_parcelas.remove();
                        break;
                    case 'vw_ph_parcelas':
                        vw_ph_parcelas.remove();
                        break;
                    case 'vw_barrios':
                        vw_barrios.remove();
                        break;
                    case 'vw_manzanas':
                        vw_manzanas.remove();
                        break;
                }
            break
        }
    });

    // registro eventos

    document.getElementById("infoCatastral").addEventListener('mouseover', function (ev){
        document.getElementById("dlgTitulo").innerHTML = ev.srcElement.id.split('_')[0];

        document.getElementById("dlgCuerpo").innerHTML = "Cuerpo del mensaje";

        //document.getElementById("dialogo1").style.visibility = 'visible';

        console.log('id del elemento: ', ev.srcElement.id.split('_')[0]);
    }, false);



});


