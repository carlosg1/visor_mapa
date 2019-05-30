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

        // infraestructura //
        // red agua potable
        if(queLayer[0] == "red_agua_potable"){
          datos1 = '<div><h2>Red de agua potable</h2></div>';
          datos1 += '<b>Nro. Tramo:</b> ' + datos.features[0].properties['num_tramo'];
          datos1 += '<BR />' + '<b>Tipo:</b> ' + datos.features[0].properties['tipo '];
          datos1 += '<BR />' + '<b>Material:</b> ' + datos.features[0].properties['material'];
          datos1 += '<BR />' + '<b>Diametro:</b> ' + datos.features[0].properties['diametro'];
          datos1 += '<BR />' + '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
        }

        // red desague pluvial
        if(queLayer[0] == "vw_desagues_pluviales"){
          datos1 = '<div><h2>Red de desague pluvial</h2></div>';
          datos1 += '<b>Tipo desague:</b> ' + datos.features[0].properties['tipo_desague'];
          datos1 += '<BR />' + '<b>Sub-tipo:</b> ' + datos.features[0].properties['subtipo'];
          datos1 += '<BR />' + '<b>Tipo seccion:</b> ' + datos.features[0].properties['tipo_seccion'];
          datos1 += '<BR />' + '<b>Dimension:</b> ' + datos.features[0].properties['dimension'];
          datos1 += '<BR />' + '<b>Tapada:</b> ' + datos.features[0].properties['tapada'];
          datos1 += '<BR />' + '<b>Material:</b> ' + datos.features[0].properties['material'];
        }

        // red desague cloacal
        
        if(queLayer[0] == "vw_red_de_cloaca"){
          datos1 = '<div><h2>Red de desague cloacal</h2></div>';
          datos1 += '<b>Tipo:</b> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<b>Diametro:</b> ' + datos.features[0].properties['diametro'];
          datos1 += '<BR />' + '<b>Material:</b> ' + datos.features[0].properties['material'];
        }

        // alumbrado publico
        if(queLayer[0] == "vw_alumbrado_publico"){
          datos1 = '<div><h2>Alumbrado p&uacute;blico</h2></div>';
          datos1 += '<b>Nro. piquete:</b> ' + datos.features[0].properties['nro_piq'];
          datos1 += '<BR />' + '<b>Artefacto:</b> ' + datos.features[0].properties['artefacto'];
          datos1 += '<BR />' + '<b>Lampara:</b> ' + datos.features[0].properties['lampara'];
          datos1 += '<BR />' + '<b>potencia:</b> ' + datos.features[0].properties['potencia'];
          datos1 += '<BR />' + '<b>Encendido:</b> ' + datos.features[0].properties['encendido'];
          datos1 += '<BR />' + '<b>Soporte:</b> ' + datos.features[0].properties['soporte'];
          datos1 += '<BR />' + '<b>Columna:</b> ' + datos.features[0].properties['columna'];
          datos1 += '<BR />' + '<b>Tulipa:</b> ' + datos.features[0].properties['tulipa'];
        }

        // bocas de registro
        if(queLayer[0] == "vw_bocas_de_registro"){
          datos1 = '<div><h2>Bocas de registro</h2></div>';
          datos1 += '<b>No hay datos para mostrar</b> ';
        }

        // centros de distribucioin DPEC
        if(queLayer[0] == "vw_centros_distribuidores_dpec"){
          datos1 = '<div><h2>Centros de distribucion<br />D.P.E.C.</h2></div>';
          datos1 += '<b>No hay datos para mostrar</b> ';
        }

        // Obras municipales //
        // obra santa catalina
        if(queLayer[0] == "vw_obras_santa_catalina_viviendas"){
          datos1 = '<div style="width:558px;"><h2>Obras de vivienda Santa Catalina</h2></div>';
          datos1 += '<div style="width:558px;"><iframe width="560" height="315" src="https://www.youtube.com/embed/OpP-ZZ71zpg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';

          datos1 += '<div style="border-top: 1px solid #7f7f7f; padding-top: 7px; margin-top: 7px; font-family: Roboto; font-size: 11px; color: #7f7f7f">DIR. GRAL. DE S.I.G.</div>';

          this._map.openPopup(datos1, latlng);

          $('.leaflet-popup-content').css('width', 558);
          $('.leaflet-popup').css('left', Number($('.leaflet-popup').css('left').substring(0,4)) - 125 + 'px');

          return false;
        }

        // Planeamiento urbano //

        // Distritos codigo planeamiento urbano
        if(queLayer[0] == "vw_distritos_planeamiento_urbano"){
          datos1 = '<div><h2>Distritos del C&oacute;digo de Planeamiento Urbano</h2></div>';
          datos1 += '<b>Distrito:</b> ' + datos.features[0].properties['distrito'];
          datos1 += '<BR />' + '<b>F.O.S.:</b> ' + datos.features[0].properties['fos'];
          datos1 += '<BR />' + '<b>F.O.T.:</b> ' + datos.features[0].properties['fot'];
          datos1 += '<BR />' + '<b>Altura m&aacute;xima:</b> ' + datos.features[0].properties['altura_maxima'];
          datos1 += '<BR />' + '<b>Altura basamento:</b> ' + datos.features[0].properties['altura_basamento'];
          datos1 += '<BR />' + '<b>Semiperimetro:</b> ' + datos.features[0].properties['semiperimetro'];
          datos1 += '<BR />' + '<b>Perimetro libre:</b> ' + datos.features[0].properties['perimetro_libre'];
          datos1 += '<BR />' + '<b>Perimetro libre:</b> ' + datos.features[0].properties['altura_entre_medianera'];

          if(datos.features[0].properties['pdf_distrito_part'] != null) {
            datos1 += '<BR />';
            datos1 += '<BR />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gov.ar/idemcc/images/distritos2017/' + datos.features[0].properties['pdf_distrito_part'] + '">Ver la documentaci&oacute;n del distrito ' + datos.features[0].properties['distrito'] + '</a>';
          }

          datos1 += '<BR />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/distritos2017/Planilla4.pdf">Planilla de referencia</a>';
          
          datos1 += '<BR />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/distritos2017/CodigoPlaneamientoUrbano31-10-17.pdf">C&oacute;digo de Planiamiento Urbano</a>';
          
        }

        // ejido urbano
        if(queLayer[0] == "vw_ejido_urbano"){
          datos1 = '<div><h2>Ejido Urbano Ciudad de Corrientes</h2></div>';
          datos1 += '<b>No hay datos para mostrar</b> ';
        }

        // Medianas
        if(queLayer[0] == "vw_medianas"){
          datos1 = '<div><h2>Medianas de la Ciudad</h2></div>';
          datos1 += '<b>Manzana par:</b> ' + datos.features[0].properties['manzana_par'];
          datos1 += '<BR />' + '<b>Manzana impar:</b> ' + datos.features[0].properties['manzana_impar'];
          datos1 += '<BR />' + '<b>Mediana par:</b> ' + datos.features[0].properties['mediana_par'];
          datos1 += '<BR />' + '<b>Mediana impar:</b> ' + datos.features[0].properties['mediana_impar'];

          // Medianas - mediana par
          if (datos.features[0].properties['pdf_mediana_par'] != null) {
            datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/medianas/' + datos.features[0].properties['pdf_mediana_par'] + '.pdf">pdf mediana par: ' + datos.features[0].properties['pdf_mediana_par'] + '.pdf</a>';
          }

          // Medianas - mediana impar
          if (datos.features[0].properties['pdf_mediana_impar'] != null) {
            datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/medianas/' + datos.features[0].properties['pdf_mediana_impar'] + '.pdf">pdf mediana impar: ' + datos.features[0].properties['pdf_mediana_impar'] + '.pdf</a>';
          }
        }

        // Edificios del casco historico 
        if(queLayer[0] == "vw_edificios_historicos"){
          datos1 = '<div><h2>Edificios del Casco Hist&oacute;rico</h2></div>';
          datos1 += '<span class="prompt1">Adrema:</span> ' + datos.features[0].properties['adrema'];
          datos1 += '<BR />' + '<span class="prompt1">Manzana:</span> ' + datos.features[0].properties['mzd'];
          datos1 += '<BR />' + '<span class="prompt1">Lote:</span> ' + datos.features[0].properties['lote'];
          datos1 += '<BR />' + '<span class="prompt1">Calle:</span> ' + datos.features[0].properties['calle'];
          datos1 += '<BR />' + '<span class="prompt1">Altura:</span> ' + datos.features[0].properties['altura'];
          datos1 += '<BR />';
          datos1 += '<BR />' + '<span class="titulo1">Informaci&oacute;n relacionada</span>';
          datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/catalogo_edificios_historicos/' + datos.features[0].properties['catalogo'] + '.pdf">pdf ' + datos.features[0].properties['catalogo'] + '</a>';
          
          if (datos.features[0].properties['foto_num'] != null) {
            datos1 += '<div style="width:300px;height:164px;border: #666 solid 2px;"><img border="0" width="300" height="164" src="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/fotos_edificios_historicos/' + datos.features[0].properties['foto_num'] + ' .png" /></div>';
          }
        }

        /*
         * Informacion municipal
         */

        // centros de pago
        if(queLayer[0] == "vw_centros_de_pago"){
          datos1 = '<div><h2>Centros de pago</h2></div>';
          datos1 += '<span class="prompt1">Instituci&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<span class="prompt1">Delegado:</span> ' + datos.features[0].properties['delegado'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Dependencias municipales
        if(queLayer[0] == "vw_dependencias_municipales"){
          datos1 = '<div><h2>Dependencias municipales</h2></div>';
          datos1 += '<span class="prompt1">Instituci&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<span class="prompt1">Tipo:</span> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        /*
         * Estadistica y censo
         */
        // Poblacion
        if(queLayer[0] == "vw_poblacion"){
          datos1 = '<div><h2>Densidad de Poblaci&oacute;n</h2></div>';
          datos1 += '<span class="prompt1">Var&oacute;n:</span> ' + datos.features[0].properties['varon'];
          datos1 += '<BR />' + '<span class="prompt1">Mujer:</span> ' + datos.features[0].properties['mujer'];
          datos1 += '<BR />' + '<span class="prompt1">Total poblac.:</span> ' + datos.features[0].properties['total_poblacion'];
          datos1 += '<BR />' + '<span class="prompt1">Hogares:</span> ' + datos.features[0].properties['hogares'];
          datos1 += '<BR />' + '<span class="prompt1">Viviendas partic.:</span> ' + datos.features[0].properties['viviendas_particulares'];
        }

        // densidad de poblacion
        if(queLayer[0] == "vw_densidad_de_poblacion"){
          datos1 = '<div><h2>Poblaci&oacute;n</h2></div>';
          datos1 += '<span class="prompt1">Var&oacute;n:</span> ' + datos.features[0].properties['varon'];
          datos1 += '<BR />' + '<span class="prompt1">Mujer:</span> ' + datos.features[0].properties['mujer'];
          datos1 += '<BR />' + '<span class="prompt1">Total poblac.:</span> ' + datos.features[0].properties['total_poblacion'];
          datos1 += '<BR />' + '<span class="prompt1">Hogares:</span> ' + datos.features[0].properties['hogares'];
          datos1 += '<BR />' + '<span class="prompt1">Viviendas partic.:</span> ' + datos.features[0].properties['viviendas_particulares'];
          datos1 += '<BR />' + '<span class="prompt1">Superficie:</span> ' + datos.features[0].properties['superficie'];
          datos1 += '<BR />' + '<span class="prompt1">Densidad poblaci&oacute;n:</span> ' + datos.features[0].properties['densidad_poblacion'];
        }

        /*
         * Desarrollo social comunitario 
         */

        // centros de integracion comunitario
        if(queLayer[0] == "vw_cic"){
          datos1 = '<div><h2>Centro de Integraci&oacute;n Comunitario</h2></div>';
          datos1 += '<span class="prompt1">Nombre:</span> ' + datos.features[0].properties['cic'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Delegaciones municipales
        if(queLayer[0] == "vw_delegaciones_municipales"){
          datos1 = '<div><h2>Delegaci&oacute;n Municipal</h2></div>';
          datos1 += '<span class="prompt1">Zona:</span> ' + datos.features[0].properties['numero_zona'];
          datos1 += '<BR />' + '<span class="prompt1">Delegaci&oacuten:</span> ' + datos.features[0].properties['nombre_delegacion'];
          datos1 += '<BR />' + '<span class="prompt1">Delegado:</span> ' + datos.features[0].properties['delegados'];
        }

        // Salon de usos multiples
        if(queLayer[0] == "vw_sum"){
          datos1 = '<div><h2>Sal&oacute;n de uso m&uacute;ltiple</h2></div>';
          datos1 += '<span class="prompt1">S.U.M.:</span> ' + datos.features[0].properties['sum'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // zonas municipales
        if(queLayer[0] == "vw_zonas_municipales"){
          datos1 = '<div><h2>Zonas municipales</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['delegacion'];
          datos1 += '<BR />' + '<span class="prompt1">Delegado:</span> ' + datos.features[0].properties['delegado'];
          datos1 += '<BR />' + '<span class="prompt1">Tel&eacute;fono:</span> ' + datos.features[0].properties['teléfono'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        /*
         * Salud 
         */

         // caps
         if(queLayer[0] == "vw_caps"){
          datos1 = '<div><h2>C.A.P.S.</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // saps
        if(queLayer[0] == "vw_saps_municipales"){
          datos1 = '<div><h2>S.A.P.S.</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Centros de salud
        if(queLayer[0] == "vw_centros_de_salud"){
          datos1 = '<div><h2>Centros de Salud</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // farmacias
        if(queLayer[0] == "vw_farmacias"){
          datos1 = '<div><h2>Farmacias</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // hospitales
        if(queLayer[0] == "vw_hospitales"){
          datos1 = '<div><h2>Hospitales</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Tipo:</span> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Areas programaticas salud
        if(queLayer[0] == "vw_areas_program&aacute;ticas_saps"){
          datos1 = '<div><h2>Areas programaticas Salud</h2></div>';
          datos1 += '<span class="prompt1">Zona:</span> ' + datos.features[0].properties['zona'];
          datos1 += '<BR /><BR />';
        }

        /*
         * Transporte
         */

        // falta cargar puntos recarga sube
        if(queLayer[0] == "vw_puntos_de_recarga_sube"){
          datos1 = '<div><h2>Puntos de recarga SUBE</h2></div>';
          datos1 += '<b>Terminal:</b> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<b>Direcci&oacute;n:</b> ' + datos.features[0].properties['direccion'];
        }

        // recorrido total colectivos
        if(queLayer[0].substring(0,9) == 'recorrido'){
          datos1 = '<div><h2>Recorrido ' + datos.features[0].properties['linea_ramal'] + '</h2></div>';
          datos1 += '<b>Nombre:</b> ' + datos.features[0].properties['recorrido'];
          datos1 += '<BR />' + '<b>Sentido:</b> ' + datos.features[0].properties['tipo_recorrido'];
        }
    
        /*
         * Red vial
         */

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

        if (datos1 != undefined) {

          datos1 += '<div style="border-top: 1px solid #7f7f7f; padding-top: 7px; margin-top: 7px; font-family: Roboto; font-size: 11px; color: #7f7f7f">DIR. GRAL. DE S.I.G.</div>';

          this._map.openPopup(datos1, latlng);

        } else {

          console.log('mostrar-infowindow.js - ', 'falta infowindow() para la capa: ', queLayer[0])

          // alert('Atributos desactivados para la capa ' + queLayer[0]);

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
  