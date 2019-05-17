<?php 
/*
 *
 * Dev.: Lic Carlos Garcia - carlosgctes@gmail.com 
 * Uso: para agregar una capa a la rama de informacion publica 
 * agregar una entrada <li> al archivo publico.php
 * 
 * 
 */
?>

<!-- VISOR PUBLICO --> 

<ul>
    <li id="arbolCapasMcc" data-jstree='{"opened": true, "icon": false}'>
        <b>Informacion Geogr&aacute;fica</b>
        <ul>
            <li id="planHidrico" data-jstree='{"icon": false}'>Plan h&iacute;drico
                <ul>
                    <li id="rehabilitacionDesaguesPluviales" data-jstree='{"icon":"images/polilinea_gral_1.png"}'>
                        Rehabilitacion de desagues pluviales
                        <ul>
                            <li id="desagueLimpio" data-jstree='{"icon": "images/icon/lazul.png"}'>Limpio</li>
                            <li id="desaguePendiente" data-jstree='{"icon": "images/icon/lrojo.png"}'>Pendiente</li>
                        </ul>
                    </li>
                    <li id="rehabilitacionSumideros" data-jstree='{"icon": "images/puntos_gral.png"}'>
                        Rehabilitaci&oacute;n de Sumideros
                        <ul>
                            <li id="sumideroLimpio" data-jstree='{"icon": "images/icon/sumidero_limpio.png"}'>Limpio</li>
                            <li id="sumideroPendiente" data-jstree='{"icon": "images/icon/sumidero_pendiente.png"}'>Pendiente</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        <ul>
            <li id="infraestructura" data-jstree='{"icon": false}'>Infraestructura
                <ul>
                    <li id="redAguaPotable" data-jstree='{"icon": "images/icon/red_agua_potable.png"}'>Red de agua potable</li>
                    <li id="vw_desagues_pluviales" data-jstree='{"icon": "images/icon/desague_pluvial.png"}'>Red de desague pluvial</li>
                    <li id="red_desague_cloacal">Red de desague cloacal</li>
                    <li id="vw_alumbrado_publico">Alumbrado p&uacute;blico</li>
                    <li id="vw_bocas_de_registro">Bocas de registro</li>
                    <li id="vw_centros_distribuidores_dpec">Centros de distribucion DPEC</li>                    
                </ul>
            </li>
            <li id="obrasMunicipales" data-jstree='{"icon": false}'>Obras Municipales
                <ul>
                    <li id="vw_obras_santa_catalina_viviendas">Obra Santa Catalina</li>
                </ul>
            </li>
            <li id="planeamientoUrbano" data-jstree='{"icon": false}'>Planeamiento urbano
                <ul>
                    <li id="vw_distritos_planeamiento_urbano">Distritos C&oacute;digo Planeamiento Urbano</li>
                    <li id="vw_ejido_urbano">Ejido urbano</li>
                    <li id="vw_medianas">Medianas de la ciudad</li>
                    <li id="vw_edificios_historicos">Edificios del casco historico</li>
                </ul>
            </li>
            <li id="infoMunicipal" data-jstree='{"icon": false}'>Informacion Municipal
                <ul>
                    <li id="vw_centros_de_pago">Centros de pago</li>
                    <li id="vw_dependencias_municipales">Dependencias Municipales</li>
                </ul>
            </li>
            <li id="estadisticaCenso" data-jstree='{"icon": false}'>Estadistica y Censo
                <ul>
                    <li id="vw_poblacion">Poblaci&oacute;n</li>
                    <li id="vw_densidad_de_poblacion">Densidad de poblaci&oacute;n</li>
                </ul>
            </li>
            <li id="desasocialComunit" data-jstree='{"icon": false}'>Desarrollo social Comunitario
                <ul>
                    <li id="vw_cic">Centros de integracion comunitario</li>
                    <li id="vw_delegaciones_municipales">Delegaciones Municipales</li>
                    <li id="vw_sum">Sal&oacute;n de usos m&uacute;ltiples</li>
                    <li id="vw_zonas_municipales">Zonas Municipales</li>
                </ul>
            </li>
            <li id="salud" data-jstree='{"icon": false}'>Salud
                <ul>
                    <li id="vw_caps">C.A.P.S.</li>
                    <li id="vw_saps_municipales">S.A.P.S.</li>
                    <li id="vw_centros_de_salud">Centros de salud</li>
                    <li id="vw_farmacias">Farmacias</li>
                    <li id="vw_hospitales">Hospitales</li>
                    <li id="vw_areas_programaticas_saps">Areas programaticas de salud</li>
                </ul>
            </li>
            <li id="Transporte" data-jstree='{"opened": false, "icon": false}'>Transporte
                <ul>
                    <li>Puntos de recarga SUBE</li>
                    <li>Recorrido Total de Colectivos</li>
                    <li>Estacionamientos privados</li>
                    <li>Paradas de colectivo Urbano</li>
                    <li id="b1" data-jstree='{"opened": false}'>Recorrido por ramal
                        <ul>
                            <li>Linea 101 B</li>
                            <li>Linea 101 C</li>
                            <li>Linea 102 A</li>
                            <li>Linea 102 B</li>
                            <li>Linea 102 C</li>
                            <li>Linea 103 A</li>
                            <li>Linea 103 B</li>
                            <li>Linea 103 C - Directo</li>
                            <li>Linea 103 C - Bo Esperanza <> Bo Dr. Montaña</li>
                            <li>Linea 103 D</li>
                            <li>Linea 104 A</li>
                            <li>Linea 104 C</li>
                            <li>Linea 104 D</li>
                            <li>Linea 105 A</li>
                            <li>Linea 105 B</li>
                            <li>Linea 105 C 250 Viv.</li>
                            <li>Linea 105 C Perichon</li>
                            <li>Linea 106 A</li>
                            <li>Linea 106 B</li>
                            <li>Linea 106 C</li>
                            <li>Linea 106 D</li>
                            <li>Linea 108 AB</li>
                            <li>Linea 108 C</li>
                            <li>Linea 109 A Lag. Soto</li>
                            <li>Linea 106 C Yechoha</li>
                        </ul>
                    </li>
                    <li>Paradas Chaco - Corrientes - Barranqueras</li>
                    <li>Recorrido Chaco - Corrientes - Barranqueras</li>
                    <li>Paradas Chaco - Corrientes - Campus</li>
                    <li>Recorrido Chaco - Corrientes - Campus</li>
                    <li>Paradas Chaco - Corrientes - Sarmiento</li>
                    <li>Recorrido Chaco - Corrientes - Sarmiento</li>
                </ul>
            </li>
            <li id="redVial" data-jstree='{"icon": false}'>Red vial
                <ul>
                    <li id="vw_ide_calle">Calles</li>
                    <li id="vw_ide_calle_por_tipo_calzada">Calles por tipo de calzada</li>
                </ul>
            </li>
            <li id="infoCatastral" data-jstree='{"icon": false}'>Informacion catastral
                <ul>
                    <li id="vw_asentamiento_renabap">Asentamientos informales (Re.Na.Ba.P.)</li>
                    <li id="vw_cordones">Cordones</li>
                    <li id="vw_grupo_viviendas_invico">Grupos de vivienda In.Vi.Co</li>
                    <li id="vw_barrios">Barrios</li>
                    <li id="vw_ph_parcelas">Parcelas PH</li>
                    <li id="vw_parcelas">Parcelario Catastral</li>
                    <li id="vw_manzanas">Manzanas</li>
                </ul>
            </li>

        </ul>
    </li>
</ul>

