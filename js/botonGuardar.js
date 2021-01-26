function crearBoton()
{
	if(document.getElementById('btnGuardar')){
		return false;
	}else{
		var btnGuardar = document.createElement('img');
		btnGuardar.id = 'btnGuardar';
		btnGuardar.title = 'Descargar archivo KML';
		btnGuardar.style.width = '36px';
		btnGuardar.src = 'images/kml-download-icon.png';
		btnGuardar.classList.add('botonGuardar');
		btnGuardar.addEventListener('click', () => {
			guardarKML(resultadosKML);
		});
		document.querySelector('body').appendChild(btnGuardar);
	}
}

function borrarBoton()
{
	document.getElementById('btnGuardar').remove();
}

//generarKML acumula los resultados de las busquedas en formato KML utilizando una variable global @resultadosKML
function generarKML(data, quebusca)
{
	if(data[0].type == "Point"){
		resultadosKML += `
			<Placemark>
				<name>${data[0].name}</name>
				<description>${quebusca}</description>
				<styleUrl>#examplePolyStyle</styleUrl>
				<Point>
					<coordinates>${data[0].coordinates[0]},${data[0].coordinates[1]}</coordinates>
				</Point>
			</Placemark>
		`;

	}else if(data[0].type == "LineString"){
		let placemarks = `<Folder>`;
		for (var i = 0; i < data.length; i++) {
			placemarks += `<Placemark>
						<name>${data[i].name}</name>
						<description>${quebusca}</description>
						<styleUrl>#exampleStyle</styleUrl>
						<LineString>
							<coordinates>`;
								for(var j = 0; j < data[i].coordinates.length; j++){
									placemarks += `${data[i].coordinates[j][0]},${data[i].coordinates[j][1]},0 `;
								}
			placemarks += `</coordinates></LineString></Placemark>`
			resultadosKML += placemarks + `</Folder>`;
		}

	}else if(data[0].type == "Polygon"){

		let coords = ``;
		let placemarks = ``;
		for (var f = 0; f < data.length; f++) {
			for (var i = 0; i < data[f].coordinates[0].length; i++) {
				coords += `${data[f].coordinates[0][i][0]},${data[f].coordinates[0][i][1]},0 `;
			}

			placemarks += `
				<Placemark>
					<name>${data[f].name}</name>
					<description>${quebusca}</description>
					<styleUrl>#exampleStyle</styleUrl>
					<Polygon>
					<tessellate>1</tessellate>
					<outerBoundaryIs>
					<LinearRing>
						<coordinates>
							${coords}
						</coordinates>
					</LinearRing>
					</outerBoundaryIs>
					</Polygon>
				</Placemark>
			`;
			coords = ``; //reinicio la variable en cada poligono
		}

		resultadosKML += `<Folder>${placemarks}</Folder>`;
	}
}

//guardarKML ultiliza la libreria filesaver.js para descargar el archivo KML ya generado con la funcion generarKML()
function guardarKML(dataKML)
{
	if(dataKML){
		let kml = `<?xml version="1.0" encoding="UTF-8"?>
				<kml  xmlns="http://www.opengis.net/kml/2.2"
					xmlns:gx="http://www.google.com/kml/ext/2.2"
					xmlns:kml="http://www.opengis.net/kml/2.2"
					xmlns:atom="http://www.w3.org/2005/Atom">
				<Document>
				<Style id="exampleStyle">
				<LineStyle>
					<color>501478e6</color>
					<width>10</width>
					<gx:physicalWidth>12</gx:physicalWidth>
					<gx:outerColor>cc0055ff</gx:outerColor>
					<gx:outerWidth>0.25</gx:outerWidth>
				</LineStyle>
				<PolyStyle>
					<color>e60055ff</color>
					<colorMode>normal</colorMode>
				</PolyStyle>
				</Style>
				<ScreenOverlay> <name>DIRECCIÓN GENERAL DE SIG</name>
				  <Icon>
				    <href>
				      http://gis.ciudaddecorrientes.gov.ar/idemcc/images/Logo_muni_2020.png
				    </href>
				  </Icon>
				  <overlayXY x="0" y="1" xunits="fraction" yunits="fraction"/>
	                    <screenXY x="0" y="1" xunits="fraction" yunits="fraction"/>
	                    <rotation>0</rotation>
	                    <size x="300" y="66" xunits="pixels" yunits="pixels"/>
				</ScreenOverlay>`
				+dataKML+
				`</Document></kml>`;
		let blob = new Blob([kml], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "resultados.kml");
	}
}
