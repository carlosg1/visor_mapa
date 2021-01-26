var panorama = null;
let span = document.getElementsByClassName("close")[0];
var currentMarkerMly = null;
var currentMarkerGoogle = null;
var icongog = L.icon({
    iconUrl: 'images/google-map-marker.svg',
    iconAnchor:   [19, 48]
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    desactivarMapillary();
}

function mostrarModal(e) {

    if(currentMarkerMly) map.removeLayer(currentMarkerMly);
    if(currentMarkerGoogle) map.removeLayer(currentMarkerGoogle);

    let mly = null;

    let btnMapillary = document.getElementById('boton-mapillary');

    if (btnMapillary != null && btnMapillary.classList.contains('mapillary-activado')) {
        var div = document.getElementById("mly");
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
        document.getElementById("map").style.height = '50vh';
        document.getElementById('mly-container').style.display = "block";
        mly = new Mapillary.Viewer('mly', 'QjI1NnU0aG5FZFZISE56U3R5aWN4Zzo3NTM1MjI5MmRjODZlMzc0', null, 
        {
            component: {
                cache: true,
                cover: false,
                attribution: true,
                marker: true
            },
            
        });
        
        
        mly.moveCloseTo(e.latlng.lat, e.latlng.lng);

        currentMarkerMly = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

        mly.setCenter([0.5, 0.65]);
        mly.on(Mapillary.Viewer.nodechanged, function(node){
            console.log(node.latLon.lat);
            currentMarkerMly.setLatLng([node.latLon.lat, node.latLon.lon]);
            map.setView([node.latLon.lat, node.latLon.lon]);
            mly.setCenter([0.5, 0.65]);
        })
        mly.vis = 'mapillary';
        return mly;
    }

    let btnGoogle = document.getElementById('boton-google');
    if (btnGoogle != null && btnGoogle.classList.contains('googleviewer-activado')) {
        
        
        document.getElementById("map").style.height = '50vh';
        document.getElementById('pano-container').style.display = 'block';
        var pos = { lat: e.latlng.lat, lng: e.latlng.lng };
        currentMarkerGoogle = L.marker([e.latlng.lat, e.latlng.lng], {icon: icongog}).addTo(map);
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
            position: pos,
            pov: {
                heading: 90,
                pitch: 0
            },
            enableCloseButton: true,
            addressControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            }        
        });

        panorama.addListener('visible_changed', function () {
            map.removeLayer(currentMarkerGoogle);
            document.getElementById("map").style.height = '100vh';
            document.getElementById('pano-container').style.display = "none";
            map.invalidateSize(true);
        });
        panorama.addListener('position_changed', function(e){
            currentMarkerGoogle.setLatLng([panorama.getPosition().lat(), panorama.getPosition().lng()]);
            map.setView([panorama.getPosition().lat(), panorama.getPosition().lng()]);
        });

        panorama.vis = 'streetview';
        return panorama;
    }
}

function desactivarMapillary(){
    document.getElementById('map').style.height = '100vh';
    document.getElementById('mly-container').style.display = 'none';
    map.invalidateSize(true);
    if(currentMarkerMly) map.removeLayer(currentMarkerMly);
}

function desactivarStreetView(){
    if(panorama) panorama.setVisible(false);
    if(currentMarkerGoogle) map.removeLayer(currentMarkerGoogle);
}

function desactivarStreetView(){
    if(panorama) panorama.setVisible(false);
    if(currentMarkerGoogle) map.removeLayer(currentMarkerGoogle);
}


