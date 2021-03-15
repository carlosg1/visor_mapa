//
// define el objeto map y le asigna algunas propiedades
// también le asigna algunos controles
// fecha mod.: 06/02/2020
//
let map = undefined;
let baseMap = undefined;

$(document).ready(function() {

      $('#map').height('100%');

      map = L.map('map', {
            zoomControl: true,
            inertia: true,
            maxZoom: 18,
            minZoom: 1,
            crs: L.CRS.EPSG900913,
            center: [-27.48483, -58.81393],
            zoom: 18,
            zoomDelta: 0.25,
            zoomSnap: 0,
            resolution: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625, 0.001953125, , 0,00048828125]
      });

      map.zoomControl.setPosition('topright');

      map.fitBounds([
            [-27.45664518742547, -58.763208389282234],
            [-27.504312737195168, -58.87899398803712]
      ]);

      hash = new L.Hash(map);

      map.attributionControl.addAttribution(false);
      map.attributionControl.getContainer().innerHTML = 'Mapa publico - ' + '<a href="https://gis.ciudaddecorrientes.gov.ar" target="_blank">Direccion Gral de SIG</a>';

      measureControl = new L.Control.Measure({
            lang: 'es',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'sqmeters',
            secondaryAreaUnit: 'hectares'
      });

      measureControl.addTo(map);

      L.control.scale({
            maxWidth: 150
      }).addTo(map);

      L.control.locate({ locateOptions: { maxZoom: 17}, position: 'bottomright' }).addTo(map);

      map.on('mousemove', function(event) {
            var a = 'Mapa publico - ' + '<a href="https://gis.ciudaddecorrientes.gov.ar" target="_blank">Direccion Gral de SIG</a> - ';

            map.attributionControl.getContainer().innerHTML = a + 'Coord.: [' + event.latlng.lat + ', ' + event.latlng.lng + ']';

      }, true);

      map.on('click', function(e) {
            if (e.originalEvent.target.id != 'boton-mapillary' && e.originalEvent.target.id != 'boton-google') {
                  let visor = mostrarModal(e); //Esta función esta definida en el archivo modal.js
                  if (visor && visor.vis == 'mapillary') {
                        window.addEventListener("resize", () => visor.resize());
                  }

                  this.invalidateSize(true);
            }
      });

	document.getElementById('boton-imprimir').addEventListener('click', () => {

		let capas = '';
		let tags = '';
        let seleccionados = $('#arbolMCC').jstree('get_selected', true);
		seleccionados.forEach((item, i) => {
			let t = {
				"icon": item.data.jstree.icon,
				"subcategory": item.text,
                "category": item.data.jstree.category,
                "class": (item.data.jstree.class) ? item.data.jstree.class : ''
			}

            if(item.data.id == "recDif_juan_vera") t.icon = "legend/recoleccion-diferenciada.png";
            
            if(i != (seleccionados.length - 1)) tags += (JSON.stringify(t)+',');
            else tags += JSON.stringify(t);
		});

		capasParaImprimir.forEach((item, i) => {
			if (i != (capasParaImprimir.length - 1)) capas += item+', ';
			else capas += item;
		});

		let url = 'http://gis.ciudaddecorrientes.gov.ar/nahuel/idemcc-nuevo/imp/imp.html?centro=-27.47040794866046|-58.837939040812415&zoom=15.72&capas='+capas+'&tags='+'['+tags+']';
		let popup=window.open(url, 'Impresion', 'menubar=0,location=0');
	});



});
