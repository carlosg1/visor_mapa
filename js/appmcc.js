let map,hash,measureControl;
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

    // diseño de la barra lateral de arbol
    //$('#lateral').height($(window).innerHeight() - 130);
    $('#map').height('100%');

    map = L.map('map', {
        drawControl: true,
        //center: [-27.49,-58.82],
        zoomControl: true, 
        maxZoom: 18,
        minZoom: 1
    }).fitBounds([[-27.5535444089,-58.9200306504],[-27.4048480239,-58.6404398294]]);

    hash = new L.Hash(map);

    map.attributionControl.addAttribution(false);
    map.attributionControl.getContainer().innerHTML='Mapa publico - '+'<a href="http://gis.ciudaddecorrientes.gov.ar" target="_blank">Direccion Gral de SIG</a>';

    measureControl = new L.Control.Measure({
        lang: 'es',
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'hectares'
    });

    measureControl.addTo(map);

    L.control.scale({maxWidth:150}).addTo(map);

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

    // armo el tree
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
/*                    case 'bing_map':
                        map.addLayer(overlay_BingMap);
                        break;  */
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
/*                    case 'bing_map':
                        overlay_BingMap.remove();
                        break; */
                }

                nodo_base_anterior = nodoSeleccionado;

                break;
        }

        return true;

    });

    arbolMCC = $('#arbolMCC').jstree({
        'plugins': ["wholerow", "checkbox"]
    }).on('changed.jstree', function(e, data) {
        nodo_pub_selec = data.instance.get_node(data.selected[data.selected.length-1]).id;

        switch (data.action) {
            case 'select_node':
                switch (data.node.id) {
                    case 'rehabilitacionDesaguesPluviales':
                        map.addLayer(lyr_man_pluv);
                    break;
                    case 'rehabilitacionSumideros':
                        map.addLayer(lyr_man_sumidero);
                    break;
                }
            break;

            case 'deselect_node':
                switch (data.node.id) {
                    case 'rehabilitacionDesaguesPluviales':
                    lyr_man_pluv.remove();
                    break;
                    case 'rehabilitacionSumideros':
                    lyr_man_sumidero.remove();
                    break;
                }
            break
        }
    });
});


/*
var servicioWMS = new wms_GIS("http://172.25.8.80:8080/geoserver/wms?", {
    format: 'image/png',
    uppercase: true,
    transparent: true,
    version: '1.3.0',
    continuousWorld : true,
    tiled: true,
    attribution: "Direccion Gral de GIS",
    info_format: 'application/json',
    opacity: 1
});
*/

/*
var osmGeocoder = new L.Control.OSMGeocoder({
    collapsed: false,
    position: 'topleft',
    text: 'Search',
});
*/

