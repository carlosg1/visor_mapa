/*
 * Extiendo la clase L.WMS.source
 */

var wms_GIS = L.WMS.Source.extend({

    'showFeatureInfo': function(latlng, info) {
        if (!this._map){
            return;
        }

        if ( info == '' ) return false;

        var datos1 = undefined;
  
        var datos = JSON.parse(info);

        /* que layer */
        var queLayer = datos.features[0].id.split('.');

        // plan hidrico
        if(queLayer[0] == "vw_mantenimiento_pluviales"){
          datos1 = '<div><h2>Restitucion de desagues pluviales</h2></div>';
          datos1 += '<b>Tipo desague:</b> ' + datos.features[0].properties['tipo_desague'];
          datos1 += '<BR />' + '<b>Sub Tipo:</b> ' + datos.features[0].properties['subtipo'];
          datos1 += '<BR />' + '<b>Cuenca:</b> ' + datos.features[0].properties['cuenca'];
          datos1 += '<BR />' + '<b>Restituido?:</b> ' + datos.features[0].properties['limpio'];
          datos1 += '<BR />' + '<b>Fecha Restitucion:</b> ';
          if (datos.features[0].properties['fecha_mantenim'] != null) datos1 += datos.features[0].properties['fecha_mantenim'].substring(0,10);
        }

        if(queLayer[0] == "vw_mantenimiento_sumideros"){
          datos1 = '<div><h2>Restitucion de sumideros</h2></div>';
          datos1 += '<b>Tipo sumidero:</b> ' + datos.features[0].properties['tipo_sumidero'];
          datos1 += '<BR />' + '<b>Clase de  sumidero:</b> ' + datos.features[0].properties['clase_de_sumideros'];
          datos1 += '<BR />' + '<b>Restituido?:</b> ' + datos.features[0].properties['limpio'];
          datos1 += '<BR />' + '<b>Fecha Restitucion:</b> ';
          if (datos.features[0].properties['fecha_mantenim'] != null) datos1 += datos.features[0].properties['fecha_mantenim'].substring(0,10);
        }

        // infraestructura 
        if(queLayer[0] == "vw_desagues_pluviales"){
          datos1 = '<div><h2>Red de desague pluvial</h2></div>';
          datos1 += '<b>Tipo desague:</b> ' + datos.features[0].properties['tipo_desague'];
          datos1 += '<BR />' + '<b>Sub-tipo:</b> ' + datos.features[0].properties['subtipo'];
          datos1 += '<BR />' + '<b>Tipo seccion:</b> ' + datos.features[0].properties['tipo_seccion'];
          datos1 += '<BR />' + '<b>Dimension:</b> ' + datos.features[0].properties['dimension'];
          datos1 += '<BR />' + '<b>Tapada:</b> ' + datos.features[0].properties['tapada'];
          datos1 += '<BR />' + '<b>Material:</b> ' + datos.features[0].properties['material'];
        }

        if(queLayer[0] == "vw_alumbrado_publico"){
          datos1 = '<div><h2>Alumbrado p&uacute;blico</h2></div>';
          datos1 += '<b>Nro. piquete:</b> ' + datos.features[0].properties['nro_pic'];
          datos1 += '<BR />' + '<b>Artefacto:</b> ' + datos.features[0].properties['artefacto'];
          datos1 += '<BR />' + '<b>Lampara:</b> ' + datos.features[0].properties['lampara'];
          datos1 += '<BR />' + '<b>potencia:</b> ' + datos.features[0].properties['potencia'];
          datos1 += '<BR />' + '<b>Encendido:</b> ' + datos.features[0].properties['encendido'];
          datos1 += '<BR />' + '<b>Soporte:</b> ' + datos.features[0].properties['soporte'];
          datos1 += '<BR />' + '<b>Columna:</b> ' + datos.features[0].properties['columna'];
          datos1 += '<BR />' + '<b>Tulipa:</b> ' + datos.features[0].properties['tulipa'];
        }
       
        // Red vial
        if(queLayer[0] == "vw_ide_calle"){
          datos1 = '<div><h2>Calles de la Ciudad</h2></div>';
          datos1 += '<b>Nombre:</b> ' + datos.features[0].properties['NAM'];
          datos1 += '<BR />' + '<b>Tipo:</b> ' + datos.features[0].properties['GNA'];
          datos1 += '<BR />' + '<b>Calzada:</b> ' + datos.features[0].properties['RST_SUBCLA'];
          datos1 += '<BR />' + '<b>Limite barrio:</b> ' + datos.features[0].properties['LIMITE'];
        }

        if(queLayer[0] == "vw_ide_calle_por_tipo_calzada"){
          datos1 = '<div><h2>Calles por tipo de calzada</h2></div>';
          datos1 += '<b>Nombre:</b> ' + datos.features[0].properties['NAM'];
          datos1 += '<BR />' + '<b>Tipo:</b> ' + datos.features[0].properties['GNA'];
          datos1 += '<BR />' + '<b>Calzada:</b> ' + datos.features[0].properties['RST_SUBCLA'];
          datos1 += '<BR />' + '<b>Limite barrio:</b> ' + datos.features[0].properties['LIMITE'];
        }

        // Informacion catastral
        if(queLayer[0] == "vw_barrios"){
          datos1 = '<div><h2>BARRIOS</h2></div>';
          datos1 += '<b>Barrio</b>: ' + datos.features[0].properties['NAM'];
          datos1 += '<BR />' + '<b>Tipo</b>: ' + datos.features[0].properties['GNA'];
          datos1 += '<BR />' + '<b>Ord.</b>: ' + datos.features[0].properties['NRO_ORDENA'];
        }

        if(queLayer[0] == "vw_parcelas"){
          datos1 = '<div><h2>Parcelario</h2></div>';
          datos1 += '<b>Adrema</b>: ' + datos.features[0].properties['ADREMA'];
          datos1 += '<BR />' + '<b>MZ - LETRA - LOTE - LORE AL</b>';
          datos1 += '<BR />' + datos.features[0].properties['MZD'] + ' - ' + datos.features[0].properties['LETRA'] + ' - ' + datos.features[0].properties['LOTE'] + ' - ' + datos.features[0].properties['LOTEAL'];
          datos1 += '<BR />' + '<b>Frente</b>: ' + datos.features[0].properties['FRENTE'];
          datos1 += '<BR />' + '<b>Fondo</b>: ' + datos.features[0].properties['FONDO'];
        }

        if(queLayer[0] == "vw_manzanas"){
          datos1 = '<div><h2>Manzana</h2></div>';
          datos1 += '<b>Nro. Manzana</b>: ' + datos.features[0].properties['CCA'];
        }

        if(queLayer[0] == "vw_asentamiento_renabap"){
          datos1 = '<div><h2>Asentamientos Re.Na.Ba.P.</h2></div>';
          datos1 += '<b>Nro. Manzana</b>: ' + datos.features[0].properties['nombre_barrio'];
        }





/*
        if(datos.features[0].properties['ultima_fecha_reconstruccion'] != undefined){
            var datos1 = '<div style="width:360px; color: #ecb85b;"><h5>RECONSTRUCCION DE CALZADA</h5></div>';
            datos1 += '<B>Ultima Fecha Reconstruccion:</B> ' + datos.features[0].properties['ultima_fecha_reconstruccion'].substring(0,10) + '<br>';
            datos1 += '<B>Nro de Intervenciones:</B> ' + datos.features[0].properties['nro_intervenciones'] + '<br>';
        }

        if(datos.features[0].properties['ultima_fecha_perfilado'] != undefined){
            var datos1 = '<div style="width:300px; color: #5cc7f9;"><h5>PERFILADO DE CALLE</h5></div>';
            datos1 += '<B>Ultima Fecha Perfilado:</B> ' + datos.features[0].properties['ultima_fecha_perfilado'].substring(0,10) + '<br>';
            datos1 += '<B>Nro de Intervenciones:</B> ' + datos.features[0].properties['nro_intervenciones'] + '<br>';
        }

        if(datos.features[0].properties['ultima_fecha_cuneteo'] != undefined){
            var datos1 = '<div style="width:300px; color: #c3dd6d;"><h5>LIMPIEZA DE CUNETA</h5></div>';
            datos1 += '<B>Ultima Fecha Perfilado:</B> ' + datos.features[0].properties['ultima_fecha_perfilado'] + '<br>';
            datos1 += '<B>Nro de Intervenciones:</B> ' + datos.features[0].properties['nro_intervenciones'] + '<br>';
            datos1 += '<br />';
        }
*/
        if (datos1 != undefined) {

          datos1 += '<div style="border-top: 1px solid #7f7f7f; padding-top: 7px; margin-top: 7px; font-family: Roboto; font-size: 11px; color: #7f7f7f">DIR. GRAL. DE S.I.G.</div>';

          this._map.openPopup(datos1, latlng);

        } else {

          alert('Atributos desactivaos para la capa ' + queLayer[0]);

        }
    } /* ,
  
    'ajax': function(url, callback) {
        ajax.call(this, 'curl.php?url='+url, callback);
    }
  */
  
  })
  
  function leerAjax(url, callback) {
    var context = this,
        request = new XMLHttpRequest();
    request.onreadystatechange = change;
    request.open('GET', 'curl.php?url=' + url);
    request.send();
  
    function change() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          callback.call(context, request.responseText);
        } else {
          callback.call(context, "error");
        }
      }
    }
  };
  