/* 
 * capas para el visor publico 
 * Fecha Mod.: 16/05/2019
 */

let lyr_man_pluv, lyr_man_sumidero, lyr_red_agua_potable;

$(document).ready(function() {

    // Plan hidrico
    lyr_man_pluv = wmsMcc.getLayer("plan_hidrico:vw_mantenimiento_pluviales");
    lyr_man_sumidero = wmsMcc.getLayer("plan_hidrico:vw_mantenimiento_sumideros");

    // Infraestructura 
    lyr_red_agua_potable = wmsMcc.getLayer("infra:Red de Agua de Potable");
    vw_desagues_pluviales = wmsMcc.getLayer("infra:vw_desagues_pluviales");
    vw_red_desague_cloaca = wmsMcc.getLayer("infra:Red de Desagüe Cloacal");
    vw_alumbrado_publico = wmsMcc.getLayer("infra:vw_alumbrado_publico");
    vw_bocas_de_registro = wmsMcc.getLayer("infra:vw_bocas_de_registro");
    vw_centros_distribuidores_dpec = wmsMcc.getLayer("infra:vw_centros_distribuidores_dpec");

    // obras municipales
    vw_obras_santa_catalina_viviendas = wmsMcc.getLayer("obras_municipales:vw_obras_santa_catalina_viviendas");

    // planeamiento urbano
    vw_distritos_planeamiento_urbano = wmsMcc.getLayer("planeamiento_urbano:vw_distritos_planeamiento_urbano");
    vw_ejido_urbano = wmsMcc.getLayer("planeamiento_urbano:vw_ejido_urbano");
    vw_medianas = wmsMcc.getLayer("planeamiento_urbano:vw_medianas");
    vw_edificios_historicos = wmsMcc.getLayer("planeamiento_urbano:vw_edificios_historicos");

    // Informacion Municipal
    vw_centros_de_pago  = wmsMcc.getLayer("info_municipal:vw_centros_de_pago");
    vw_dependencias_municipales  = wmsMcc.getLayer("info_municipal:vw_dependencias_municipales");
    
    





});
