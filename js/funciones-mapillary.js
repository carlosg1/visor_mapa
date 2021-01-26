/**  
 * Este script crea el boton de Mapillary
 * Después le añade un evento click
 * Y por último lo añade como control al mapa 
 * */

let botonMly = document.createElement('img');
let lyrZonaDisponible = undefined;

function mostrarZonasDisponibles(){

    var options = {
        attribution: true,
        interactive: true,
        maxNativeZoom: 14,
        vectorTileLayerStyles: {
          "mapillary-images": {
            radius: 1,
            weight: 1,
            color: "#39AF64"
            },
          "mapillary-sequences": {
              weight: 1,
              color: "#AF3964",
          }
        }
      }

      lyrZonaDisponible = new L.vectorGrid.protobuf("https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt", options)
      .on('mouseover', function(e){
        var url = "https://images.mapillary.com/" + e.layer.properties.key  + "/thumb-320.jpg"; e.layer.properties.ikey
        L.popup()
          .setContent("<img src='" + url + "' width='160'/>")
		  .setLatLng(e.latlng)
		  .openOn(map);
      })
      .addTo(map);

    return;
}

function ocultarZonasDisponibles(){
    map.removeLayer(lyrZonaDisponible);
}

$(document).ready(function(){
    botonMly.src = 'images/mapillary-icon-circle.png';
    botonMly.title = 'Visor mapillary';
    botonMly.id = 'boton-mapillary';

    botonMly.addEventListener('click', function(){
        
        let btngog = document.getElementById('boton-google'); //boton google street view

        if (this.classList.contains('mapillary-activado')) {
            this.classList.remove('mapillary-activado');
            desactivarMapillary();
            ocultarZonasDisponibles();
            map.removeLayer(lyrZonaDisponible);
            
        }else if(btngog == undefined || btngog == null || !btngog.classList.contains('googleviewer-activado')){
            this.classList.add('mapillary-activado');
            desactivarStreetView();
            mostrarZonasDisponibles();

        }else if(btngog.classList.contains('googleviewer-activado')){
            btngog.classList.remove('googleviewer-activado');
            desactivarStreetView();
            this.classList.add('mapillary-activado');
            mostrarZonasDisponibles();
        }
    });
    document.getElementById('map').appendChild(botonMly);
});