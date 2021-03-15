/**
 *
 * actualizado: 11/02/2020
 * Developer: Lic. Carlos Garcia
 * Contacto: carlosgctes@gmail.com
 *
 */
let hash, measureControl;
let overlay_GooglecnSatellite, overlay_GoogleRoad, overlay_GoogleTraffic;
let overlay_BingMap, overlay_BingSatellite;
let overlay_OSMStandard;
let overlay_CapabaseGIS, wmsMcc;
let arbolCapaBase = arbolMCC = nodo_base_anterior = nodoSeleccionado = undefined;
let nodo_pub_selec, nodo_pub_anterior = undefined;
let capas = Array();
let apagarCapaBarrio = false;
var resultadosKML = ``;
var capasParaImprimir = [];

//verifica por parametro si la barra lateral debe estar contraida o no
var menu_abierto = new URLSearchParams(window.location.search).get('menu');


// variable que controla que se va a buscar
// segun si se selecciono o no, algunas opciones
// extras
let queBusca = undefined;

$(document).ready(function () {


    if(menu_abierto == null ){
        menu_abierto = true;
    }else if(menu_abierto == false || menu_abierto == 'false'){
        contraerBarraLateral();
    }
    

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
////////51 la edite para el https

    overlay_CapabaseGIS = L.tileLayer.wms('https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms', {
        layers: 'capa_base_mcc:capa_base',
        format: 'image/png',
        transparent: true,
        tiled: true
    });

    // localhost en 192.168.10.51 la edite para el https
    wmsMcc51 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", {
        format: 'image/png',
        uppercase: true,
        transparent: true,
        version: '1.1.1',
        continuousWorld: true,
        tiled: true,
        attribution: "Direccion Gral de GIS",
        info_format: 'application/json',
        opacity: 1
    });

    // armo el tree de capas base
    // $.jstree.defaults.core.themes.variant = "large"; // configuracion global
    $.jstree.defaults.checkbox.keep_selected_style = true

    arbolCapaBase = $('#arbolCapaBase').jstree({

        "core": {
            "multiple": false,
            "animation": 0,
            "string": {
                'Loading ...': 'Cargando ...'
            }
        },

        "checkbox": {
            "keep_selected_style": true
        },

        "plugins": ["checkbox", "wholerow"]

    })
        .on('changed.jstree', function (e, data) {
            // console.log('e == ', e);
            // console.log('data == ', data);

            nodoSeleccionado = data.instance.get_node(data.selected[data.selected.length - 1]).id;

            /*        if (nodoSeleccionado === nodo_base_anterior) {
                        arbolCapaBase.jstree('deselect_all');
                        $(this).jstree('select_node', data.instance.get_node(nodo_base_anterior));
                        return false;
                    }
            */
            switch (data.action) {
                case 'ready':
                    map.addLayer(overlay_CapabaseGIS);
                    nodo_base_anterior = data.selected[0];
                    return true;
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


    const api_uso_capas = '../uso-capas/uso_capas.php';

    // el tree de capas mcc
    arbolMCC = $('#arbolMCC').jstree({
        'plugins': ["wholerow", "checkbox"]
    }).on('changed.jstree', function (e, data) {
        // console.log('e == ', e);
        // console.log('data == ', data);
        // console.log('data.node.children.length == ', data.node.children.length);

        nodo_pub_selec = data.instance.get_node(data.selected[data.selected.length - 1]).id;

        switch (data.action) {

            // prende las capas
            case 'select_node':
                switch (data.node.id) {

                    case 'infoCatastral':
                        // deseleccionar los nodos hijos
                        break;

                    case 'vw_recoleccion_diferenciada': {
                        capasParaImprimir.push(vw_recoleccion_diferenciada._name);
                        map.addLayer(vw_recoleccion_diferenciada);
                        $.post(api_uso_capas, {capa: vw_recoleccion_diferenciada._name});

                    }

                        break;

                    case 'vw_puntos_verdes': {
                        capasParaImprimir.push(vw_puntos_verdes._name);
                        map.addLayer(vw_puntos_verdes);
                        $.post(api_uso_capas, {capa: vw_puntos_verdes._name});
                    }

                        break;

                    case 'rehabilitacionDesaguesPluviales': {
                        capasParaImprimir.push(lyr_man_pluv._name);
                        map.addLayer(lyr_man_pluv);
                        $.post(api_uso_capas, {capa: lyr_man_pluv._name}).fail(function(err){console.log(err)});
                        break;
                    }
                    case 'rehabilitacionSumideros': {
                        capasParaImprimir.push(lyr_man_sumidero._name);
                        map.addLayer(lyr_man_sumidero);
                        $.post(api_uso_capas, {capa: lyr_man_sumidero._name});
                    }
                        break;
                    case 'redAguaPotable': {
                        capasParaImprimir.push(lyr_red_agua_potable._name);
                        map.addLayer(lyr_red_agua_potable);
                        $.post(api_uso_capas, {capa: lyr_red_agua_potable._name});
                    }
                        break;
                    case 'vw_desagues_pluviales': {
                        capasParaImprimir.push(vw_desagues_pluviales._name);
                        map.addLayer(vw_desagues_pluviales);
                        $.post(api_uso_capas, {capa: vw_desagues_pluviales._name});
                    }
                        break;

                    case 'red_desague_cloacal': {
                        capasParaImprimir.push(vw_red_desague_cloaca._name);
                        map.addLayer(vw_red_desague_cloaca);
                        $.post(api_uso_capas, {capa: vw_red_desague_cloaca._name});

                    }
                        break;

                    case 'vw_obras_cordones_cuneta': {
                        capasParaImprimir.push(vw_obras_cordones_cuneta._name);
                        map.addLayer(vw_obras_cordones_cuneta);
                        $.post(api_uso_capas, {capa: vw_obras_cordones_cuneta._name});

                    }
                        break;

                    case 'vw_obras_pavimento': {
                        capasParaImprimir.push(vw_obras_pavimento._name);
                        map.addLayer(vw_obras_pavimento);
                        $.post(api_uso_capas, {capa: vw_obras_pavimento._name});

                    }
                        break;

                    case 'vw_obras_ripio': {
                        capasParaImprimir.push(vw_obras_ripio._name);
                        map.addLayer(vw_obras_ripio);
                        $.post(api_uso_capas, {capa: vw_obras_ripio._name});

                    }
                        break;

                    case 'vw_cloaca_social': {
                        capasParaImprimir.push(vw_cloaca_social._name);
                        map.addLayer(vw_cloaca_social);
                        $.post(api_uso_capas, {capa: vw_cloaca_social._name});

                    }
                        // map.fitBounds([[-27.540468433268224, -58.865776062011726],[-27.46883054884205, -58.74681472778321]]);
                        break;

                    case 'vw_intervencion_en_plazas': {
                        capasParaImprimir.push(vw_intervencion_en_plazas._name);
                        map.addLayer(vw_intervencion_en_plazas);
                        $.post(api_uso_capas, {capa: vw_intervencion_en_plazas._name});
                    }
                        break;

                    case 'vw_plaza_recreacion': {
                        capasParaImprimir.push(vw_plaza_recreacion._name);
                        map.addLayer(vw_plaza_recreacion);
                        $.post(api_uso_capas, {capa: vw_plaza_recreacion._name});
                    }
                        break;

                    case 'vw_instal_canio_acceso_domicilio': {
                        capasParaImprimir.push(vw_instal_canio_acceso_domicilio._name);
                        map.addLayer(vw_instal_canio_acceso_domicilio);
                        $.post(api_uso_capas, {capa: vw_instal_canio_acceso_domicilio._name});
                    }
                        break;

                    case 'vw_alumbrado_publico_led': {
                        capasParaImprimir.push(vw_alumbrado_publico_led._name);
                        map.addLayer(vw_alumbrado_publico_led);
                        $.post(api_uso_capas, {capa: vw_alumbrado_publico_led._name});
                    }
                        break;

                    case 'vw_alumbrado_publico': {
                        capasParaImprimir.push(vw_alumbrado_publico._name);
                        map.addLayer(vw_alumbrado_publico);
                        $.post(api_uso_capas, {capa: vw_alumbrado_publico._name});
                    }
                        break;

                    case 'vw_bocas_de_registro': {
                        capasParaImprimir.push(vw_bocas_de_registro._name);
                        map.addLayer(vw_bocas_de_registro);
                        $.post(api_uso_capas, {capa: vw_bocas_de_registro._name});
                    }
                        break;

                    case 'vw_centros_distribuidores_dpec': {
                        capasParaImprimir.push(vw_centros_distribuidores_dpec._name);
                        map.addLayer(vw_centros_distribuidores_dpec);
                        $.post(api_uso_capas, {capa: vw_centros_distribuidores_dpec._name});
                    }
                        break;

                    case 'vw_puntos_wifi': {
                        capasParaImprimir.push(vw_puntos_wifi._name);
                        map.addLayer(vw_puntos_wifi);
                        $.post(api_uso_capas, {capa: vw_puntos_wifi._name});
                    }
                        break;

                    case 'vw_obras_de_bacheo': {
                        capasParaImprimir.push(vw_obras_de_bacheo._name);
                        map.addLayer(vw_obras_de_bacheo);
                        $.post(api_uso_capas, {capa: vw_obras_de_bacheo._name});
                    }
                        // $(".ref-bacheo").css('visibility', 'visible');
                        break;

                    case 'vw_obras_santa_catalina_viviendas': {
                        capasParaImprimir.push(vw_obras_santa_catalina_viviendas._name);
                        map.addLayer(vw_obras_santa_catalina_viviendas);
                        $.post(api_uso_capas, {capa: vw_obras_santa_catalina_viviendas._name});
                    }
                        break;

                    case 'vw_instalacion_canios_cruce_calle': {
                        capasParaImprimir.push(vw_instalacion_canios_cruce_calle._name);
                        map.addLayer(vw_instalacion_canios_cruce_calle);
                        map.fitBounds([
                            [-27.50484564427456, -58.86611938476563],
                            [-27.433184575621027, -58.750419616699226]
                        ]);
                        $.post(api_uso_capas, {capa: vw_instalacion_canios_cruce_calle._name});
                    }
                        break;

                    case 'vw_distritos_planeamiento_urbano': {
                        capasParaImprimir.push(vw_distritos_planeamiento_urbano._name);
                        map.addLayer(vw_distritos_planeamiento_urbano);
                        $.post(api_uso_capas, {capa: vw_distritos_planeamiento_urbano._name});
                    }
                        break;
                    case 'vw_ejido_urbano': {
                        capasParaImprimir.push(vw_ejido_urbano._name);
                        map.addLayer(vw_ejido_urbano);
                        $.post(api_uso_capas, {capa: vw_ejido_urbano._name});
                    }
                        break;
                    case 'vw_medianas': {
                        capasParaImprimir.push(vw_medianas._name);
                        map.addLayer(vw_medianas);
                        $.post(api_uso_capas, {capa: vw_medianas._name});
                    }
                        break;
                    case 'vw_edificios_historicos': {
                        capasParaImprimir.push(vw_edificios_historicos._name);
                        map.addLayer(vw_edificios_historicos);
                        $.post(api_uso_capas, {capa: vw_edificios_historicos._name});
                    }
                        break;
                    case 'vw_parcelas_por_distrito':
                        capasParaImprimir.push(vw_parcelas_por_distrito._name);
                        map.addLayer(vw_parcelas_por_distrito);
                        $.post(api_uso_capas, {capa: vw_parcelas_por_distrito._name});
                        break;
                       
                    case 'vw_centros_de_pago': {
                        capasParaImprimir.push(vw_centros_de_pago._name);
                        map.addLayer(vw_centros_de_pago);
                        $.post(api_uso_capas, {capa: vw_centros_de_pago._name});
                    }
                        break;
                    case 'vw_dependencias_municipales': {
                        capasParaImprimir.push(vw_dependencias_municipales._name);
                        map.addLayer(vw_dependencias_municipales);
                        $.post(api_uso_capas, {capa: vw_dependencias_municipales._name});
                    }
                        break;
                    case 'vw_poblacion': {
                        capasParaImprimir.push(vw_poblacion._name);
                        map.addLayer(vw_poblacion);
                        $.post(api_uso_capas, {capa: vw_poblacion._name});
                    }
                        break;
                    case 'vw_densidad_de_poblacion': {
                        capasParaImprimir.push(vw_densidad_de_poblacion._name);
                        map.addLayer(vw_densidad_de_poblacion);
                        $.post(api_uso_capas, {capa: vw_densidad_de_poblacion._name});
                    }
                        break;

                    // Desarrollo Social Comunitario
                    case 'vw_cic': {
                        capasParaImprimir.push(vw_cic._name);
                        map.addLayer(vw_cic);
                        $.post(api_uso_capas, {capa: vw_cic._name});
                    }
                        break;
                    case 'vw_delegaciones_municipales': {
                        capasParaImprimir.push(vw_delegaciones_municipales._name);
                        map.addLayer(vw_delegaciones_municipales);
                        $.post(api_uso_capas, {capa: vw_delegaciones_municipales._name});
                    }
                        break;
                    case 'vw_sum': {
                        capasParaImprimir.push(vw_sum._name);
                        map.addLayer(vw_sum);
                        $.post(api_uso_capas, {capa: vw_sum._name});
                    }
                        break;
                    case 'vw_zonas_municipales': {
                        capasParaImprimir.push(vw_zonas_municipales._name);
                        map.addLayer(vw_zonas_municipales);
                        $.post(api_uso_capas, {capa: vw_zonas_municipales._name});
                    }
                        break;

                    // Salud
                    case 'vw_caps': {
                        capasParaImprimir.push(vw_caps._name);
                        map.addLayer(vw_caps);
                        $.post(api_uso_capas, {capa: vw_caps._name});
                    }
                        break;
                    case 'vw_saps_municipales': {
                        capasParaImprimir.push(vw_saps_municipales._name);
                        map.addLayer(vw_saps_municipales);
                        $.post(api_uso_capas, {capa: vw_saps_municipales._name});
                    }
                        break;
                    case 'vw_centros_de_salud': {
                        capasParaImprimir.push(vw_centros_de_salud._name);
                        map.addLayer(vw_centros_de_salud);
                        $.post(api_uso_capas, {capa: vw_centros_de_salud._name});
                    }
                        break;
                    case 'vw_farmacias': {
                        capasParaImprimir.push(vw_farmacias._name);
                        map.addLayer(vw_farmacias);
                        $.post(api_uso_capas, {capa: vw_farmacias._name});
                    }
                        break;
                    case 'vw_hospitales': {
                        capasParaImprimir.push(vw_hospitales._name);
                        map.addLayer(vw_hospitales);
                        $.post(api_uso_capas, {capa: vw_hospitales._name});
                    }
                        break;
                    case 'vw_areas_programaticas_saps': {
                        capasParaImprimir.push(vw_areas_programaticas_saps._name);
                        map.addLayer(vw_areas_programaticas_saps);
                        $.post(api_uso_capas, {capa: vw_areas_programaticas_saps._name});
                    }
                        break;

                    /**
                     * Corredor vial
                     */
                    // carga y descarga
                    case 'vw_corredor_vial_carga_descarga': {
                        capasParaImprimir.push(vw_corredor_vial_carga_descarga._name);
                        map.addLayer(vw_corredor_vial_carga_descarga);
                        $.post(api_uso_capas, {capa: vw_corredor_vial_carga_descarga._name});
                    }
                        break;

                    case 'vw_corredor_vial_prohibido_estacionar': {
                        capasParaImprimir.push(vw_corredor_vial_prohibido_estacionar._name);
                        map.addLayer(vw_corredor_vial_prohibido_estacionar);
                        $.post(api_uso_capas, {capa: vw_corredor_vial_prohibido_estacionar._name});
                    }
                        break;

                    // estacionamiento moto
                    case 'vw_estacionamiento_moto': {
                        capasParaImprimir.push(vw_estacionamiento_moto._name);
                        map.addLayer(vw_estacionamiento_moto);
                        $.post(api_uso_capas, {capa: vw_estacionamiento_moto._name});
                    }
                        break;

                    case 'vw_estacionamiento_medido': {
                        capasParaImprimir.push(vw_estacionamiento_medido._name);
                        map.addLayer(vw_estacionamiento_medido);
                        $.post(api_uso_capas, {capa: vw_estacionamiento_medido._name});
                    }
                        break;

                    /*
                     * Transporte
                     */

                    case 'vw_puntos_de_recarga_sube': {
                        capasParaImprimir.push(vw_puntos_de_recarga_sube._name);
                        map.addLayer(vw_puntos_de_recarga_sube);
                        $.post(api_uso_capas, {capa: vw_puntos_de_recarga_sube._name});
                    }
                        break;

                    case 'vw_recorrido_total_colectivos_corrientes': {
                        capasParaImprimir.push(vw_recorrido_total_colectivos_corrientes._name);
                        map.addLayer(vw_recorrido_total_colectivos_corrientes);
                        $.post(api_uso_capas, {capa: vw_recorrido_total_colectivos_corrientes._name});
                    }
                        break;

                    case 'vw_estacionamiento_privado': {
                        capasParaImprimir.push(vw_estacionamiento_privado._name);
                        map.addLayer(vw_estacionamiento_privado);
                        $.post(api_uso_capas, {capa: vw_estacionamiento_privado._name});
                    }
                        break;

                    case 'vw_paradas_colectivos': {
                        capasParaImprimir.push(vw_paradas_colectivos._name);
                        map.addLayer(vw_paradas_colectivos);
                        $.post(api_uso_capas, {capa: vw_paradas_colectivos._name});
                    }
                        break;


                    /**
                     * Recorrido por ramal
                     */

                    // recorrido ramal 101 B
                    case 'recorrido_ramal_101_B': {
                        capasParaImprimir.push(recorrido_ramal_101_B._name);
                        map.addLayer(recorrido_ramal_101_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_101_B._name});
                    }
                        break;

                    // recorrido ramal 101 C
                    case 'recorrido_ramal_101_C': {
                        capasParaImprimir.push(recorrido_ramal_101_C._name);
                        map.addLayer(recorrido_ramal_101_C);
                        $.post(api_uso_capas, {capa: recorrido_ramal_101_C._name});
                    }
                        break;

                    // recorrido ramal 102 A
                    case 'recorrido_ramal_102_A': {
                        capasParaImprimir.push(recorrido_ramal_102_A._name);
                        map.addLayer(recorrido_ramal_102_A);
                        $.post(api_uso_capas, {capa: recorrido_ramal_102_A._name});
                    }
                        break;

                    // recorrido ramal 102 B
                    case 'recorrido_ramal_102_B': {
                        capasParaImprimir.push(recorrido_ramal_102_B._name);
                        map.addLayer(recorrido_ramal_102_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_102_B._name});
                    }
                        break;

                    // recorrido ramal 102 C
                    case 'recorrido_ramal_102_C': {
                        capasParaImprimir.push(recorrido_ramal_102_C._name);
                        map.addLayer(recorrido_ramal_102_C);
                        $.post(api_uso_capas, {capa: recorrido_ramal_102_C._name});
                    }
                        break;

                    // recorrido ramal 103 A
                    case 'recorrido_ramal_103_A': {
                        capasParaImprimir.push(recorrido_ramal_103_A._name);
                        map.addLayer(recorrido_ramal_103_A);
                        $.post(api_uso_capas, {capa: recorrido_ramal_103_A._name});
                    }
                        break;

                    // recorrido ramal 103 B
                    case 'recorrido_ramal_103_B': {
                        capasParaImprimir.push(recorrido_ramal_103_B._name);
                        map.addLayer(recorrido_ramal_103_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_103_B._name});
                    }
                        break;

                    // recorrido ramal 103 C - Directo
                    case 'recorrido_ramal_103_C_directo': {
                        capasParaImprimir.push(recorrido_ramal_103_C_directo._name);
                        map.addLayer(recorrido_ramal_103_C_directo);
                        $.post(api_uso_capas, {capa: recorrido_ramal_103_C_directo._name});
                    }
                        break;

                    // recorrido ramal 103 C - Esperanza - Dr. Montaña
                    case 'recorrido_ramal_103_C_esperanza_montania': {
                        capasParaImprimir.push(recorrido_ramal_103_C_esperanza_montania._name);
                        map.addLayer(recorrido_ramal_103_C_esperanza_montania);
                        $.post(api_uso_capas, {capa: recorrido_ramal_103_C_esperanza_montania._name});
                    }
                        break;

                    // recorrido ramal 103 D
                    case 'recorrido_ramal_103_D': {
                        capasParaImprimir.push(recorrido_ramal_103_D._name);
                        map.addLayer(recorrido_ramal_103_D);
                        $.post(api_uso_capas, {capa: recorrido_ramal_103_D._name});
                    }
                        break;

                    // recorrido ramal 104 A
                    case 'recorrido_ramal_104_A': {
                        capasParaImprimir.push(recorrido_ramal_104_A._name);
                        map.addLayer(recorrido_ramal_104_A);
                        $.post(api_uso_capas, {capa: recorrido_ramal_104_A._name});
                    }
                        break;

                    // recorrido ramal 104 B
                    case 'recorrido_ramal_104_B': {
                        capasParaImprimir.push(recorrido_ramal_104_B._name);
                        map.addLayer(recorrido_ramal_104_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_104_B._name});
                    }
                        break;

                    // recorrido ramal 104 C
                    case 'recorrido_ramal_104_C': {
                        capasParaImprimir.push(recorrido_ramal_104_C._name);
                        map.addLayer(recorrido_ramal_104_C);
                        $.post(api_uso_capas, {capa: recorrido_ramal_104_C._name});
                    }
                        break;

                    // recorrido ramal 104 D
                    case 'recorrido_ramal_104_D': {
                        capasParaImprimir.push(recorrido_ramal_104_D._name);
                        map.addLayer(recorrido_ramal_104_D);
                        $.post(api_uso_capas, {capa: recorrido_ramal_104_D._name});
                    }
                        break;

                    // recorrido ramal 105 A
                    case 'recorrido_ramal_105_A': {
                        capasParaImprimir.push(recorrido_ramal_105_A._name);
                        map.addLayer(recorrido_ramal_105_A);
                        $.post(api_uso_capas, {capa: recorrido_ramal_105_A._name});
                    }
                        break;

                    // recorrido ramal 105 B
                    case 'recorrido_ramal_105_B': {
                        capasParaImprimir.push(recorrido_ramal_105_B._name);
                        map.addLayer(recorrido_ramal_105_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_105_B._name});
                    }
                        break;

                    // recorrido ramal 105 C 250 viv
                    case 'recorrido_ramal_105_C_250_viv': {
                        capasParaImprimir.push(recorrido_ramal_105_C_250_viv._name);
                        map.addLayer(recorrido_ramal_105_C_250_viv);
                        $.post(api_uso_capas, {capa: recorrido_ramal_105_C_250_viv._name});
                    }
                        break;

                    // recorrido ramal 105 C perichon
                    case 'recorrido_ramal_105_C_perichon': {
                        capasParaImprimir.push(recorrido_ramal_105_C_perichon._name);
                        map.addLayer(recorrido_ramal_105_C_perichon);
                        $.post(api_uso_capas, {capa: recorrido_ramal_105_C_perichon._name});
                    }
                        break;

                    // recorrido ramal 106 A
                    case 'recorrido_ramal_106_A': {
                        capasParaImprimir.push(recorrido_ramal_106_A._name);
                        map.addLayer(recorrido_ramal_106_A);
                        $.post(api_uso_capas, {capa: recorrido_ramal_106_A._name});
                    }
                        break;

                    // recorrido ramal 106 B
                    case 'recorrido_ramal_106_B': {
                        capasParaImprimir.push(recorrido_ramal_106_B._name);
                        map.addLayer(recorrido_ramal_106_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_106_B._name});
                    }
                        break;

                    // recorrido ramal 106 C
                    case 'recorrido_ramal_106_C': {
                        capasParaImprimir.push(recorrido_ramal_106_C._name);
                        map.addLayer(recorrido_ramal_106_C);
                        $.post(api_uso_capas, {capa: recorrido_ramal_106_C._name});
                    }
                        break;

                    // recorrido ramal 106 D
                    case 'recorrido_ramal_106_D': {
                        capasParaImprimir.push(recorrido_ramal_106_D._name);
                        map.addLayer(recorrido_ramal_106_D);
                        $.post(api_uso_capas, {capa: recorrido_ramal_106_D._name});
                    }
                        break;

                    // recorrido ramal 108 AB
                    case 'recorrido_ramal_108_AB': {
                        capasParaImprimir.push(recorrido_ramal_108_AB._name);
                        map.addLayer(recorrido_ramal_108_AB);
                        $.post(api_uso_capas, {capa: recorrido_ramal_108_AB._name});
                    }
                        break;

                    // recorrido ramal 108 C
                    case 'recorrido_ramal_108_C': {
                        capasParaImprimir.push(recorrido_ramal_108_C._name);
                        map.addLayer(recorrido_ramal_108_C);
                        $.post(api_uso_capas, {capa: recorrido_ramal_108_C._name});
                    }
                        break;

                    // recorrido ramal 109 A laguna soto
                    case 'recorrido_ramal_109_A_Laguna_Soto': {
                        capasParaImprimir.push(recorrido_ramal_109_A_Laguna_Soto._name);
                        map.addLayer(recorrido_ramal_109_A_Laguna_Soto);
                        $.post(api_uso_capas, {capa: recorrido_ramal_109_A_Laguna_Soto._name});
                    }
                        break;

                    // recorrido ramal 109 B Yecoha
                    case 'recorrido_ramal_109_B_Yecoha': {
                        capasParaImprimir.push(recorrido_ramal_109_B_Yecoha._name);
                        map.addLayer(recorrido_ramal_109_B_Yecoha);
                        $.post(api_uso_capas, {capa: recorrido_ramal_109_B_Yecoha._name});
                    }
                        break;

                    // recorrido ramal 110 A
                    case 'recorrido_ramal_110_A': {
                        capasParaImprimir.push(recorrido_ramal_110_A._name);
                        map.addLayer(recorrido_ramal_110_A);
                        $.post(api_uso_capas, {capa: recorrido_ramal_110_A._name});
                    }
                        break;

                    // recorrido ramal 110 B
                    case 'recorrido_ramal_110_B': {
                        capasParaImprimir.push(recorrido_ramal_110_B._name);
                        map.addLayer(recorrido_ramal_110_B);
                        $.post(api_uso_capas, {capa: recorrido_ramal_110_B._name});
                    }
                        break;

                    // recorrido ramal 110 C Sta Catalina
                    case 'recorrido_ramal_110_C_sta_catalina': {
                        capasParaImprimir.push(recorrido_ramal_110_C_sta_catalina._name);
                        map.addLayer(recorrido_ramal_110_C_sta_catalina);
                        $.post(api_uso_capas, {capa: recorrido_ramal_110_C_sta_catalina._name});
                    }
                        break;

                    case 'vw_paradas_barranqueras': {
                        capasParaImprimir.push(vw_paradas_barranqueras._name);
                        map.addLayer(vw_paradas_barranqueras);
                        $.post(api_uso_capas, {capa: vw_paradas_barranqueras._name});
                    }
                        break;
                    case 'vw_recorrido_barranqueras': {
                        capasParaImprimir.push(vw_recorrido_barranqueras._name);
                        map.addLayer(vw_recorrido_barranqueras);
                        $.post(api_uso_capas, {capa: vw_recorrido_barranqueras._name});
                    }
                        break;
                    case 'vw_paradas_campus': {
                        capasParaImprimir.push(vw_paradas_campus._name);
                        map.addLayer(vw_paradas_campus);
                        $.post(api_uso_capas, {capa: vw_paradas_campus._name});
                    }
                        break;
                    case 'vw_recorrido_campus': {
                        capasParaImprimir.push(vw_recorrido_campus._name);
                        map.addLayer(vw_recorrido_campus);
                        $.post(api_uso_capas, {capa: vw_recorrido_campus._name});
                    }
                        break;
                    case 'vw_paradas_sarmiento': {
                        capasParaImprimir.push(vw_paradas_sarmiento._name);
                        map.addLayer(vw_paradas_sarmiento);
                        $.post(api_uso_capas, {capa: vw_paradas_sarmiento._name});
                    }
                        break;
                    case 'vw_recorrido_sarmiento': {
                        capasParaImprimir.push(vw_recorrido_sarmiento._name);
                        map.addLayer(vw_recorrido_sarmiento);
                        $.post(api_uso_capas, {capa: vw_recorrido_sarmiento._name});
                    }
                        break;

                    /*
                     * Red vial
                     */

                    case 'vw_alturas_calles': {
                        capasParaImprimir.push(vw_alturas_calles._name);
                        map.addLayer(vw_alturas_calles);
                        $.post(api_uso_capas, {capa: vw_alturas_calles._name});
                    }
                        break;

                    case 'vw_ide_calle': {
                        capasParaImprimir.push(vw_ide_calle._name);
                        map.addLayer(vw_ide_calle);
                        $.post(api_uso_capas, {capa: vw_ide_calle._name});
                    }
                        break;

                    case 'vw_ide_calle_por_tipo_calzada': {
                        capasParaImprimir.push(vw_ide_calle_por_tipo_calzada._name);
                        map.addLayer(vw_ide_calle_por_tipo_calzada);
                        $.post(api_uso_capas, {capa: vw_ide_calle_por_tipo_calzada._name});
                    }
                        break;

                    /***
                     * Informacion catastral
                     */
                    case 'vw_plazas_de_la_ciudad': {
                        capasParaImprimir.push(vw_plazas_de_la_ciudad._name);
                        map.addLayer(vw_plazas_de_la_ciudad);
                        $.post(api_uso_capas, {capa: vw_plazas_de_la_ciudad._name});
                    }
                        break;
                    case 'vw_asentamiento_renabap': {
                        capasParaImprimir.push(vw_asentamiento_renabap._name);
                        map.addLayer(vw_asentamiento_renabap);
                        $.post(api_uso_capas, {capa: vw_asentamiento_renabap._name});
                    }
                        break;
                    case 'vw_cordones': {
                        capasParaImprimir.push(vw_cordones._name);
                        map.addLayer(vw_cordones);
                        $.post(api_uso_capas, {capa: vw_cordones._name});
                    }
                        break;
                    case 'vw_grupo_viviendas_invico': {
                        capasParaImprimir.push(vw_grupo_viviendas_invico._name);
                        map.addLayer(vw_grupo_viviendas_invico);
                        $.post(api_uso_capas, {capa: vw_grupo_viviendas_invico._name});
                    }
                        break;
                    case 'vw_parcelas': {
                        capasParaImprimir.push(vw_parcelas._name);
                        map.addLayer(vw_parcelas);
                        $.post(api_uso_capas, {capa: vw_parcelas._name});
                    }
                        break;
                    case 'vw_ph_parcelas': {
                        capasParaImprimir.push(vw_ph_parcelas._name);
                        map.addLayer(vw_ph_parcelas);
                        $.post(api_uso_capas, {capa: vw_ph_parcelas._name});
                    }
                        break;
                    case 'vw_barrios': {
                        capasParaImprimir.push(vw_barrios._name);
                        map.addLayer(vw_barrios);
                        $.post(api_uso_capas, {capa: vw_barrios._name});
                    }
                        break;
                    case 'vw_manzanas': {
                        capasParaImprimir.push(vw_manzanas._name);
                        map.addLayer(vw_manzanas);
                        $.post(api_uso_capas, {capa: vw_manzanas._name});
                    }
                        break;
                }
                break;

            /*****************************************************************************************
             *
             * apaga las capas
             *
             ********************************************************************************************/

            case 'deselect_node':
                switch (data.node.id) {

                    case 'vw_recoleccion_diferenciada':{
                        vw_recoleccion_diferenciada.remove();
                        let i = capasParaImprimir.indexOf(vw_recoleccion_diferenciada._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_puntos_verdes':{
                        vw_puntos_verdes.remove();
                        let i = capasParaImprimir.indexOf(vw_puntos_verdes._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'rehabilitacionDesaguesPluviales':{
                        lyr_man_pluv.remove();
                        let i = capasParaImprimir.indexOf(lyr_man_pluv._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'rehabilitacionSumideros':{
                        lyr_man_sumidero.remove();
                        let i = capasParaImprimir.indexOf(lyr_man_sumidero._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'redAguaPotable':{
                        lyr_red_agua_potable.remove();
                        let i = capasParaImprimir.indexOf(lyr_red_agua_potable._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_desagues_pluviales':{
                        vw_desagues_pluviales.remove();
                        let i = capasParaImprimir.indexOf(vw_desagues_pluviales._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'red_desague_cloacal':{
                        vw_red_desague_cloaca.remove();
                        let i = capasParaImprimir.indexOf(vw_red_desague_cloaca._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_obras_cordones_cuneta':{
                        vw_obras_cordones_cuneta.remove();
                        let i = capasParaImprimir.indexOf(vw_obras_cordones_cuneta._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_obras_pavimento':{
                        vw_obras_pavimento.remove();
                        let i = capasParaImprimir.indexOf(vw_obras_pavimento._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_obras_ripio':{
                        vw_obras_ripio.remove();
                        let i = capasParaImprimir.indexOf(vw_obras_ripio._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_cloaca_social':{
                        vw_cloaca_social.remove();
                        let i = capasParaImprimir.indexOf(vw_cloaca_social._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_intervencion_en_plazas':{
                        vw_intervencion_en_plazas.remove();
                        let i = capasParaImprimir.indexOf(vw_intervencion_en_plazas._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_instal_canio_acceso_domicilio':{
                        vw_instal_canio_acceso_domicilio.remove();
                        let i = capasParaImprimir.indexOf(vw_instal_canio_acceso_domicilio._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_alumbrado_publico_led':{
                        vw_alumbrado_publico_led.remove();
                        let i = capasParaImprimir.indexOf(vw_alumbrado_publico_led._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_alumbrado_publico':{
                        vw_alumbrado_publico.remove();
                        let i = capasParaImprimir.indexOf(vw_alumbrado_publico._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_bocas_de_registro':{
                        vw_bocas_de_registro.remove();
                        let i = capasParaImprimir.indexOf(vw_bocas_de_registro._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_centros_distribuidores_dpec':{
                        vw_centros_distribuidores_dpec.remove();
                        let i = capasParaImprimir.indexOf(vw_centros_distribuidores_dpec._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_puntos_wifi':{
                        vw_puntos_wifi.remove();
                        let i = capasParaImprimir.indexOf(vw_puntos_wifi._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_obras_de_bacheo':{
                        vw_obras_de_bacheo.remove();
                        let i = capasParaImprimir.indexOf(vw_obras_de_bacheo._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_obras_santa_catalina_viviendas':{
                        vw_obras_santa_catalina_viviendas.remove();
                        let i = capasParaImprimir.indexOf(vw_obras_santa_catalina_viviendas._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_instalacion_canios_cruce_calle':{
                        vw_instalacion_canios_cruce_calle.remove();
                        let i = capasParaImprimir.indexOf(vw_instalacion_canios_cruce_calle._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_distritos_planeamiento_urbano':{
                        vw_distritos_planeamiento_urbano.remove();
                        let i = capasParaImprimir.indexOf(vw_distritos_planeamiento_urbano._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_ejido_urbano':{
                        vw_ejido_urbano.remove();
                        let i = capasParaImprimir.indexOf(vw_ejido_urbano._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_medianas':{
                        vw_medianas.remove();
                        let i = capasParaImprimir.indexOf(vw_medianas._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_edificios_historicos':{
                        vw_edificios_historicos.remove();
                        let i = capasParaImprimir.indexOf(vw_edificios_historicos._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_parcelas_por_distrito': // agregado por carlos 13/11/2020
                        vw_parcelas_por_distrito.remove();
                        let i = capasParaImprimir.indexOf(vw_parcelas_por_distrito._name);
                        if(i != -1) capasParaImprimir.splice(i, 1); else console.log('No existe el elemento');
                        break;

                    case 'vw_centros_de_pago':{
                        vw_centros_de_pago.remove();
                        let i = capasParaImprimir.indexOf(vw_centros_de_pago._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_dependencias_municipales':{
                        vw_dependencias_municipales.remove();
                        let i = capasParaImprimir.indexOf(vw_dependencias_municipales._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_poblacion':{
                        vw_poblacion.remove();
                        let i = capasParaImprimir.indexOf(vw_poblacion._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_densidad_de_poblacion':{
                        vw_densidad_de_poblacion.remove();
                        let i = capasParaImprimir.indexOf(vw_densidad_de_poblacion._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // Desarrollo Social Comunitario
                    case 'vw_cic':{
                        vw_cic.remove();
                        let i = capasParaImprimir.indexOf(vw_cic._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_delegaciones_municipales':{
                        vw_delegaciones_municipales.remove();
                        let i = capasParaImprimir.indexOf(vw_delegaciones_municipales._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_sum':{
                        vw_sum.remove();
                        let i = capasParaImprimir.indexOf(vw_sum._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_zonas_municipales':{
                        vw_zonas_municipales.remove();
                        let i = capasParaImprimir.indexOf(vw_zonas_municipales._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // Salud
                    case 'vw_caps':{
                        vw_caps.remove();
                        let i = capasParaImprimir.indexOf(vw_caps._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_saps_municipales':{
                        vw_saps_municipales.remove();
                        let i = capasParaImprimir.indexOf(vw_saps_municipales._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_centros_de_salud':{
                        vw_centros_de_salud.remove();
                        let i = capasParaImprimir.indexOf(vw_centros_de_salud._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_farmacias':{
                        vw_farmacias.remove();
                        let i = capasParaImprimir.indexOf(vw_farmacias._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_hospitales':{
                        vw_hospitales.remove();
                        let i = capasParaImprimir.indexOf(vw_hospitales._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_areas_programaticas_saps':{
                        vw_areas_programaticas_saps.remove();
                        let i = capasParaImprimir.indexOf(vw_areas_programaticas_saps._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    /**
                     * Corredor Vial
                     */
                    // carga y descarga
                    case 'vw_corredor_vial_carga_descarga':{
                        vw_corredor_vial_carga_descarga.remove();
                        let i = capasParaImprimir.indexOf(vw_corredor_vial_carga_descarga._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_corredor_vial_prohibido_estacionar':{
                        vw_corredor_vial_prohibido_estacionar.remove();
                        let i = capasParaImprimir.indexOf(vw_corredor_vial_prohibido_estacionar._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_estacionamiento_moto':{
                        vw_estacionamiento_moto.remove();
                        let i = capasParaImprimir.indexOf(vw_estacionamiento_moto._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_estacionamiento_medido':{
                        vw_estacionamiento_medido.remove();
                        let i = capasParaImprimir.indexOf(vw_estacionamiento_medido._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    /*
                     * Transporte
                     */

                    case 'vw_puntos_de_recarga_sube':{
                        vw_puntos_de_recarga_sube.remove();
                        let i = capasParaImprimir.indexOf(vw_puntos_de_recarga_sube._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_recorrido_total_colectivos_corrientes':{
                        vw_recorrido_total_colectivos_corrientes.remove();
                        let i = capasParaImprimir.indexOf(vw_recorrido_total_colectivos_corrientes._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_estacionamiento_privado':{
                        vw_estacionamiento_privado.remove();
                        let i = capasParaImprimir.indexOf(vw_estacionamiento_privado._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_paradas_colectivos':{
                        vw_paradas_colectivos.remove();
                        let i = capasParaImprimir.indexOf(vw_paradas_colectivos._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    /**
                     * Recorrido por ramal
                     */

                    // recorrido ramal 101 B
                    case 'recorrido_ramal_101_B':{
                        recorrido_ramal_101_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_101_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 101 C
                    case 'recorrido_ramal_101_C':{
                        recorrido_ramal_101_C.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_101_C._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 102 A
                    case 'recorrido_ramal_102_A':{
                        recorrido_ramal_102_A.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_102_A._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 102 B
                    case 'recorrido_ramal_102_B':{
                        recorrido_ramal_102_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_102_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 102 C
                    case 'recorrido_ramal_102_C':{
                        recorrido_ramal_102_C.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_102_C._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 103 A
                    case 'recorrido_ramal_103_A':{
                        recorrido_ramal_103_A.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_103_A._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 103 B
                    case 'recorrido_ramal_103_B':{
                        recorrido_ramal_103_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_103_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 103 B
                    case 'recorrido_ramal_103_C_directo':{
                        recorrido_ramal_103_C_directo.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_103_C_directo._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 103 C esperanza - Dr. MOntaña
                    case 'recorrido_ramal_103_C_esperanza_montania':{
                        recorrido_ramal_103_C_esperanza_montania.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_103_C_esperanza_montania._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 103 D
                    case 'recorrido_ramal_103_D':{
                        recorrido_ramal_103_D.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_103_D._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 104 B
                    case 'recorrido_ramal_104_B':{
                        recorrido_ramal_104_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_104_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 104 C
                    case 'recorrido_ramal_104_C':{
                        recorrido_ramal_104_C.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_104_C._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 104 D
                    case 'recorrido_ramal_104_D':{
                        recorrido_ramal_104_D.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_104_D._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 105 A
                    case 'recorrido_ramal_105_A':{
                        recorrido_ramal_105_A.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_105_A._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 105 B
                    case 'recorrido_ramal_105_B':{
                        recorrido_ramal_105_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_105_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 105 C 250 viv
                    case 'recorrido_ramal_105_C_250_viv':{
                        recorrido_ramal_105_C_250_viv.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_105_C_250_viv._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 105 C perichon
                    case 'recorrido_ramal_105_C_perichon':{
                        recorrido_ramal_105_C_perichon.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_105_C_perichon._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 106 A
                    case 'recorrido_ramal_106_A':{
                        recorrido_ramal_106_A.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_106_A._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 106 B
                    case 'recorrido_ramal_106_B':{
                        recorrido_ramal_106_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_106_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}

                    // recorrido ramal 106 C
                    case 'recorrido_ramal_106_C':{
                        recorrido_ramal_106_C.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_106_C._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 106 D
                    case 'recorrido_ramal_106_D':{
                        recorrido_ramal_106_D.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_106_D._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 108 AB
                    case 'recorrido_ramal_108_AB':{
                        recorrido_ramal_108_AB.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_108_AB._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 108 C
                    case 'recorrido_ramal_108_C':{
                        recorrido_ramal_108_C.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_108_C._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 109 A laguna soto
                    case 'recorrido_ramal_109_A_Laguna_Soto':{
                        recorrido_ramal_109_A_Laguna_Soto.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_109_A_Laguna_Soto._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 109 A laguna soto
                    case 'recorrido_ramal_109_A_Laguna_Soto':{
                        recorrido_ramal_109_A_Laguna_Soto.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_109_A_Laguna_Soto._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 109 B yecoha
                    case 'recorrido_ramal_109_B_Yecoha':{
                        recorrido_ramal_109_B_Yecoha.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_109_B_Yecoha._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 110 A
                    case 'recorrido_ramal_110_A':{
                        recorrido_ramal_110_A.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_110_A._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 110 B
                    case 'recorrido_ramal_110_B':{
                        recorrido_ramal_110_B.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_110_B._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // recorrido ramal 110 C Sta Catalina
                    case 'recorrido_ramal_110_C_sta_catalina':{
                        recorrido_ramal_110_C_sta_catalina.remove();
                        let i = capasParaImprimir.indexOf(recorrido_ramal_110_C_sta_catalina._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}

                    case 'vw_paradas_barranqueras':{
                        vw_paradas_barranqueras.remove();
                        let i = capasParaImprimir.indexOf(vw_paradas_barranqueras._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_recorrido_barranqueras':{
                        vw_recorrido_barranqueras.remove();
                        let i = capasParaImprimir.indexOf(vw_recorrido_barranqueras._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_paradas_campus':{
                        vw_paradas_campus.remove();
                        let i = capasParaImprimir.indexOf(vw_paradas_campus._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_recorrido_campus':{
                        vw_recorrido_campus.remove();
                        let i = capasParaImprimir.indexOf(vw_recorrido_campus._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_paradas_sarmiento':{
                        vw_paradas_sarmiento.remove();
                        let i = capasParaImprimir.indexOf(vw_paradas_sarmiento._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_recorrido_sarmiento':{
                        vw_recorrido_sarmiento.remove();
                        let i = capasParaImprimir.indexOf(vw_recorrido_sarmiento._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    /*
                     * Red vial
                     */

                    case 'vw_alturas_calles':{
                        vw_alturas_calles.remove();
                        let i = capasParaImprimir.indexOf(vw_alturas_calles._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_ide_calle':{
                        vw_ide_calle.remove();
                        let i = capasParaImprimir.indexOf(vw_ide_calle._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    case 'vw_ide_calle_por_tipo_calzada':{
                        vw_ide_calle_por_tipo_calzada.remove();
                        let i = capasParaImprimir.indexOf(vw_ide_calle_por_tipo_calzada._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

                    // Informacion catastral
                    case 'vw_plazas_de_la_ciudad':{
                        vw_plazas_de_la_ciudad.remove();
                        let i = capasParaImprimir.indexOf(vw_plazas_de_la_ciudad._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_asentamiento_renabap':{
                        vw_asentamiento_renabap.remove();
                        let i = capasParaImprimir.indexOf(vw_asentamiento_renabap._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_cordones':{
                        vw_cordones.remove();
                        let i = capasParaImprimir.indexOf(vw_cordones._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_grupo_viviendas_invico':{
                        vw_grupo_viviendas_invico.remove();
                        let i = capasParaImprimir.indexOf(vw_grupo_viviendas_invico._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_parcelas':{
                        vw_parcelas.remove();
                        let i = capasParaImprimir.indexOf(vw_parcelas._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_ph_parcelas':{
                        vw_ph_parcelas.remove();
                        let i = capasParaImprimir.indexOf(vw_ph_parcelas._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_barrios':{
                        vw_barrios.remove();
                        let i = capasParaImprimir.indexOf(vw_barrios._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                    case 'vw_manzanas':{
                        vw_manzanas.remove();
                        let i = capasParaImprimir.indexOf(vw_manzanas._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;
                }
                break
        }
    });

    // definicion de elemantos

    // $("#botones_opcion").buttonset();
    // $("#botones_opcion").buttonset();

    $(".opci-contenedor__opciones_radio").checkboxradio({
        icon: false
    });


    // registro eventos

    document.getElementById("infoCatastral").addEventListener('mouseover', function (ev) {

        document.getElementById("dlgTitulo").innerHTML = ev.srcElement.id.split('_')[0];

        document.getElementById("dlgCuerpo").innerHTML = "Cuerpo del mensaje";

    }, false);

    // contraer el panel lateral
    document.getElementById("btn-contraer").addEventListener('click', function (ev) {
        contraerBarraLateral();
        menu_abierto = false;
    }, false);

    function contraerBarraLateral() {
        $('#lateral').animate({
            left: 7
        }, 400, function () {

            $('#lateral').animate({
                left: -400
            }, 400);

        });

        $('#lateral').addClass('cerrado');
        $('#lateral').removeClass('abierto');
    }

    document.getElementById("btn-abrir").addEventListener('click', function (ev) {
        menu_abierto = true;
        $('#lateral').animate({
            left: 9
        }, 400, function () {

            $('#lateral').animate({
                left: 0
            }, 400);

        });
        $('#lateral').addClass('abierto');
        $('#lateral').removeClass('cerrado');
    }, false);

    $('#c').dialog({
        autoOpen: false,
        title: 'Aviso!!'
    });


// ======================================*********************************************=====================================
const inputBusqueda = document.getElementById('input-busqueda');
const autocompletCalles = $('#autocompletCalles');
const autocompletBarrios = $('#autocompletBarrios');

$(inputBusqueda).keyup(function (e) {
    let selected = $('input[name="opciones_busca-radio"]:checked').val();
    let value = inputBusqueda.value;
    if (e.keyCode == 13) {
        e.preventDefault();
        buscar(value);
    }else if(value != ''){
        if((inputBusqueda.value.length % 3) == 0){ //cada tres teclas hace la peticion
            
                $.get('rec_elem.php?queBusca='+selected+'&nombre_calle='+value, function(response){
                    
                    if(selected == 'Calle'){
                        autocompletCalles.html('');
                        autocompletCalles.css('display', 'block');
                        if(response != "-1"){
                            let data = JSON.parse(response);
                            data.forEach(element => {
                                if(element.name) autocompletCalles.append(`<li data-name="${element.name}"><span class="fa-li"><i class="fas fa-map-marker-alt"></i></span>${element.name}</li>`);
                            }); 
                        }
                    }else if(selected == 'Barrio'){
                        autocompletBarrios.html('');
                        autocompletBarrios.css('display', 'block');
                        if(response != "-1"){
                            let data = JSON.parse(response);
                            data.forEach(element => {
                                if(element.name) autocompletBarrios.append(`<li data-name="${element.name}"><span class="fa-li"><i class="fas fa-map-marker-alt"></i></span>${element.name}</li>`);
                            }); 
                        }
                    }                         
                });
            
        }
    }else{
        autocompletCalles.css('display', 'none');
        autocompletBarrios.css('display', 'none');
    }
});

autocompletBarrios.on('click', 'li', function(){
    inputBusqueda.value = $(this).data('name');
    autocompletBarrios.css('display', 'none');
});

autocompletCalles.on('click', 'li', function(){
    inputBusqueda.value = $(this).data('name');
    autocompletCalles.css('display', 'none');
});

// ======================================*********************************************=====================================



    /*
    const inputBusqueda = document.getElementById('input-busqueda');


    $(inputBusqueda).keyup(function(){
        let selected = $('input[name="opciones_busca-radio"]:checked').val();
        let query = $(this).val();

        if(selected == 'Calle'){
            filtrar(query, '#autocompletCalles');
        }else if(selected == 'Barrio'){
            filtrar(query, '#autocompletBarrios')
        }
    })
*/

/*
    function filtrar(query, lista){
        let elements = $(lista).children();
        if(query != ''){
            $(lista).css('display', 'block')
            elements.filter(function( index ) {
                
                if(this.innerText.toLowerCase().indexOf(query.toLowerCase()) > -1){
                    $(this).click(function(){
                        $(inputBusqueda).val($(this).text());
                        $(lista).css('display', 'none');
                    });
                    $(this).hover(function(){
                        $(this).css("background-color", "lightgray");
                    }, function(){
                        $(this).css("background-color", "white");
                    })
                    return this;
                }else{
                    this.style.display = 'none';
                }
               
            }).css( "display", "list-item" );
        }else{
            $(lista).css('display', 'none')
        }
    }
*/
    // expande opciones de busqueda
    $("#input-busqueda").focus(function () {
        $("#opci-contenedor").animate({
            height: 130,
            opacity: 0.85
        }, 400);
    });

    // contrae opciones de busqueda
    $("#opci-opci-boton").click(function () {
        $("#opci-contenedor").animate({
            height: 0,
            opacity: 0
        }, 400);
    })

    $("#x-cierre-btn").click(function () {

        $(".obj-no-encontre").animate({
            opacity: 0
        }, 400);

    });


    // ----------------- AGREGADO POR NAHUEL EL K-PO, EL NINJA, EL MASTER, EL ULTRAMEGA MEGA HYPER DUPER SENIOR DEVELOPER
    $("input[type='radio']").checkboxradio({
        icon: false
    }).on('change', function () {
        switch (this.value) {
            case 'interseccion':
                $('#input-busqueda').attr('placeholder', 'Calles separadas por comas');
                break;
            case 'Calle':
                $('#input-busqueda').attr('placeholder', 'Buscar calle por ej: Mendoza');
                break;
            case 'Barrio':
                $('#input-busqueda').attr('placeholder', 'Buscar barrio');
                break;
            case 'partida inmo':
                $('#input-busqueda').attr('placeholder', 'Buscar partida inmobiliaria');
                break;
            case 'partida inmo':
                $('#input-busqueda').attr('placeholder', 'Buscar dependencia municipal');
                break;
            case 'plaza':
                $('#input-busqueda').attr('placeholder', 'Buscar plaza o espacio verde');
                break;
            default:
                break;
        }
    });



    
    var lupa = document.getElementById('lupa');
    var opciones = document.getElementById('opciones');
    var cerrarOpciones = document.getElementById('cerrarOpciones');
    inputBusqueda.addEventListener('click', () => {
        if (opciones.classList.contains('oculto')) mostrarOpciones(opciones);
    });

    cerrarOpciones.addEventListener('click', () => {
        ocultarOpciones(opciones);
    }); //cierra el menu de opciones

    inputBusqueda.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            buscar(inputBusqueda.value);
        }
    });

    lupa.addEventListener('click', () => {
        buscar(inputBusqueda.value);
    });

    function mostrarOpciones(opciones) {
        opciones.classList.remove('oculto');
        opciones.style.maxHeight  = opciones.scrollHeight + 'px';
        opciones.style.marginBottom = '15px';
    }

    function ocultarOpciones(opciones) {
        opciones.classList.add('oculto');
        opciones.style.maxHeight = '0px';
    }

    

    function buscar(value) {
        document.getElementById('msg-no-encontre').textContent = '';
        document.getElementsByClassName('obj-no-encontre')[0].style.opacity = '0';

        if ($(window).width() <= 576) contraerBarraLateral();
        if (value === '') return false;
        else {
            queBusca = document.querySelector('input[name="opciones_busca-radio"]:checked').value;

            if(queBusca == 'partida inmo'){
                if(value.length != 9){
                    alert ('El adrema debe ingresar 9 caracteres');
                    return false;
                }
            }

            let datos;

            if (queBusca == 'interseccion') {
                let calles = value.split(',');
                datos = {
                    nombre_calle: calles[0],
                    nombre_calle2: calles[1],
                    queBusca: queBusca
                }
            } else {
                datos = {
                    nombre_calle: value,
                    queBusca: queBusca
                }
            }


            $.ajax("rec_elem.php", {

                data: datos,
                method: 'GET',
                success: function (response) {

                    if (response.trim() == '-1') {
                        Snackbar.show({
                            text: 'Sin resultados!',
                            actionText: 'Ok',
                            pos: 'bottom-center'
                        });
                        return false;
                    }

                   

                    // estoy por ver si es punto

                    // fin de ver si es punto

                    var myStyle = {
                        "color": "#ff7800",
                        "weight": 5,
                        "opacity": 0.65
                    };

                    
                        
                    let d;

                    try {
                        d = JSON.parse(response);
                    } catch (error) {
                        Snackbar.show({
                            text: 'Intentelo de nuevo mas tarde!',
                            actionText: 'Ok',
                            pos: 'bottom-center'
                        });
                        return false;
                    }
           
                    if (d[0].coordinates.type = "Polygon") {
                        let mygeoJSON = L.geoJSON(d, {
                            style: myStyle,
                            pointToLayer: function (geoJsonPoint, latlng) {
                                return new L.marker(latlng).bindTooltip(d[0].name, {
                                    permanent: true,
                                    direction: 'right',
                                    className: 'text-danger'
                                })
                            }
                        });

                        capas.push(mygeoJSON.addTo(map));
                        map.setView(mygeoJSON.getBounds().getCenter(), 16);
                        
                        crearBoton();
                        generarKML(d, queBusca); //definida en botonGuardar.js

                    } else {
                        capas.push(L.geoJSON(JSON.parse(response), {
                            style: myStyle,
                            pointToLayer: function (geoJsonPoint, latlng) {
                                return new L.marker(latlng, {
                                    // icon: myIcon
                                });
                            }
                        }).addTo(map));

                        crearBoton();
                        generarKML(d, queBusca); //definida en botonGuardar.js

                    }

                    if (queBusca === "Barrio") {
                        vw_barrios.addTo(map);
                        apagarCapaBarrio = true; // para cuando se limpie la busqueda.
                    }

                    $("#busca-root_borrar-busqueda").css('display', 'flex');


                }
            });
        };
    }

    $('#busca-root_borrar-busqueda').click(function (e) {

        capas.forEach(function (item, index) {
            item.remove();
        });

        $("#input-busqueda").val("");
        this.style.display = 'none';

        capas = [];

        if (queBusca === "Barrio") {
            map.removeLayer(vw_barrios);
        }

        resultadosKML = ``;
        if ($('#btnGuardar')) borrarBoton(); //declarada en botonGuardar.js
    });
});
