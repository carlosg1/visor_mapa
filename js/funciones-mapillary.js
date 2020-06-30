/**  
 * Este script crea el boton de Mapillary
 * Después le añade un evento click
 * Y por último lo añade como control al mapa 
 * */

var botonMly = document.createElement('img');

$(document).ready(function(){
    botonMly.src = 'images/mapillary-icon.png';
    botonMly.title = 'Visor mapillary';
    botonMly.id = 'boton-mapillary';

    botonMly.addEventListener('click', function(){
        let btngog = document.getElementById('boton-google'); //boton google street view
        if (this.classList.contains('mapillary-activado')) {
            this.classList.remove('mapillary-activado');
            
        }else if(btngog == undefined || btngog == null || !btngog.classList.contains('googleviewer-activado')){
            this.classList.add('mapillary-activado');

        }else if(btngog.classList.contains('googleviewer-activado')){
            btngog.classList.remove('googleviewer-activado');
            this.classList.add('mapillary-activado');
            
        }
    });
    document.getElementById('map').appendChild(botonMly);
});