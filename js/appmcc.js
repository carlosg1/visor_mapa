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

    wmsMcc = new wms_GIS("http://190.7.30.142:8000/geoserver/wms?", {
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
                }
            break
        }
    });
});


