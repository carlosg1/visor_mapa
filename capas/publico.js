/* 
 * capas para el visor publico 
 * Fecha Mod.: 16/05/2019
 */

let lyr_man_pluv, lyr_man_sumidero, lyr_red_agua_potable;

$(document).ready(function() {

    // Plan hidrico
    lyr_man_pluv = wmsMcc51.getLayer("plan_hidrico:vw_mantenimiento_pluviales"); // Rehabilitacion de desagues pluviales
    lyr_man_sumidero = wmsMcc51.getLayer("plan_hidrico:vw_mantenimiento_sumideros"); // Rehabilitacion de sumideros

    // Infraestructura 
    lyr_red_agua_potable = wmsMcc51.getLayer("infraestructura:red_agua_potable");
    vw_desagues_pluviales = wmsMcc51.getLayer("infraestructura:vw_desagues_pluviales");
    vw_red_desague_cloaca = wmsMcc51.getLayer("infraestructura:vw_red_de_cloaca");
    vw_alumbrado_publico = wmsMcc51.getLayer("infraestructura:vw_alumbrado_publico");
    vw_bocas_de_registro = wmsMcc51.getLayer("infraestructura:vw_bocas_de_registro");
    vw_centros_distribuidores_dpec = wmsMcc51.getLayer("infraestructura:vw_centros_distribuidores_dpec");

    // obras municipales
    vw_obras_santa_catalina_viviendas = wmsMcc51.getLayer("santa_catalina:vw_obras_santa_catalina_viviendas");

    // planeamiento urbano
    vw_distritos_planeamiento_urbano = wmsMcc.getLayer("planeamiento_urbano:vw_distritos_planeamiento_urbano");
    vw_ejido_urbano = wmsMcc.getLayer("planeamiento_urbano:vw_ejido_urbano");
    vw_medianas = wmsMcc.getLayer("planeamiento_urbano:vw_medianas");
    vw_edificios_historicos = wmsMcc.getLayer("planeamiento_urbano:vw_edificios_historicos");

    // Informacion Municipal
    vw_centros_de_pago  = wmsMcc.getLayer("info_municipal:vw_centros_de_pago");
    vw_dependencias_municipales  = wmsMcc.getLayer("info_municipal:vw_dependencias_municipales");

    // Estadistica y Censo
    vw_poblacion  = wmsMcc.getLayer("estadistica_y_censo:vw_poblacion");
    vw_densidad_de_poblacion  = wmsMcc.getLayer("estadistica_y_censo:vw_densidad_de_poblacion");

    // Desarrollo Social Comunitario
    vw_cic  = wmsMcc.getLayer("desarrollo_comunitario:vw_cic");
    vw_delegaciones_municipales  = wmsMcc.getLayer("desarrollo_comunitario:vw_delegaciones_municipales");
    vw_sum  = wmsMcc.getLayer("desarrollo_comunitario:vw_sum");
    vw_zonas_municipales  = wmsMcc.getLayer("desarrollo_comunitario:vw_zonas_municipales");

    // Salud
    vw_caps  = wmsMcc.getLayer("salud:vw_caps");
    vw_saps_municipales  = wmsMcc.getLayer("salud:vw_saps_municipales");
    vw_centros_de_salud  = wmsMcc.getLayer("salud:vw_centros_de_salud");
    vw_farmacias  = wmsMcc.getLayer("salud:vw_farmacias");
    vw_hospitales  = wmsMcc.getLayer("salud:vw_hospitales");
    vw_areas_programaticas_saps  = wmsMcc.getLayer("salud:vw_areas_programaticas_saps");

    /*
     * Transporte
     */

    vw_puntos_de_recarga_sube = wmsMcc.getLayer("transporte:vw_puntos_de_recarga_sube");
    //
    vw_recorrido_total_colectivos_corrientes = wmsMcc.getLayer("transporte:vw_recorrido_total_colectivos_corrientes");
    //
    vw_estacionamiento_privado = wmsMcc.getLayer("transporte:vw_estacionamiento_privado");
    // paradas de colectivos urbanos
    vw_paradas_colectivos = wmsMcc.getLayer("transporte:vw_paradas_colectivos");
    // paradas chaco / corrientes / barranqueras
    vw_paradas_barranqueras = wmsMcc.getLayer("transporte:vw_paradas_barranqueras");
    // recorrido chacho / corrientes / barranqueras
    vw_recorrido_barranqueras = wmsMcc.getLayer("transporte:vw_recorrido_barranqueras");
    // paradas chacho / corrientes / campus
    vw_paradas_campus = wmsMcc.getLayer("transporte:vw_paradas_campus");
    // recorrido chacho / corrientes / campus
    vw_recorrido_campus = wmsMcc.getLayer("transporte:vw_recorrido_campus");
    // paradas chacho / corrientes / sarmiento
    vw_paradas_sarmiento = wmsMcc.getLayer("transporte:vw_paradas_sarmiento");
    // recorrido chacho / corrientes / sarmiento
    vw_recorrido_sarmiento = wmsMcc.getLayer("transporte:vw_recorrido_sarmiento");

    /*
     * Transporte -> Recorrido por ramal 
     */

    // Red vial
    vw_ide_calle  = wmsMcc.getLayer("w_red_vial:vw_ide_calle");
    vw_ide_calle_por_tipo_calzada  = wmsMcc.getLayer("w_red_vial:vw_ide_calle_por_tipo_calzada");

    // Informacion catastral
    vw_asentamiento_renabap  = wmsMcc.getLayer("infoCatastral:vw_asentamiento_renabap");
    vw_cordones  = wmsMcc.getLayer("infoCatastral:vw_cordones");
    vw_grupo_viviendas_invico  = wmsMcc.getLayer("infoCatastral:vw_asentamiento_renabap");
    vw_parcelas  = wmsMcc.getLayer("infoCatastral:vw_parcelas");
    vw_ph_parcelas  = wmsMcc.getLayer("infoCatastral:vw_ph_parcelas");
    vw_barrios  = wmsMcc.getLayer("infoCatastral:vw_barrios");
    vw_manzanas  = wmsMcc.getLayer("infoCatastral:vw_manzanas");

});
