/* 
 * capas para el visor publico 
 * Fecha Mod.: 29/10/2019
 */

let lyr_man_pluv, lyr_man_sumidero, lyr_red_agua_potable;

$(document).ready(function() {

    // Ambiente
    vw_recoleccion_diferenciada = wmsMcc51.getLayer("ambiente:vw_recoleccion_diferenciada");
    vw_puntos_verdes = wmsMcc51.getLayer("ambiente:vw_puntos_verdes");

    // Plan hidrico
    lyr_man_pluv = wmsMcc51.getLayer("plan_hidrico:vw_mantenimiento_pluviales"); // Rehabilitacion de desagues pluviales
    lyr_man_sumidero = wmsMcc51.getLayer("plan_hidrico:vw_mantenimiento_sumideros"); // Rehabilitacion de sumideros

    // Infraestructura 
    lyr_red_agua_potable = wmsMcc51.getLayer("infraestructura:red_agua_potable");
    vw_desagues_pluviales = wmsMcc51.getLayer("infraestructura:vw_desagues_pluviales");
    vw_red_desague_cloaca = wmsMcc51.getLayer("infraestructura:vw_red_de_cloaca");
    vw_alumbrado_publico_led = wmsMcc51.getLayer("infraestructura:vw_alumbrado_publico_led");
    vw_alumbrado_publico = wmsMcc51.getLayer("infraestructura:vw_alumbrado_publico");
    vw_bocas_de_registro = wmsMcc51.getLayer("infraestructura:vw_bocas_de_registro");
    vw_centros_distribuidores_dpec = wmsMcc51.getLayer("infraestructura:vw_centros_distribuidores_dpec");
    vw_puntos_wifi = wmsMcc51.getLayer("infraestructura:vw_puntos_wifi");

    // obras municipales
    vw_cloaca_social = wmsMcc51.getLayer("infraestructura:vw_cloaca_social");
    vw_instal_canio_acceso_domicilio = wmsMcc51.getLayer("obras_municipales:vw_instal_canio_acceso_domicilio");
    vw_intervencion_en_plazas = wmsMcc51.getLayer("obras_municipales:vw_intervencion_en_plazas");
    vw_obras_de_bacheo = wmsMcc51.getLayer("obras_municipales:vw_obras_de_bacheo");
    vw_obras_santa_catalina_viviendas = wmsMcc51.getLayer("obras_municipales:vw_obras_santa_catalina_viviendas");
    vw_instalacion_canios_cruce_calle = wmsMcc51.getLayer("obras_municipales:vw_instalacion_canios_cruce_calle");

    // planeamiento urbano
    vw_distritos_planeamiento_urbano = wmsMcc51.getLayer("planeamiento_urbano:vw_distritos_planeamiento_urbano");
    vw_ejido_urbano = wmsMcc51.getLayer("planeamiento_urbano:vw_ejido_urbano_rural");
    vw_medianas = wmsMcc51.getLayer("planeamiento_urbano:vw_medianas");
    vw_edificios_historicos = wmsMcc51.getLayer("planeamiento_urbano:vw_edificios_historicos");

    // Informacion Municipal
    vw_centros_de_pago  = wmsMcc51.getLayer("informacion_municipal:vw_centros_de_pago");
    // vw_dependencias_municipales  = wmsMcc51.getLayer("informacion_municipal:vw_dependencias_municipales");
    vw_dependencias_municipales  = wmsMcc51.getLayer("informacion_municipal:vw_dependencias_municipales");

    // Estadistica y Censo
    vw_poblacion  = wmsMcc51.getLayer("estadistica_y_censo:vw_poblacion");
    vw_densidad_de_poblacion  = wmsMcc51.getLayer("estadistica_y_censo:vw_densidad_de_poblacion");

    // Desarrollo Social Comunitario
    vw_cic  = wmsMcc51.getLayer("desarrollo_comunitario:vw_cic");
    vw_delegaciones_municipales  = wmsMcc51.getLayer("desarrollo_comunitario:vw_delegaciones_municipales");
    vw_sum  = wmsMcc51.getLayer("desarrollo_comunitario:vw_sum");
    vw_zonas_municipales  = wmsMcc51.getLayer("desarrollo_comunitario:vw_zonas_municipales");

    // Salud
    vw_caps  = wmsMcc51.getLayer("salud:vw_caps");
    vw_saps_municipales  = wmsMcc51.getLayer("salud:vw_saps");
    vw_centros_de_salud  = wmsMcc51.getLayer("salud:vw_centros_de_salud");
    vw_farmacias  = wmsMcc51.getLayer("salud:vw_farmacias");
    vw_hospitales  = wmsMcc51.getLayer("salud:vw_hospitales");
    vw_areas_programaticas_saps  = wmsMcc51.getLayer("salud:vw_areas_programaticas_saps");

    /*
     * Transporte
     */

     // estacionamiento  medido
     vw_estacionamiento_moto = wmsMcc51.getLayer("transporte:vw_estacionamiento_moto");

     // estacionamiento  medido
     vw_estacionamiento_medido = wmsMcc51.getLayer("transporte:vw_estacionamiento_medido");

    // puntos de recarga tarjeta sube
    vw_puntos_de_recarga_sube = wmsMcc51.getLayer("transporte:vw_puntos_recarga_sube");

    // Recorrido total de colectivos
    vw_recorrido_total_colectivos_corrientes = wmsMcc51.getLayer("transporte:vw_recorrido_total_colectivo");

    // estacionamiento privado
    vw_estacionamiento_privado = wmsMcc51.getLayer("transporte:vw_estacionamiento_privado");

    // paradas de colectivos urbanos
    vw_paradas_colectivos = wmsMcc51.getLayer("transporte:vw_paradas_colectivos");

    /***
     * Recorridos por ramal
     */

    // ramal 101 B
    recorrido_ramal_101_B = wmsMcc51.getLayer("transporte:recorrido_ramal_101_B");

    // ramal 101 C
    recorrido_ramal_101_C = wmsMcc51.getLayer("transporte:recorrido_ramal_101_C");

    // ramal 102 A
    recorrido_ramal_102_A = wmsMcc51.getLayer("transporte:recorrido_ramal_102_A");

    // ramal 102 B
    recorrido_ramal_102_B = wmsMcc51.getLayer("transporte:recorrido_ramal_102_B");

    // ramal 102 C
    recorrido_ramal_102_C = wmsMcc51.getLayer("transporte:recorrido_ramal_102_C");

    // ramal 103 A
    recorrido_ramal_103_A = wmsMcc51.getLayer("transporte:recorrido_ramal_103_A");

    // ramal 103 B
    recorrido_ramal_103_B = wmsMcc51.getLayer("transporte:recorrido_ramal_103_B");

    // ramal 103 C - Directo
    recorrido_ramal_103_C_directo = wmsMcc51.getLayer("transporte:recorrido_ramal_103_C_directo");

    // ramal 103 C - Esperanza - Dr. Montaña
    recorrido_ramal_103_C_esperanza_montania = wmsMcc51.getLayer("transporte:recorrido_ramal_103_C_esperanza_montania");

    // ramal 103 D
    recorrido_ramal_103_D = wmsMcc51.getLayer("transporte:recorrido_ramal_103_D");

    // ramal 104 B
    recorrido_ramal_104_A = wmsMcc51.getLayer("transporte:recorrido_ramal_104_A");

    // ramal 104 B
    recorrido_ramal_104_B = wmsMcc51.getLayer("transporte:recorrido_ramal_104_B");

    // ramal 104 C
    recorrido_ramal_104_C = wmsMcc51.getLayer("transporte:recorrido_ramal_104_C");

    // ramal 104 D
    recorrido_ramal_104_D = wmsMcc51.getLayer("transporte:recorrido_ramal_104_D");

    // ramal 105 A
    recorrido_ramal_105_A = wmsMcc51.getLayer("transporte:recorrido_ramal_105_A");

    // ramal 105 B
    recorrido_ramal_105_B = wmsMcc51.getLayer("transporte:recorrido_ramal_105_B");

    // ramal 105 C 250 viv
    recorrido_ramal_105_C_250_viv = wmsMcc51.getLayer("transporte:recorrido_ramal_105_C_250_viv");

    // ramal 105 C perichon
    recorrido_ramal_105_C_perichon = wmsMcc51.getLayer("transporte:recorrido_ramal_105_C_perichon");

    // ramal 106 A
    recorrido_ramal_106_A = wmsMcc51.getLayer("transporte:recorrido_ramal_106_A");

    // ramal 106 B
    recorrido_ramal_106_B = wmsMcc51.getLayer("transporte:recorrido_ramal_106_B");

    // ramal 106 C
    recorrido_ramal_106_C = wmsMcc51.getLayer("transporte:recorrido_ramal_106_C");

    // ramal 106 D
    recorrido_ramal_106_D = wmsMcc51.getLayer("transporte:recorrido_ramal_106_D");

    // ramal 108 AB
    recorrido_ramal_108_AB = wmsMcc51.getLayer("transporte:recorrido_ramal_108_AB");

    // ramal 108 C
    recorrido_ramal_108_C = wmsMcc51.getLayer("transporte:recorrido_ramal_108_C");

    // ramal 109 A Laguna Soto
    recorrido_ramal_109_A_Laguna_Soto = wmsMcc51.getLayer("transporte:recorrido_ramal_109_A_Laguna_Soto");

    // ramal 109 B Yecoha
    recorrido_ramal_109_B_Yecoha = wmsMcc51.getLayer("transporte:recorrido_ramal_109_B_Yecoha");

    // ramal 110 A
    recorrido_ramal_110_A = wmsMcc51.getLayer("transporte:recorrido_ramal_110_A");

    // ramal 110 B
    recorrido_ramal_110_B = wmsMcc51.getLayer("transporte:recorrido_ramal_110_B");

    // ramal 110 B
    recorrido_ramal_110_C_sta_catalina = wmsMcc51.getLayer("transporte:recorrido_ramal_110_C_sta_catalina");

    // paradas chaco / corrientes / barranqueras
    vw_paradas_barranqueras = wmsMcc51.getLayer("transporte:vw_paradas_barranqueras");

    // recorrido chacho / corrientes / barranqueras
    vw_recorrido_barranqueras = wmsMcc51.getLayer("transporte:vw_recorrido_barranqueras");

    // paradas chacho / corrientes / campus
    vw_paradas_campus = wmsMcc51.getLayer("transporte:vw_paradas_campus");

    // recorrido chacho / corrientes / campus
    vw_recorrido_campus = wmsMcc51.getLayer("transporte:vw_recorrido_campus");

    // paradas chacho / corrientes / sarmiento
    vw_paradas_sarmiento = wmsMcc51.getLayer("transporte:vw_paradas_sarmiento");

    // recorrido chacho / corrientes / sarmiento
    vw_recorrido_sarmiento = wmsMcc51.getLayer("transporte:vw_recorrido_sarmiento");

    /**
     * Corredor Vial
     */
    vw_corredor_vial_carga_descarga = wmsMcc51.getLayer("corredor_vial:vw_corredor_vial_carga_descarga");

    vw_corredor_vial_prohibido_estacionar = wmsMcc51.getLayer("corredor_vial:vw_corredor_vial_prohibido_estacionar");

    // Red vial

    vw_alturas_calles  = wmsMcc51.getLayer("red_vial:vw_alturas_calles");

    vw_ide_calle  = wmsMcc51.getLayer("red_vial:vw_ide_calle");

    vw_ide_calle_por_tipo_calzada  = wmsMcc51.getLayer("red_vial:vw_ide_calle_por_tipo_calzada");

    /*
     * Informacion catastral
     */

    vw_asentamiento_renabap  = wmsMcc51.getLayer("informacion_catastral:vw_asentamiento_renabap");

    vw_cordones  = wmsMcc51.getLayer("informacion_catastral:vw_cordones");

    vw_grupo_viviendas_invico  = wmsMcc51.getLayer("informacion_catastral:vw_grupo_vivienda_invico");

    vw_barrios  = wmsMcc51.getLayer("informacion_catastral:vw_barrios_de_la_ciudad");

    vw_ph_parcelas  = wmsMcc51.getLayer("informacion_catastral:vw_ph_parcelas");

    vw_parcelas  = wmsMcc51.getLayer("informacion_catastral:vw_parcelas");

    vw_manzanas  = wmsMcc51.getLayer("informacion_catastral:vw_manzanas_de_la_ciudad");

});
