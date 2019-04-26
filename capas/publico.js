/* capas para el visor publico */
let lyr_man_pluv, lyr_man_sumidero, lyr_red_agua_potable;
$(document).ready(function() {

    // Plan hidrico
    lyr_man_pluv = wmsMcc.getLayer("plan_hidrico:vw_mantenimiento_pluviales");
    lyr_man_sumidero = wmsMcc.getLayer("plan_hidrico:vw_mantenimiento_sumideros");

    // Infraestructura 
    lyr_red_agua_potable = wmsMcc.getLayer("infra:Red de Agua de Potable");
    vw_desagues_pluviales = wmsMcc.getLayer("infra:vw_desagues_pluviales");
});
