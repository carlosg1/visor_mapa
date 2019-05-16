
$(document).ready(function() {

    let opcionWms = {
        format: 'image/png',
        uppercase: true,
        transparent: true,
        version: '1.1.1',
        continuousWorld : true,
        tiled: true,
        attribution: "Direccion Gral de GIS",
        info_format: 'application/json',
        opacity: 1
    };

    //opcionWms.pane = map.createPane('labels').style.zIndex = 510;

    lyr_man_pluv = new wms_GIS("http://190.7.30.142:8000/geoserver/wms?", opcionWms).getLayer("infra:Red de Agua de Potable");

});

