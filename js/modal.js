
let span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    document.getElementById('map').style.height = '100vh';
    document.getElementById('mly-container').style.display = 'none';
    map.invalidateSize(true);
    mly.moveCloseTo(null, null);
}

function mostrarModal(e) {

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
                cache: false,
                cover: false,
                attribution: true
            },
        });
        mly.moveCloseTo(e.latlng.lat, e.latlng.lng);
        return mly;
    }

    let btnGoogle = document.getElementById('boton-google');
    if (btnGoogle != null && btnGoogle.classList.contains('googleviewer-activado')) {
        document.getElementById("map-container").style.height = '50vh';
        document.getElementById('pano-container').style.display = 'block';
        var pos = { lat: e.latlng.lat, lng: e.latlng.lng };
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
            position: pos,
            pov: {
                heading: 34,
                pitch: 10
            },
            enableCloseButton: true
        });
        panorama.addListener('visible_changed', function () {
            document.getElementById("map-container").style.height = '100vh';
            document.getElementById('pano-container').style.display = "none";
            map.invalidateSize(true);
        })
        return panorama;
    }
}
