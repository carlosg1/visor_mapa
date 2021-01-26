/**  
 * Este script crea el boton de Google Street View
 * Después le añade un evento click
 * Y por último lo añade como control al mapa 
 * */

var botonGog = document.createElement('img');

$(document).ready(function(){
    botonGog.src = 'images/Street-View-icon.png';
    botonGog.title = 'Google Street View';
    botonGog.id = 'boton-google';
    botonGog.addEventListener('click', function(){
        let btnMapillary = document.getElementById('boton-mapillary'); //boton mapillary
        if (this.classList.contains('googleviewer-activado')) {
            desactivarStreetView();
            this.classList.remove('googleviewer-activado');
            
        }else if(btnMapillary == undefined || btnMapillary == null || !btnMapillary.classList.contains('mapillary-activado')){
            this.classList.add('googleviewer-activado');
            
        }else if(btnMapillary.classList.contains('mapillary-activado')){
            btnMapillary.classList.remove('mapillary-activado');
            desactivarMapillary();
            ocultarZonasDisponibles();
            this.classList.add('googleviewer-activado');
            
        }
    });
    document.getElementById('map').appendChild(botonGog);
});



    


