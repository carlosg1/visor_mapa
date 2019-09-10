/**
 * 
 * Extiendo la clase L.WMS.source
 * Actualizado: 21/08/2019
 * Developer: Lic. Carlos Garcia
 * Contacto: carlosgctes@gmail.com
 * 
 */

function nvl(p) {
  
  if ( p === null ) {

    return '';

  }

  return p;

}

function formatoFecha(f){
  return (f === "" ? "" : (f.substr(8, 2) + '/' + f.substr(5, 2) + '/' + f.substr(0, 4)));
}

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

        // recoleccion diferenciada
        if(queLayer[0] == "vw_recoleccion_diferenciada"){
          datos1 = '<div><h2>Recolecci&oacute;n diferenciada</h2></div>';
          datos1 += '<b>Barrio:</b> ' + datos.features[0].properties['nombre_barrio'];
        }

        // puntos verdes
        if(queLayer[0] == "vw_puntos_verdes"){
          datos1 = '<div><h2>Puntos Verdes</h2></div>';
          datos1 += '<b>Barrio:</b> ' + nvl(datos.features[0].properties['ubicacion']);
        }

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
          datos1 += '<b>Tipo:</b> ' + nvl(datos.features[0].properties['tipo']);
          datos1 += '<BR />' + '<b>Diametro:</b> ' + nvl(datos.features[0].properties['diametro']);
          datos1 += '<BR />' + '<b>Material:</b> ' + nvl(datos.features[0].properties['material']);
        }

        // cloaca social
        if(queLayer[0] == "vw_cloaca_social"){
          datos1 = '<div><h2>Cloaca Social</h2></div>';
          datos1 += '<b>Estado:</b> ' + '<span style="font-family: Arial; font-size: 1rem;">' + nvl(datos.features[0].properties['estado']) + '</span>';
          datos1 += '<BR />' + '<b>Fondo:</b> ' + nvl(datos.features[0].properties['fondo']);
          datos1 += '<BR />' + '<b>Fecha ejecucion:</b> ' + formatoFecha(nvl(datos.features[0].properties['fecha_ejecucion']));
          datos1 += '<div style="width:300px;">' + nvl(datos.features[0].properties['observacion']) + '</div>';
        }

        // Instalacion caños de acceso domiciliario
        if(queLayer[0] == "vw_instal_canio_acceso_domicilio"){
          datos1 = '<div><h2>Caños Acceso Domicilio</h2></div>';
          datos1 += '<b>Fecha inst.:</b> ' + formatoFecha(nvl(datos.features[0].properties['fecha_instalacion']));
          datos1 += '<BR />' + '<b>Diametro:</b> ' + nvl(datos.features[0].properties['diametro']);
        }

        // intervencion en plazas
        if(queLayer[0] == "vw_intervencion_en_plazas"){
          datos1 = '<div><h2>Intervenci&oacute;n en plazas</h2></div>';
          datos1 += '<BR />' + '<b>Intervencion:</b> ' + nvl(datos.features[0].properties['interven']);
        }

        // alumbrado publico
        if(queLayer[0] == "vw_alumbrado_publico_led"){
          datos1 = '<div><h2>Instalaci&oacute;n Luminaria LED</h2></div>';
          datos1 += '<b>Nro. piquete:</b> ' + nvl(datos.features[0].properties['nro_piq']);
          datos1 += '<BR />' + '<b>Nomenclador:</b> ' + nvl(datos.features[0].properties['nomenclador']);
          datos1 += '<div style="width: 300px;">&nbsp</div>';
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
          datos1 += '<div style="width:558px;"><img width="560" height="315" src="images/fotos/casas-santa-catalina.png" border="2" /></div>';

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

        // link Dependencias municipales
        if(queLayer[0] == "vwlnk_dependencias_municipales"){
          datos1 = '<div><h2>Dependencias municipales</h2></div>';
          datos1 += '<span class="prompt1">Instituci&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          // datos1 += '<BR />' + '<span class="prompt1">Tipo:</span> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['domicilio'];
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
        if(queLayer[0] == "vw_puntos_recarga_sube"){
          datos1 = '<div><h2>Puntos de recarga SUBE</h2></div>';
          datos1 += '<b>Terminal:</b> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<b>Direcci&oacute;n:</b> ' + datos.features[0].properties['direccion'];
          datos1 += '<BR />' + '<b>Horario Atenci&oacute;n:</b> ' + datos.features[0].properties['horario_atencion'];
          datos1 += '<BR />' + '<b>T&eacute;lefono:</b> ' + datos.features[0].properties['totem_digital'];
          datos1 += '<BR />' + '<b>Responsable:</b> ' + datos.features[0].properties['estado'];
        }

        // recorrido total colectivos
        if(queLayer[0] == 'vw_recorrido_total_colectivo'){
          datos1 = '<div><span style="float:right";><img style="display: inline;" height="36" alt="Estacionamiento Privado" src="images/icon/recorrido-colectivo.png" /></span><h2>Recorrido todas la l&iacute;neas</h2></div>';
          datos1 += '<b>Linea:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<b>Ramal:</b> ' + datos.features[0].properties['ramal'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Estacionamiento privado
        if(queLayer[0] == 'vw_estacionamiento_privado'){
          datos1 = '<div><span style="float:right";><img style="display: inline;" height="36" alt="Estacionamiento Privado" src="images/icon/estacionamiento-privado.png" /></span><h2>Estacionamiento Privado</h2></div>';
          datos1 += '<b>Calle:</b> ' + datos.features[0].properties['descripcio'];
          datos1 += '<BR />' + '<b>Puerta:</b> ' + datos.features[0].properties['puerta'];
          datos1 += '<BR />' + '<b>Piso:</b> ' + datos.features[0].properties['piso'];
          datos1 += '<BR />' + '<b>Barrio:</b> ' + datos.features[0].properties['barrio'];
        }

        // paradas de colectivo urbano
        if(queLayer[0] == 'vw_paradas_colectivos'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="36" alt="Estacionamiento Privado" src="images/icon/pin-verde-1.png" /></span><h2>Parada Colectivo</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['tipo_recorrido'];
          datos1 += '<BR />' + '<b>Linea / Ramal:</b> ' + datos.features[0].properties['linea_ramal'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        /***
         * Recorridos por ramal
         */

         // recorrido ramal 101 B
         if(queLayer[0] == 'recorrido_ramal_101_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 101 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 101 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

         // recorrido ramal 101 C
         if(queLayer[0] == 'recorrido_ramal_101_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 101 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 101 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

         // recorrido ramal 102 A
        if(queLayer[0] == 'recorrido_ramal_102_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 102 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 102 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 102 B
        if(queLayer[0] == 'recorrido_ramal_102_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 102 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 102 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

         // recorrido ramal 103 A
         if(queLayer[0] == 'recorrido_ramal_103_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 B
        if(queLayer[0] == 'recorrido_ramal_103_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 C Directo
        if(queLayer[0] == 'recorrido_ramal_103_C_directo'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 C Directo" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 C Directo</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 C - Esperanza - Dr. Montaña
        if(queLayer[0] == 'recorrido_ramal_103_C_esperanza_montania'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 C Esperanza - Dr. Montaña" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 C - Esperanza - Dr. Montaña</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 D
        if(queLayer[0] == 'recorrido_ramal_103_D'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 D" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 D</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 A
        if(queLayer[0] == 'recorrido_ramal_104_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 B
        if(queLayer[0] == 'recorrido_ramal_104_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 C
        if(queLayer[0] == 'recorrido_ramal_104_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 D
        if(queLayer[0] == 'recorrido_ramal_104_D'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 D" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 D</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 105 A
        if(queLayer[0] == 'recorrido_ramal_105_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 105 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 105 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 105 B
        if(queLayer[0] == 'recorrido_ramal_105_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 105 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 105 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 105 C 250 viv
        if(queLayer[0] == 'recorrido_ramal_105_C_250_viv'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 105 C 250 Viv." src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 105 C 250 Viv.</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 A
        if(queLayer[0] == 'recorrido_ramal_106_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 B
        if(queLayer[0] == 'recorrido_ramal_106_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 C
        if(queLayer[0] == 'recorrido_ramal_106_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 D
        if(queLayer[0] == 'recorrido_ramal_106_D'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 D" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 D</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 108 AB
        if(queLayer[0] == 'recorrido_ramal_108_AB'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 108 AB" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 108 AB</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 108 C
        if(queLayer[0] == 'recorrido_ramal_108_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 108 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 108 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 109 A laguna soto
        if(queLayer[0] == 'recorrido_ramal_109_A_Laguna_Soto'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 109 A Laguna Soto" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 109 A Laguna Soto</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 109 B yecoha
        if(queLayer[0] == 'recorrido_ramal_109_B_Yecoha'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 109 B Yecoha" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 109 B Yecoha</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 110 A
        if(queLayer[0] == 'recorrido_ramal_110_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 110 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 110 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 110 B
        if(queLayer[0] == 'recorrido_ramal_110_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 110 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 110 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // obras de bacheo
        if(queLayer[0] == 'vw_obras_de_bacheo'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Obras de Bacheo" src="images/icon/bandera_roja.png" /></span><h2>Obras de bacheo</h2></div>';
          datos1 += '<b>Estado:</b> ' + nvl(datos.features[0].properties['avance']);
          datos1 += '<BR />' + '<b>Ubicaci&oacute;n:</b> ' + nvl(datos.features[0].properties['ubicacion']);
          datos1 += '<BR />' + '<b>Descrip.:</b> ' + nvl(datos.features[0].properties['descripcion']);
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 110 C
        if(queLayer[0] == 'recorrido_ramal_110_C_sta_catalina'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 110 C Sta. Catalina" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 110 C Sta. Catalina</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // paradas Barranqueras
        if(queLayer[0] == 'vw_paradas_barranqueras'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Estacionamiento Privado" src="images/icon/pin-parada-colectivo-azul32.png" /></span><h2>Parada Barranqueras</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
          datos1 += '<BR />' + '<b>Ubicaci&oacute;n:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // paradas Campus
        if(queLayer[0] == 'vw_paradas_campus'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Estacionamiento Privado" src="images/icon/pin-parada-colectivo-verde40.png" /></span><h2>Parada Campus</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
          datos1 += '<BR />' + '<b>Ubicaci&oacute;n:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Recorrido barranqueras
        if(queLayer[0] == 'vw_recorrido_barranqueras'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Barranqueras" src="images/icon/ruta.png" /></span><h2>Recorrido Barranqueras</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['direccion'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Recorrido Campus
        if(queLayer[0] == 'vw_recorrido_campus'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Campus" src="images/icon/ruta.png" /></span><h2>Recorrido Campus</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['direccion'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Paradas Sarmiento
        if(queLayer[0] == 'vw_paradas_sarmiento'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Paradas Linea Sarmiento" src="images/icon/parada-colectivo-azul.png" /></span><h2>Paradas L&iacute;nea Sarmiento</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
          datos1 += '<BR />' + '<b>Ubicacion:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Recorrido Sarmiento
        if(queLayer[0] == 'vw_recorrido_sarmiento'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Linea Sarmiento" src="images/icon/recorrido-sarmiento.jpg" /></span><h2>Recorrido L&iacute;nea <br />Sarmiento</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:350px;">&nbsp;</div>';
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

        /*
         * Informacion Catastral
         */
        switch(queLayer[0]) {
          case "vw_asentamiento_renabap":
              datos1 = '<div><h2>Asentamientos Re.Na.Ba.P.</h2></div>';
              datos1 += '<b>Nombre asentamiento:</b>: ' + datos.features[0].properties['nombre_barrio'];
              break;

          case "vw_cordones":
              datos1 = '<div><h2>Cordones</h2></div>';
              datos1 += '<b>Estado:</b>: ' + datos.features[0].properties['estado'];
              break;

          case "vw_grupo_vivienda_invico":
              datos1 = '<div><h2>Cordones</h2></div>';
              datos1 += '<b>Grupo:</b>: ' + datos.features[0].properties['descripcion'];
              break;

          case "vw_barrios_de_la_ciudad":
              datos1 = '<div><h2>Barrios de la Ciudad</h2></div>';
              datos1 += '<b>Nombre barrio:</b>: ' + datos.features[0].properties['nombre_barrio'];
              datos1 += '<BR />' + '<b>Tipo barrio</b>: ' + datos.features[0].properties['tipo_barrio'];
              datos1 += '<BR />' + '<b>Ordenanza</b>: ' + datos.features[0].properties['numero_ordenanza'];
              break;

          case "vw_ph_parcelas":
              datos1 = '<div><h2>PH Parcelas</h2></div>';
              datos1 += '<b>Partida:</b>: ' + datos.features[0].properties['adrema'];
              datos1 += '<BR />' + '<b>Cantidad partidas</b>: ' + datos.features[0].properties['cantidad_adremas'];
              datos1 += '<BR />' + '<b>Mzd - Mzh - letra - lote</b> ';
              datos1 += '<BR />' + datos.features[0].properties['mzd'] + ' - ' + datos.features[0].properties['mzh'] + ' - ' + datos.features[0].properties['letra'] + ' - ' + datos.features[0].properties['lote'];
              break;

          case "vw_parcelas":
              datos1 = '<div><h2>Parcelario Catastral</h2></div>';
              datos1 += '<b>Partida:</b>: ' + datos.features[0].properties['adrema'];
              datos1 += '<BR />' + '<b>Mzd - Mzh - letra - lote - lote Al</b> ';
              datos1 += '<BR />' + (datos.features[0].properties['mzd'] == null ? '' : datos.features[0].properties['mzd']);
              datos1 += ' - ' + (datos.features[0].properties['mzh'] === null ? '' : datos.features[0].properties['mzh']);
              datos1 += ' - ' + (datos.features[0].properties['letra'] == null ? '' : datos.features[0].properties['letra']);
              datos1 += ' - ' + (datos.features[0].properties['lote'] == null ? '' : datos.features[0].properties['lote']);
              datos1 += ' - ' + (datos.features[0].properties['loteal'] == null ? '' : datos.features[0].properties['loteal']);
              datos1 += '<BR />' + '<b>Frente / Fondo:</b> ' + datos.features[0].properties['frente'] + ' / ' + datos.features[0].properties['fondo'];
              datos1 += '<BR />' + '<b>Descripci&oacute;n:</b> ' + datos.features[0].properties['descripcio'];
              datos1 += '<BR />' + '<b>Puerta:</b> ' + datos.features[0].properties['puerta'] + ' - ' + '<b>Piso: </b>' + datos.features[0].properties['piso'] + ' - <b>Depto: </b>' + datos.features[0].properties['dpto'];
              datos1 += '<BR />' + '<b>Bald&iacute;o:</b> ' + datos.features[0].properties['baldio'];
              break;

          case "vw_manzanas_de_la_ciudad":
              datos1 = '<div><h2>Manzanas</h2></div>';
              datos1 += '<b>Manzana:</b>: ' + datos.features[0].properties['nombre_manzana'];
              break;
        }

        
        // verifico si hay datos que mostrar
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
  