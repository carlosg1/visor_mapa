/**
 * 
 * actualizado: 11/02/2020
 * Developer: Lic. Carlos Garcia
 * Contacto: carlosgctes@gmail.com
 * 
 */ 
let hash,measureControl;
let overlay_GooglecnSatellite, overlay_GoogleRoad, overlay_GoogleTraffic;
let overlay_BingMap, overlay_BingSatellite;
let overlay_OSMStandard;
let overlay_CapabaseGIS, wmsMcc;
let arbolCapaBase = arbolMCC = nodo_base_anterior = nodoSeleccionado = undefined;
let nodo_pub_selec, nodo_pub_anterior = undefined;
let capas = Array();
let apagarCapaBarrio = false;

// variable que controla que se va a buscar
// segun si se selecciono o no, algunas opciones
// extras
let queBusca = undefined;

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

    overlay_CapabaseGIS = L.tileLayer.wms('http://190.7.30.142:8282/geoserver/wms',{
        layers:'capa_base_mcc:capa_base', 
        format: 'image/png', 
        transparent: true,
        tiled: true
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
    // $.jstree.defaults.core.themes.variant = "large"; // configuracion global 
    $.jstree.defaults.checkbox.keep_selected_style = true 

    arbolCapaBase = $('#arbolCapaBase').jstree({

        "core": {
            "multiple": false,
            "animation": 0,
            "string": {
                'Loading ...' : 'Cargando ...'
            }
        },

        "checkbox" : {
            "keep_selected_style" : true
        },

        "plugins": ["checkbox", "wholerow"]

    })
    .on('changed.jstree', function(e, data) {
        // console.log('e == ', e);
        // console.log('data == ', data);

        nodoSeleccionado = data.instance.get_node(data.selected[data.selected.length-1]).id;

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
        // console.log('e == ', e);
        // console.log('data == ', data);
        // console.log('data.node.children.length == ', data.node.children.length);
        
        nodo_pub_selec = data.instance.get_node(data.selected[data.selected.length-1]).id;

        switch (data.action) {

            // prende las capas 
            case 'select_node':
                switch (data.node.id) {

                    case 'infoCatastral':
                        // deseleccionar los nodos hijos
                        break;

                    case 'vw_recoleccion_diferenciada':
                        map.addLayer(vw_recoleccion_diferenciada);
                        break;

                    case 'vw_puntos_verdes':
                        map.addLayer(vw_puntos_verdes);
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

                    case 'vw_cloaca_social':
                        map.addLayer(vw_cloaca_social);
                        // map.fitBounds([[-27.540468433268224, -58.865776062011726],[-27.46883054884205, -58.74681472778321]]);
                        break;

                    case 'vw_intervencion_en_plazas':
                        map.addLayer(vw_intervencion_en_plazas);
                        break;

                    case 'vw_instal_canio_acceso_domicilio':
                        map.addLayer(vw_instal_canio_acceso_domicilio);
                        break;

                    case 'vw_alumbrado_publico_led':
                        map.addLayer(vw_alumbrado_publico_led);
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

                    case 'vw_puntos_wifi':
                        map.addLayer(vw_puntos_wifi);
                        break;

                    case 'vw_obras_de_bacheo':
                        map.addLayer(vw_obras_de_bacheo);
                        // $(".ref-bacheo").css('visibility', 'visible'); 
                        break;

                    case 'vw_obras_santa_catalina_viviendas':
                        map.addLayer(vw_obras_santa_catalina_viviendas);
                        break;
                        
                    case 'vw_instalacion_canios_cruce_calle':
                        map.addLayer(vw_instalacion_canios_cruce_calle);
                        map.fitBounds([[-27.50484564427456, -58.86611938476563],[-27.433184575621027, -58.750419616699226]]);
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
                    
                    /**
                     * Corredor vial
                     */
                    // carga y descarga
                    case 'vw_corredor_vial_carga_descarga':
                        map.addLayer(vw_corredor_vial_carga_descarga);
                        break;

                    case 'vw_corredor_vial_prohibido_estacionar':
                        map.addLayer(vw_corredor_vial_prohibido_estacionar);
                        break;

                    // estacionamiento moto
                    case 'vw_estacionamiento_moto':
                        map.addLayer(vw_estacionamiento_moto);
                        break;

                    case 'vw_estacionamiento_medido':
                        map.addLayer(vw_estacionamiento_medido);
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

                    // recorrido ramal 102 A
                    case 'recorrido_ramal_102_A':
                        map.addLayer(recorrido_ramal_102_A);
                        break;

                    // recorrido ramal 102 B
                    case 'recorrido_ramal_102_B':
                        map.addLayer(recorrido_ramal_102_B);
                        break;

                    // recorrido ramal 102 C
                    case 'recorrido_ramal_102_C':
                        map.addLayer(recorrido_ramal_102_C);
                        break;

                    // recorrido ramal 103 A
                    case 'recorrido_ramal_103_A':
                        map.addLayer(recorrido_ramal_103_A);
                        break;

                    // recorrido ramal 103 B
                    case 'recorrido_ramal_103_B':
                        map.addLayer(recorrido_ramal_103_B);
                        break;

                    // recorrido ramal 103 C - Directo
                    case 'recorrido_ramal_103_C_directo':
                        map.addLayer(recorrido_ramal_103_C_directo);
                        break;

                    // recorrido ramal 103 C - Esperanza - Dr. Montaña
                    case 'recorrido_ramal_103_C_esperanza_montania':
                        map.addLayer(recorrido_ramal_103_C_esperanza_montania);
                        break;

                    // recorrido ramal 103 D
                    case 'recorrido_ramal_103_D':
                        map.addLayer(recorrido_ramal_103_D);
                        break;

                    // recorrido ramal 104 A
                    case 'recorrido_ramal_104_A':
                        map.addLayer(recorrido_ramal_104_A);
                        break;

                    // recorrido ramal 104 B
                    case 'recorrido_ramal_104_B':
                        map.addLayer(recorrido_ramal_104_B);
                        break;

                    // recorrido ramal 104 C
                    case 'recorrido_ramal_104_C':
                        map.addLayer(recorrido_ramal_104_C);
                        break;

                    // recorrido ramal 104 D
                    case 'recorrido_ramal_104_D':
                        map.addLayer(recorrido_ramal_104_D);
                        break;

                    // recorrido ramal 105 A
                    case 'recorrido_ramal_105_A':
                        map.addLayer(recorrido_ramal_105_A);
                        break;

                    // recorrido ramal 105 B
                    case 'recorrido_ramal_105_B':
                        map.addLayer(recorrido_ramal_105_B);
                        break;

                    // recorrido ramal 105 C 250 viv
                    case 'recorrido_ramal_105_C_250_viv':
                        map.addLayer(recorrido_ramal_105_C_250_viv);
                        break;

                    // recorrido ramal 105 C perichon
                    case 'recorrido_ramal_105_C_perichon':
                        map.addLayer(recorrido_ramal_105_C_perichon);
                        break;

                    // recorrido ramal 106 A
                    case 'recorrido_ramal_106_A':
                        map.addLayer(recorrido_ramal_106_A);
                        break;

                    // recorrido ramal 106 B
                    case 'recorrido_ramal_106_B':
                        map.addLayer(recorrido_ramal_106_B);
                        break;

                    // recorrido ramal 106 C
                    case 'recorrido_ramal_106_C':
                        map.addLayer(recorrido_ramal_106_C);
                        break;

                    // recorrido ramal 106 D
                    case 'recorrido_ramal_106_D':
                        map.addLayer(recorrido_ramal_106_D);
                        break;

                    // recorrido ramal 108 AB
                    case 'recorrido_ramal_108_AB':
                        map.addLayer(recorrido_ramal_108_AB);
                        break;

                    // recorrido ramal 108 C
                    case 'recorrido_ramal_108_C':
                        map.addLayer(recorrido_ramal_108_C);
                        break;

                    // recorrido ramal 109 A laguna soto
                    case 'recorrido_ramal_109_A_Laguna_Soto':
                        map.addLayer(recorrido_ramal_109_A_Laguna_Soto);
                        break;

                    // recorrido ramal 109 B Yecoha
                    case 'recorrido_ramal_109_B_Yecoha':
                        map.addLayer(recorrido_ramal_109_B_Yecoha);
                        break;

                    // recorrido ramal 110 A
                    case 'recorrido_ramal_110_A':
                        map.addLayer(recorrido_ramal_110_A);
                        break;

                    // recorrido ramal 110 B
                    case 'recorrido_ramal_110_B':
                        map.addLayer(recorrido_ramal_110_B);
                        break;

                    // recorrido ramal 110 C Sta Catalina
                    case 'recorrido_ramal_110_C_sta_catalina':
                        map.addLayer(recorrido_ramal_110_C_sta_catalina);
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

                    case 'vw_alturas_calles':
                        map.addLayer(vw_alturas_calles);
                        break;

                    case 'vw_ide_calle':
                        map.addLayer(vw_ide_calle);
                        break;

                    case 'vw_ide_calle_por_tipo_calzada':
                        map.addLayer(vw_ide_calle_por_tipo_calzada);
                        break;

                    /***
                     * Informacion catastral
                     */ 
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

            /*****************************************************************************************
             * 
             * apaga las capas
             * 
             ********************************************************************************************/

            case 'deselect_node':
                switch (data.node.id) {

                    case 'vw_recoleccion_diferenciada':
                        vw_recoleccion_diferenciada.remove();
                        break;

                    case 'vw_puntos_verdes':
                        vw_puntos_verdes.remove();
                        break;

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

                    case 'vw_cloaca_social':
                        vw_cloaca_social.remove();
                    break;

                    case 'vw_intervencion_en_plazas':
                        vw_intervencion_en_plazas.remove();
                    break;

                    case 'vw_instal_canio_acceso_domicilio':
                        vw_instal_canio_acceso_domicilio.remove();
                    break;

                    case 'vw_alumbrado_publico_led':
                        vw_alumbrado_publico_led.remove();
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

                    case 'vw_puntos_wifi':
                        vw_puntos_wifi.remove();
                        break;

                    case 'vw_obras_de_bacheo':
                            // $(".ref-bacheo").css('visibility', 'hidden');
                            vw_obras_de_bacheo.remove();
                        break;

                    case 'vw_obras_santa_catalina_viviendas':
                        vw_obras_santa_catalina_viviendas.remove();
                        break;

                    case 'vw_instalacion_canios_cruce_calle':
                            vw_instalacion_canios_cruce_calle.remove();
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

                    /**
                     * Corredor Vial
                     */
                    // carga y descarga
                    case 'vw_corredor_vial_carga_descarga':
                        vw_corredor_vial_carga_descarga.remove();
                        break;
                    
                    case 'vw_corredor_vial_prohibido_estacionar':
                        vw_corredor_vial_prohibido_estacionar.remove();
                        break;
                    
                    case 'vw_estacionamiento_moto':
                        vw_estacionamiento_moto.remove();
                        break;

                    case 'vw_estacionamiento_medido':
                        vw_estacionamiento_medido.remove();
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

                    // recorrido ramal 102 B
                    case 'recorrido_ramal_102_B':
                        recorrido_ramal_102_B.remove();
                        break;

                    // recorrido ramal 102 C
                    case 'recorrido_ramal_102_C':
                        recorrido_ramal_102_C.remove();
                        break;

                    // recorrido ramal 103 A
                    case 'recorrido_ramal_103_A':
                        recorrido_ramal_103_A.remove();
                        break;

                    // recorrido ramal 103 B
                    case 'recorrido_ramal_103_B':
                        recorrido_ramal_103_B.remove();
                        break;

                    // recorrido ramal 103 B
                    case 'recorrido_ramal_103_C_directo':
                        recorrido_ramal_103_C_directo.remove();
                        break;

                    // recorrido ramal 103 C esperanza - Dr. MOntaña
                    case 'recorrido_ramal_103_C_esperanza_montania':
                        recorrido_ramal_103_C_esperanza_montania.remove();
                        break;

                    // recorrido ramal 103 D
                    case 'recorrido_ramal_103_D':
                        recorrido_ramal_103_D.remove();
                        break;

                    // recorrido ramal 104 B
                    case 'recorrido_ramal_104_B':
                        recorrido_ramal_104_B.remove();
                        break;

                    // recorrido ramal 104 C
                    case 'recorrido_ramal_104_C':
                        recorrido_ramal_104_C.remove();
                        break;

                    // recorrido ramal 104 D
                    case 'recorrido_ramal_104_D':
                        recorrido_ramal_104_D.remove();
                        break;

                    // recorrido ramal 105 A
                    case 'recorrido_ramal_105_A':
                        recorrido_ramal_105_A.remove();
                        break;

                    // recorrido ramal 105 B
                    case 'recorrido_ramal_105_B':
                        recorrido_ramal_105_B.remove();
                        break;

                    // recorrido ramal 105 C 250 viv
                    case 'recorrido_ramal_105_C_250_viv':
                        recorrido_ramal_105_C_250_viv.remove();
                        break;

                    // recorrido ramal 105 C perichon
                    case 'recorrido_ramal_105_C_perichon':
                        recorrido_ramal_105_C_perichon.remove();
                        break;

                    // recorrido ramal 106 A
                    case 'recorrido_ramal_106_A':
                        recorrido_ramal_106_A.remove();
                        break;

                    // recorrido ramal 106 B
                    case 'recorrido_ramal_106_B':
                        recorrido_ramal_106_B.remove();

                    // recorrido ramal 106 C
                    case 'recorrido_ramal_106_C':
                        recorrido_ramal_106_C.remove();
                        break;

                    // recorrido ramal 106 D
                    case 'recorrido_ramal_106_D':
                        recorrido_ramal_106_D.remove();
                        break;

                    // recorrido ramal 108 AB
                    case 'recorrido_ramal_108_AB':
                        recorrido_ramal_108_AB.remove();
                        break;

                    // recorrido ramal 108 C
                    case 'recorrido_ramal_108_C':
                        recorrido_ramal_108_C.remove();
                        break;

                    // recorrido ramal 109 A laguna soto
                    case 'recorrido_ramal_109_A_Laguna_Soto':
                        recorrido_ramal_109_A_Laguna_Soto.remove();
                        break;

                    // recorrido ramal 109 A laguna soto
                    case 'recorrido_ramal_109_A_Laguna_Soto':
                        recorrido_ramal_109_A_Laguna_Soto.remove();
                        break;

                    // recorrido ramal 109 B yecoha
                    case 'recorrido_ramal_109_B_Yecoha':
                        recorrido_ramal_109_B_Yecoha.remove();
                        break;

                    // recorrido ramal 110 A
                    case 'recorrido_ramal_110_A':
                        recorrido_ramal_110_A.remove();
                        break;

                    // recorrido ramal 110 B
                    case 'recorrido_ramal_110_B':
                        recorrido_ramal_110_B.remove();
                        break;

                    // recorrido ramal 110 C Sta Catalina
                    case 'recorrido_ramal_110_C_sta_catalina':
                        recorrido_ramal_110_C_sta_catalina.remove();

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

                    case 'vw_alturas_calles':
                        vw_alturas_calles.remove();
                        break;
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

    // definicion de elemantos

    // $("#botones_opcion").buttonset();
    $("#botones_opcion").buttonset();

    $(".opci-contenedor__opciones_radio").checkboxradio({
        icon: false
    });
    

    // registro eventos

    document.getElementById("infoCatastral").addEventListener('mouseover', function (ev){

        document.getElementById("dlgTitulo").innerHTML = ev.srcElement.id.split('_')[0];

        document.getElementById("dlgCuerpo").innerHTML = "Cuerpo del mensaje";

    }, false);

    // contraer el panel lateral
    document.getElementById("btn-contraer").addEventListener('click', function(ev){
       contraerBarraLateral();
    }, false);

    function contraerBarraLateral(){
        $('#lateral').animate({left: 7}, 400, function(){

            $('#lateral').animate({left: -400}, 400);
    
        });
    }

    document.getElementById("btn-abrir").addEventListener('click', function(ev){

        $('#lateral').animate({left: 9}, 400, function(){

            $('#lateral').animate({left: 0}, 400);

        });
    }, false);

    // document.getElementById("frmBusca").addEventListener('keyup', function(ev){

    //     if (ev.keyCode === 13) {

    //         ev.preventDefault();

    //         document.getElementById("lupa-busca-boton").click();

    //     }

    // });

    $('#c').dialog({ 
        autoOpen: false,
        title: 'Aviso!!'
    });

    // expande opciones de busqueda
    $("#input-busqueda").focus(function (){ 
        $("#opci-contenedor").animate({height: 130, opacity: 0.85}, 400);
    });

    // contrae opciones de busqueda
    $("#opci-opci-boton").click(function (){
        $("#opci-contenedor").animate({height: 0, opacity: 0}, 400);
    })

    $("#x-cierre-btn").click(function (){

        $(".obj-no-encontre").animate({opacity: 0}, 400);

    });


    // ----------------- AGREGADO POR NAHUEL EL K-PO, EL NINJA, EL MASTER, EL ULTRAMEGA MEGA HYPER DUPER SENIOR DEVELOPER
    $("input[type='radio']").checkboxradio({
        icon: false
    });

    var inputBusqueda = document.getElementById('input-busqueda');
    var lupa = document.getElementById('lupa');
    var opciones = document.getElementById('opciones');
    var cerrarOpciones = document.getElementById('cerrarOpciones'); 
    inputBusqueda.addEventListener('click', () => {
        if (opciones.classList.contains('oculto')) mostrarOpciones(opciones);
    });

    cerrarOpciones.addEventListener('click', () => {ocultarOpciones(opciones);}); //cierra el menu de opciones

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
        opciones.style.opacity = 1;
        opciones.style.height = 'auto';
        opciones.style.marginBottom = '15px';
    }

    function ocultarOpciones(opciones) {
        opciones.classList.add('oculto');
        opciones.style.opacity = 0;
        opciones.style.height = '0px';
    }

    function buscar(value) {
        document.getElementById('msg-no-encontre').textContent = '';
        document.getElementsByClassName('obj-no-encontre')[0].style.opacity = '0';

        if($(window).width() <= 576) contraerBarraLateral();
        if (value === '') return false;
        else {
            queBusca = document.querySelector('input[name="opciones_busca-radio"]:checked').value;

            $.ajax("rec_elem.php", {

                data: 'nombre_calle=' + value + "&a=" + queBusca,
                method: 'POST',
                success: function(response) {

                    if (response == '-1') {

                        $("#obj-no-encontre_cuerpo").html("La busqueda no di&oacute; ning&uacute;n resultado");

                        $(".obj-no-encontre").animate({
                            opacity: 0.8
                        }, 400, function() {
                            $(".obj-no-encontre").effect('pulsate')
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

                    capas.push(L.geoJSON(JSON.parse(response), {
                        style: myStyle
                    }).addTo(map));

                    if (queBusca === "Barrio") {
                        vw_barrios.addTo(map);
                        apagarCapaBarrio = true; // para cuando se limpie la busqueda.
                    }

                    $("#busca-root_borrar-busqueda").css('display', 'flex');

                }
            });
        };
    }

    $('#busca-root_borrar-busqueda').click(function(e) {

        capas.forEach(function(item, index) {
            item.remove();
        });

        $("#input-busqueda").val("");
        this.style.display = 'none';

        capas = [];

        if (queBusca === "Barrio") {
            map.removeLayer(vw_barrios);
        }
    });
});

