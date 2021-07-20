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
        "checkbox": {
            cascade: "",
            three_state: false
        },
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

                    // ambiente
                    case 'vw_arbolado': 
                        capasParaImprimir.push(vw_arbolado._name);
                        map.addLayer(vw_arbolado);
                        $.post(api_uso_capas, {capa: vw_arbolado._name});
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

                    case 'vw_semaforo': {
                        capasParaImprimir.push(vw_semaforo._name);
                        map.addLayer(vw_semaforo);
                        $.post(api_uso_capas, {capa: vw_semaforo._name});
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

                    case 'vw_obras_vereda':
                        {
                            capasParaImprimir.push(vw_obras_vereda._name);
                            map.addLayer(vw_obras_vereda);
                            $.post(api_uso_capas, {capa: vw_obras_vereda._name});
                        }
                        break;

                    case 'vw_limpieza_de_canales_a_cielo_abierto':
                        {
                            capasParaImprimir.push(vw_limpieza_de_canales_a_cielo_abierto._name);
                            map.addLayer(vw_limpieza_de_canales_a_cielo_abierto);
                            $.post(api_uso_capas, {capa: vw_limpieza_de_canales_a_cielo_abierto._name});
                        }
                        break;

                    case 'vw_instalacion_de_camaras':
                        {
                            capasParaImprimir.push(vw_instalacion_de_camaras._name);
                            map.addLayer(vw_instalacion_de_camaras);
                            $.post(api_uso_capas, {capa: vw_instalacion_de_camaras._name});
                        }
                        break;

                    case 'vw_espacios_recuperados':
                        {
                            capasParaImprimir.push(vw_espacios_recuperados._name);
                            map.addLayer(vw_espacios_recuperados);
                            $.post(api_uso_capas, {capa: vw_espacios_recuperados._name});
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
                    // #############################
                    // NUEVAS CAPAS DE OBRAS
                    // #############################

                    case "bacheo":
                        prenderObra(1)
                        break;
                    case "instalacion_leds":
                        prenderObra(2)
                        break;
                    case "intervencion_plazas":
                        prenderObra(3)
                        break;
                    case "reparacion_cordones":
                        prenderObra(4)
                        break;
                    case "rehabilitacion_sumideros":
                        prenderObra(5)
                        break;
                    case "rehabilitacion_pluviales":
                        prenderObra(6)
                        break;
                    case "tubos_acceso_dom":
                        prenderObra(7)
                        break;
                    case "tubos_cruce_calle":
                        prenderObra(8)
                        break;
                    case "cloacas_social":
                        prenderObra(9)
                        break;
                    case "veredas":
                        prenderObra(11)
                        break;
                    case "cordon_cuneta":
                        prenderObra(12)
                        break;
                    case "obras_enripiado":
                        prenderObra(13)
                        break;
                    case "pavimento":
                        prenderObra(14)
                        break;
                    case "recapado":
                        prenderObra(15)
                        break;
                    case "espacios_recuperados":
                        prenderObra(16)
                        break;
                    case 'instalacion_camaras':
                        prenderObra(17)
                        break
                    case 'desarrollo_habitacional':
                        prenderObra(18)
                        break

                    case 'vivienda_lote_propio':
                        prenderObra(19)
                        break

                    case 'limpieza_de_canales':
                        prenderObra(20)
                        break;
                    case 'carteles':
                        prenderObra(21)
                        break;
                    case 'infra_salud':
                        prenderObra(102)
                        break
                    case 'infra_seguridad':
                        prenderObra(103)
                        break;
                    case 'infra_servicios':
                        prenderObra(104)
                        break;
                    case 'infra_telec':
                        prenderObra(105)
                        break;
                    case 'infra_transporte':
                        prenderObra(106)
                        break;
                    case 'infra_educ':
                        prenderObra(108)
                        break;
                    case 'infra_electrica':
                        prenderObra(109)
                        break;
                    case 'infra_religiosa':
                        prenderObra(110)
                        break;
                    case 'mejoras_edif':
                        prenderObra(111)
                        break;
                    case 'obras_complement':
                        prenderObra(112)
                        break;
                    case 'obras_hogares':
                        prenderObra(113)
                        break
                    case 'obras_hidricas':
                        prenderObra(114)
                        break;
                    case 'obras_nuevo_edif':
                        prenderObra(115)
                        break;
                    case 'obras_viales':
                        prenderObra(116)
                        break;
                    case 'obras_viales_comp':
                        prenderObra(117)
                        break;
                    case 'obras_cult_dep_tur':
                        prenderObra(118)
                        break;
                    case 'puestas_valor_parques':
                        prenderObra(119);
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

                    case "bacheo":
                        apagarObra(1);
                        break;
                    case "instalacion_leds":
                        apagarObra(2)
                        break;
                    case "intervencion_plazas":
                        apagarObra(3)
                        break;
                    case "reparacion_cordones":
                        apagarObra(4)
                        break;
                    case "rehabilitacion_sumideros":
                        apagarObra(5)
                        break;
                    case "rehabilitacion_pluviales":
                        apagarObra(6)
                        break;
                    case "tubos_acceso_dom":
                        apagarObra(7)
                        break;
                    case "tubos_cruce_calle":
                        apagarObra(8)
                        break;
                    case "cloacas_social":
                        apagarObra(9)
                        break;
                    case "veredas":
                        apagarObra(11)
                        break;
                    case "cordon_cuneta":
                        apagarObra(12)
                        break;
                    case "obras_enripiado":
                        apagarObra(13)
                        break;
                    case "pavimento":
                        apagarObra(14)
                        break;
                    case "recapado":
                        apagarObra(15)
                        break;
                    case "espacios_recuperados":
                        apagarObra(16)
                        break;
                    case 'instalacion_camaras':
                        apagarObra(17)
                        break
                    case 'desarrollo_habitacional':
                        apagarObra(18)
                        break
                    case 'vivienda_lote_propio':
                        apagarObra(19)
                        break
                    case 'limpieza_de_canales':
                        apagarObra(20)
                        break
                    case 'carteles':
                        apagarObra(21)
                        break
                    case 'infra_salud':
                        apagarObra(102)
                        break
                    case 'infra_seguridad':
                        apagarObra(103)
                        break;
                    case 'infra_servicios':
                        apagarObra(104)
                        break;
                    case 'infra_telec':
                        apagarObra(105)
                        break;
                    case 'infra_transporte':
                        apagarObra(106)
                        break;
                    case 'infra_educ':
                        apagarObra(108)
                        break;
                    case 'infra_electrica':
                        apagarObra(109)
                        break;
                    case 'infra_religiosa':
                        apagarObra(110)
                        break;
                    case 'mejoras_edif':
                        apagarObra(111)
                        break;
                    case 'obras_complement':
                        apagarObra(112)
                        break;
                    case 'obras_hogares':
                        apagarObra(113)
                        break
                    case 'obras_hidricas':
                        apagarObra(114)
                        break;
                    case 'obras_nuevo_edif':
                        apagarObra(115)
                        break;
                    case 'obras_viales':
                        apagarObra(116)
                        break;
                    case 'obras_viales_comp':
                        apagarObra(117)
                        break;
                    case 'obras_cult_dep_tur':
                        apagarObra(118)
                        break;
                    case 'puestas_valor_parques':
                        apagarObra(119);
                        break;

                    case 'vw_arbolado':{
                        vw_arbolado.remove();
                        let i = capasParaImprimir.indexOf(vw_arbolado._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('No existe el elemento');}
                        break;

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

                    case 'vw_semaforo':
                        {
                            vw_semaforo.remove();
                            let i = capasParaImprimir.indexOf(vw_semaforo._name);
                            if(i != -1) capasParaImprimir.splice(i, 1);
                            else console.log('No existe el elemento');
                        }
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

                    case 'vw_obras_vereda':
                        {
                            vw_obras_vereda.remove();
                        let i = capasParaImprimir.indexOf(vw_instalacion_canios_cruce_calle._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('no existe el elemento: ', vw_obras_vereda._name);
                        }
                        break;

                    case 'vw_limpieza_de_canales_a_cielo_abierto':
                        {
                            vw_limpieza_de_canales_a_cielo_abierto.remove();
                        let i = capasParaImprimir.indexOf(vw_limpieza_de_canales_a_cielo_abierto._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('no existe el elemento: ', vw_limpieza_de_canales_a_cielo_abierto._name);
                        }
                        break;

                    case 'vw_instalacion_de_camaras':
                        {
                            vw_instalacion_de_camaras.remove();
                        let i = capasParaImprimir.indexOf(vw_instalacion_de_camaras._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('no existe el elemento: ', vw_instalacion_de_camaras._name);
                        }
                        break;

                    case 'vw_espacios_recuperados':
                        {
                            vw_espacios_recuperados.remove();
                        let i = capasParaImprimir.indexOf(vw_espacios_recuperados._name);
                        if(i != -1) capasParaImprimir.splice(i, 1);
                        else console.log('no existe el elemento: ', vw_espacios_recuperados._name);
                        }
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
//            26/03/2021                 //
const inputBusqueda = document.getElementById('input-busqueda');
const autocompletado = $('#autocompletado');

$(inputBusqueda).keyup(function (e) {
    let selected = $('input[name="opciones_busca-radio"]:checked').val();
    let value = inputBusqueda.value;
    
    if (e.keyCode == 13) {
        e.preventDefault();
        autocompletado.html('');
        buscar(value);
    }else if(value != ''){
        if((inputBusqueda.value.length % 3) == 0){ //cada tres teclas hace la peticion
            
                $.get('autocompletado.php?queBusca='+selected+'&nombre_calle='+value, function(response){
                    
                    if(selected == 'Calle'){
                        autocompletado.html('');
                        if(response != "-1"){
                            let data = JSON.parse(response);
                            data.forEach(element => {
                               // if(element.name) autocompletCalles.append(`<li data-name="${element.name}"><span class="fa-li"><i class="fas fa-map-marker-alt"></i></span>${element.name}</li>`);
                               if(element.name) autocompletado.append(`<option value="${element.name}">${element.name}</option>`);
                            }); 
                        }
                    }else if(selected == 'Barrio'){
                        autocompletado.html('');
                        if(response != "-1"){
                            let data = JSON.parse(response);
                            data.forEach(element => {
                                if(element.name) autocompletado.append(`<option value="${element.name}">${element.name}</option>`);
                            }); 
                        }
                    }                         
                });
            
        }
    }
});


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

    setTimeout(() => {
        decodeHash();
    }, 1000)

    async function decodeHash() {
        

        let hashsearch = new URLSearchParams(location.search);
        let hash = hashsearch.get('h');
        if (hash && hash != '') {
            

            let param1, param0

            let response = await fetch('convert.php?cod='+hash)
            let decodificado = await response.text()

            let data = decodificado.split('&') 
            param1 = data[1] //n_zona o nombre_barrio
            param0 = data[0] //id_barrios o nombre

            localStorage.setItem('filter', param1);
            document.getElementById('quit_filtro').classList.remove('d-none');

            //saveVisit(param1, param0); 
            
            //Consulta y pinta el poligono dela zona en el mapa ----------------------------------------------------------------
            fetch('obras.php?query=getPolygon&request='+param1)
            .then(response => response.json())
            .then(response => {
                let geojson = L.geoJSON(response.data, {
                    style: { "color": "#424949", "weight": 6, "opacity": 0.65, "fillOpacity": 0.00 }
                })

                layers_from_qr.push(geojson.addTo(map))
                map.fitBounds(geojson.getBounds())
                hideButtons(); //esconde los botones
            })
            .catch(err => console.log(err))
            // -----------------------------------------------------------------------------------------------------------
            
            arbolMCC.jstree('open_node', 'obrasMunicipales');
            let obras_nodes_ids = $('#obrasMunicipales ul li');
            obras_nodes_ids.each((index, element) => arbolMCC.jstree('select_node', element.id));
            
        }else{
            try {
                localStorage.removeItem('filter');
            } catch (error) {
                console.log(error);
            }
        }

    }

    function pointToLayer(feature, latlng) {
        let icon = getIcon(feature.properties.idobra);

        //Si existe la propiedad options significa que es de tipo L.icon
        if (icon.options) return L.marker(latlng, { icon: icon })
        else return L.circleMarker(latlng, icon)
    }

    function getIcon(idobra) {
        let icon;
        switch (idobra) {
            case 1:
                icon = L.icon({ iconUrl: "images/vialidad1805/bacheo.png", iconSize: [20, 20] });
                break;
            case 2:
                icon = { radius: 4, fillColor: "#FADC02", color: "#FFF", weight: 1, opacity: 1, fillOpacity: 0.8 }
                break;
            case 3:
                icon = L.icon({ iconUrl: "images/vialidad1805/interv_plaza.png", iconSize: [20, 20] });
                break;
            case 4:
                icon = { radius: 4, fillColor: "#FE59C4", color: "#DD008F", weight: 1, opacity: 1, fillOpacity: 0.8 }
                break;
            case 5:
                icon = { radius: 4, fillColor: "#00BBFC", color: "#05A9C6", weight: 1, opacity: 1, fillOpacity: 0.8 }
                break;
            case 6:
                icon = { color: "#03E5FC", weight: 2, opacity: 0.99 }
                break;
            case 7:
                icon = { color: "#01C00D", weight: 2, opacity: 0.99 }
                break;
            case 8:
                icon = { color: "#01C00D", weight: 2, opacity: 0.99 }
                break;
            case 9:
                icon = { color: "#855336", weight: 2, opacity: 0.99 }
                break;
            case 10:
                icon = { color: "#855336", weight: 2, opacity: 0.99 }
                break;
            case 11:
                icon = { color: "#2D3AFD", weight: 2, opacity: 0.99 }
                break;
            case 12:
                icon = { color: "#A747A5", weight: 2, opacity: 0.99 }
                break;
            case 13:
                icon = { color: "#E8B00E", weight: 2, opacity: 0.99 }
                break;
            case 14:
                icon = { color: "#FC3E3E", weight: 2, opacity: 0.99 }
                break;
            case 15:
                icon = { color: "#FB8C3F", weight: 2, opacity: 0.99 }
                break;
            case 16:
                icon = L.icon({ iconUrl: 'images/vialidad1805/gps (2).png', iconSize: [20, 20], iconAnchor: [10, 20] })
                break;
            case 17:
                icon = L.icon({ iconUrl: 'images/vialidad1805/camaras.png', iconSize: [20, 20] })
                break;
            case 18:
                icon = { fillColor: "#e0e0e0", color: "#000", weight: 1, opacity: 1, fillOpacity: 0.5 }
                break;
            case 19:
                icon = L.icon({ iconUrl: 'images/vialidad1805/viviendas.png', iconSize: [24, 24], iconAnchor: [12, 12] })
                break;
            case 20:
                icon = { color: "#000000", weight: 2, opacity: 0.99 }
                break;
            case 21: //carteles
                icon = L.icon({ iconUrl: "images/vialidad1805/carteles.png", iconSize: [20, 20] });
                break;
            case 101: //desarrollo habitacional
                icon = { fillColor: "#e0e0e0", color: "#000", weight: 1, opacity: 1, fillOpacity: 0.5 }
                break;
            case 102: //infraestructura de salud
                icon = L.icon({ iconUrl: "images/vialidad1805/infra_salud.png", iconSize: [20, 20] });
                break;
            case 103: //infraestructura de seguridad
                icon = L.icon({ iconUrl: 'images/vialidad1805/infra_seguridad.png', iconSize: [20, 20] });
                break;
            case 104: //infraestructura de servicios
                icon = L.icon({ iconUrl: 'images/vialidad1805/gps.png', iconSize: [20, 20], iconAnchor: [10, 20] });
                break;
            case 105: //infraestructura de telecomunicaciones
                icon = L.icon({ iconUrl: 'images/vialidad1805/marker.png', iconSize: [20, 20], iconAnchor: [10, 20] });
                break;
            case 106: //infraestructura de transporte
                icon = L.icon({ iconUrl: 'images/vialidad1805/marker-green.png', iconSize: [20, 20], iconAnchor: [10, 20] });
                break;
            case 108: //infraestructura educ
                icon = L.icon({ iconUrl: 'images/vialidad1805/infra_educ.png', iconSize: [20, 20] });
                break;
            case 109: //infra electrica
                icon = L.icon({ iconUrl: 'images/vialidad1805/lighting.png', iconSize: [20, 20] });
                break;
            case 110: // infra religiosa
                icon = L.icon({ iconUrl: 'images/vialidad1805/eclipse.png', iconSize: [20, 20] });
                break;
            case 111: //mejoras en edif publicos
                icon = L.icon({ iconUrl: 'images/vialidad1805/edificio.png', iconSize: [20, 20] });
                break;
            case 112: //obras complementarias
                icon = L.icon({ iconUrl: 'images/vialidad1805/rec.png', iconSize: [20, 20] });
                break;
            case 113: //obras en hogares de niños y ancianos
                icon = L.icon({ iconUrl: 'images/vialidad1805/rec(1).png', iconSize: [20, 20] });
                break;
            case 114: //obras hidricas
                icon = L.icon({ iconUrl: 'images/vialidad1805/obras_hidricas.png', iconSize: [20, 20] });
                break;
            case 115: //obras nuevo edif publico
                icon = L.icon({ iconUrl: 'images/vialidad1805/rec(3).png', iconSize: [20, 20] });
                break;
            case 116: //obras viales
                icon = L.icon({ iconUrl: 'images/vialidad1805/hexagon.svg', iconSize: [20, 20] });
                break;
            case 117: //obras viales complementarias
                icon = L.icon({ iconUrl: 'images/vialidad1805/hexagon(1).svg', iconSize: [20, 20] });
                break;
            case 118: //obras vinculados a la cultura, deporte,
                icon = L.icon({ iconUrl: 'images/vialidad1805/hexagon(2).svg', iconSize: [20, 20] });
                break;
            case 119: //puesta en valor de parquez y plazas
                icon = L.icon({ iconUrl: 'images/vialidad1805/hexagon(3).svg', iconSize: [20, 20] });
                break;
            default:
                //icon = { radius: 4, fillColor: "#FE59C4", color: "#DD008F", weight: 1, opacity: 1, fillOpacity: 0.8 }
                break;
        }

        return icon;
    };

    function getObras(idobra, param1) {



        if (!idobra) idobra = '';
        if (!param1) param1 = '';

        fetch('obras.php?query=getObras&request=' + param1 + '&obra=' + idobra)
        .then(res => res.json())
        .then(res => {
            let geojson = L.geoJSON(res.data, {
                style: (feature) => getIcon(feature.geometry.properties.idobra),
                pointToLayer: pointToLayer,
                onEachFeature: (feature, layer) => {
                    layer.name = feature.properties.idobra;
                    layer.bindPopup(`
                    <h3><b>Obra</b>: ${feature.properties.obra}</h3>
                    <h4><b>Cantidad</b>: ${feature.properties.cantidad}</h4>
                `);
                }
            });

            layers_from_qr.push(geojson.addTo(map)); //capa_obras definido en la cabecera del index 
        })
        .catch(err => console.log(err));
    }

    function prenderObra(idobra) {
        let filter = localStorage.getItem('filter')
        if (filter) getObras(idobra, filter)
        else getObras(idobra);
    }

    function apagarObra(idobra) {
        map.eachLayer(function (l) {
            if (idobra == 9) {
                if (l.name == 9 || l.name == 10) l.remove(); //para el caso de cloaca social que se muestran juntas las obras cloca social y cloaca social conex dom    
            } else {
                if (l.name == idobra) l.remove();
            }

        });
    }

    document.getElementById('quit_filtro').addEventListener('click', function () {
        this.classList.add('d-none');
        localStorage.removeItem('filter');
        layers_from_qr.forEach(e => e.remove());
        arbolMCC.jstree('open_node', 'obrasMunicipales');
        let obras_nodes_ids = $('#obrasMunicipales ul li');
        obras_nodes_ids.each((index, element) => arbolMCC.jstree('deselect_node', element.id));
        showButtons()
    });

    function saveVisit(param1, param0){
        /* 
        let position = await getCurrentPosition(); */
        let dispositivo = window.mobileCheck() ? 'mobile' : 'desktop';
        let fm = new FormData()
        fm.append('url', location.href)
        fm.append('id', param1)
        fm.append('nombre', param0)
        fm.append('dispositivo', dispositivo)

        fetch(location.origin+'/app-qr-counter/api_zona_qr.php?query=create', { method: 'POST', body: fm })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    }

});

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function hideButtons(){
    $('#boton-mapillary').addClass('d-none')
    $('#boton-google').addClass('d-none')
    $('#boton-imprimir').addClass('d-none')
    //$('#compartir').addClass('d-none')
    measureControl.remove()
}

function showButtons(){
    $('#boton-mapillary').removeClass('d-none')
    $('#boton-google').removeClass('d-none')
    $('#boton-imprimir').removeClass('d-none')
    //$('#compartir').removeClass('d-none')
    measureControl.addTo(map) 
}