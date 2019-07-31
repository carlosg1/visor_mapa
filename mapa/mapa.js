
//
// define el objeto map y le asigna algunas propiedades
// también le asigna algunos controles
// fecha mod.: 16/05/2019
//
let map = undefined;
let baseMap = undefined;

$(document).ready(function() {

    $('#map').height('100%');

    map = L.map('map', {
        zoomControl: true,
        inertia: true,
        maxZoom:18,
        minZoom:1,
        crs: L.CRS.EPSG900913,
        center: [-27.48483,-58.81393],
        zoom: 18
    });

    map.zoomControl.setPosition('topright');

    map.fitBounds([[-27.45664518742547, -58.763208389282234],[-27.504312737195168, -58.87899398803712]]);

    hash = new L.Hash(map);

    map.attributionControl.addAttribution(false);
    map.attributionControl.getContainer().innerHTML = 'Mapa publico - '+'<a href="http://gis.ciudaddecorrientes.gov.ar" target="_blank">Direccion Gral de SIG</a>';

    measureControl = new L.Control.Measure({
        lang: 'es',
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'hectares'
    });

    measureControl.addTo(map);

    L.control.scale({maxWidth:150}).addTo(map);

    map.on('mousemove', function(event){
        var a = 'Mapa publico - ' + '<a href="http://gis.ciudaddecorrientes.gov.ar" target="_blank">Direccion Gral de SIG</a> - ';

        map.attributionControl.getContainer().innerHTML = a + 'Coord.: [' + event.latlng.lat + ', ' + event.latlng.lng + ']';

    }, true);

});

