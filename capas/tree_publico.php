<?php 
/*
 * Actualizado: 29/10/2019
 * Developer: Lic Carlos Garcia - carlosgctes@gmail.com 
 * Uso: para agregar una capa a la rama de informacion publica 
 * agregar una entrada <li> al archivo tree_publico.php
 * 
 */

// include('../glg.php');

?>



<!-- VISOR PUBLICO --> 

<ul>
    <li id="arbolCapasMcc" data-jstree='{"opened": true, "icon": false}'>

        <b>Informaci&oacute;n Geogr&aacute;fica</b>

        <!-- Ambiente -->

        <ul>
            <li id="ambienteDesa" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Ambiente y Desarrollo Sustentable
                <ul>
                    <li id="vw_recoleccion_diferenciada" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recoleccion_diferenciada&WS=ambiente'; ?>"}'>Recoleccion Diferenciada
                        <ul>
                            <li id="recDif_juan_vera">
                                <span>
                                    <img src="legend/recoleccion-diferenciada.png" alt="Categoria recolecci&oacute;n deferenciada">
                                </span>
                            </li>
                        </ul>
                    </li>

                    <li id="vw_puntos_verdes" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_puntos_verdes&WS=ambiente'; ?>"}'>Puntos Verdes</li>
                </ul>
            </li>
        </ul>

        <!-- Plan hidrico -->

        <ul>
            <li id="planHidrico" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Plan h&iacute;drico
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

        <!-- Infraestructura -->

        <ul>
            <li id="infraestructura" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Infraestructura
                <ul>
                    <li id="redAguaPotable" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=red_agua_potable&WS=infraestructura'; ?>"}'>Red de agua potable</li>

                    <li id="vw_desagues_pluviales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_desagues_pluviales&WS=infraestructura'; ?>"}'>Red de desague pluvial</li>
                    
                    <li id="red_desague_cloacal" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_red_de_cloaca&WS=infraestructura'; ?>"}'>Red de desague cloacal</li>
                    
                    <li id="vw_alumbrado_publico" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_alumbrado_publico&WS=infraestructura'; ?>"}'>Alumbrado p&uacute;blico</li>
                    
                    <li id="vw_bocas_de_registro" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_bocas_de_registro&WS=infraestructura'; ?>"}'>Bocas de registro</li>
                   
                    <li id="vw_centros_distribuidores_dpec" data-jstree='{"icon": "images/icon/distribuidores_dpec.png"}'>Centros de distribucion DPEC</li>                    
                    
                    <li id="vw_puntos_wifi" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_puntos_wifi&WS=infraestructura'; ?>"}'>Puntos WiFi</li>                    
                </ul>
            </li>

            <!-- Obras Municipales --> 

            <li id="obrasMunicipales" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Obras
                <ul>

                    <li id="vw_cloaca_social" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_cloaca_social&WS=infraestructura'; ?>"}'>Instalaci&oacute;n Cloaca social</li>

                    <li id="vw_instal_canio_acceso_domicilio" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_instal_canio_acceso_domicilio&WS=obras_municipales'; ?>"}'>Instalaci&oacute;n Acceso Domicilio</li>
                    
                    <li id="vw_intervencion_en_plazas" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_intervencion_en_plazas&WS=obras_municipales'; ?>"}'>Intervenci&oacute;n en plazas</li>

                    <li id="vw_obras_de_bacheo" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_de_bacheo&WS=obras_municipales'; ?>"}'>Obras de bacheo</li>

                    <li id="vw_alumbrado_publico_led" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_alumbrado_publico_led&WS=infraestructura'; ?>"}'>Instalaci&oacute;n luminaria LED</li>

                    <li id="vw_obras_santa_catalina_viviendas" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_santa_catalina_viviendas&WS=obras_municipales'; ?>"}'>Obra Santa Catalina</li>

                    <li id="vw_instalacion_canios_cruce_calle" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_instalacion_canios_cruce_calle&WS=obras_municipales'; ?>"}'>Instalaci&oacute;n Caños</li>
                </ul>
            </li>

            <!-- Planeamiento Urbano -->

            <li id="planeamientoUrbano" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Planeamiento urbano
                <ul>
                    <li id="vw_distritos_planeamiento_urbano">Distritos C&oacute;digo Planeamiento Urbano</li>
                    
                    <li id="vw_ejido_urbano">Ejido urbano</li>
                    
                    <li id="vw_medianas">Medianas de la ciudad</li>
                    
                    <li id="vw_edificios_historicos">Inmuebles de valor patrimonial</li>
                </ul>
            </li>

            <li id="infoMunicipal" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Informacion Municipal
                <ul>
                    <li id="vw_centros_de_pago">Centros de pago</li>
                    <li id="vw_dependencias_municipales">Dependencias Municipales</li>
                </ul>
            </li>

            <li id="estadisticaCenso" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Estadistica y Censo
                <ul>
                    <li id="vw_poblacion">Poblaci&oacute;n</li>
                    <li id="vw_densidad_de_poblacion">Densidad de poblaci&oacute;n</li>
                </ul>
            </li>

            <!-- Desarrollo Social Comunitario -->

            <li id="desasocialComunit" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Desarrollo social Comunitario
                <ul>
                    <li id="vw_cic">Centros de integracion comunitario</li>
                    <li id="vw_delegaciones_municipales">Delegaciones Municipales</li>
                    <li id="vw_sum">Sal&oacute;n de usos m&uacute;ltiples</li>
                    <li id="vw_zonas_municipales">Zonas Municipales</li>
                </ul>
            </li>

            <li id="salud" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Salud
                <ul>
                    <li id="vw_caps">C.A.P.S.</li>
                    <li id="vw_saps_municipales">S.A.P.S.</li>
                    <li id="vw_centros_de_salud">Centros de salud</li>
                    <li id="vw_farmacias">Farmacias</li>
                    <li id="vw_hospitales">Hospitales</li>
                    <li id="vw_areas_programaticas_saps">Areas programaticas de salud</li>
                </ul>
            </li>

            <li id="corredor_vial" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Corredor vial
                <ul>
                    <li id="vw_corredor_vial_carga_descarga" data-jstree='{"opened": false, "icon": "<?php echo 'glg.php?LAYER=vw_corredor_vial_carga_descarga&WS=corredor_vial'; ?>"}'>Carga y Descarga</li>
                    
                    <li id="vw_corredor_vial_prohibido_estacionar" data-jstree='{"opened": false, "icon": "<?php echo 'glg.php?LAYER=vw_corredor_vial_prohibido_estacionar&WS=corredor_vial'; ?>"}'>Prohibici&oacute;n de estacionar</li>
                </ul>
            </li>

            <li id="Transporte" data-jstree='{"opened": false, "icon": "images/icon/folder-1-16.png"}'>Transporte
                <ul>
                    <li id="vw_estacionamiento_moto" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_estacionamiento_moto&WS=transporte'; ?>"}'>Estacionamiento para motos</li>

                    <li id="vw_estacionamiento_medido" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_estacionamiento_medido&WS=transporte'; ?>"}'>Estacionamiento med&iacute;do</li>

                    <li id="vw_puntos_de_recarga_sube" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_puntos_recarga_sube'; ?>"}'>Puntos de recarga SUBE</li>
                    
                    <li id="vw_recorrido_total_colectivos_corrientes" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_total_colectivo'; ?>"}'>Recorrido Total de Colectivos</li>
                    
                    <li id="vw_estacionamiento_privado" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_estacionamiento_privado'; ?>"}'>Estacionamientos privados</li>
                    
                    <li id="vw_paradas_colectivos" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_colectivos&WS=transporte'; ?>"}'>Paradas de colectivo Urbano</li>
                    
                    <li id="b1" data-jstree='{"opened": false, "icon": "images/icon/folder-1-16.png"}'>Recorrido por ramal
                        <ul>
                            <li id="recorrido_ramal_101_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_101_B'; ?>"}'>Ramal 101 B</li>
                            <li id="recorrido_ramal_101_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_101_C'; ?>"}'>Linea 101 C</li>
                            <li id="recorrido_ramal_102_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_102_A'; ?>"}'>Linea 102 A</li>
                            <li id="recorrido_ramal_102_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_102_B'; ?>"}'>Linea 102 B</li>
                            <li id="recorrido_ramal_102_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_102_C'; ?>"}'>Linea 102 C</li>
                            <li id="recorrido_ramal_103_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_A'; ?>"}'>Linea 103 A</li>
                            <li id="recorrido_ramal_103_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_B'; ?>"}'>Linea 103 B</li>
                            <li id="recorrido_ramal_103_C_directo" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_C_directo'; ?>"}'>Linea 103 C - Directo</li>
                            <li id="recorrido_ramal_103_C_esperanza_montania" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_C_esperanza_montania'; ?>"}'>Linea 103 C - Bo Esperanza <-> Bo Dr. Montaña</li>
                            <li id="recorrido_ramal_103_D" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_D'; ?>"}'>Linea 103 D</li>
                            <li id="recorrido_ramal_104_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_A'; ?>"}'>Linea 104 A</li>
                            <li id="recorrido_ramal_104_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_B'; ?>"}'>Linea 104 B</li>
                            <li id="recorrido_ramal_104_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_C'; ?>"}'>Linea 104 C</li>
                            <li id="recorrido_ramal_104_D" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_D'; ?>"}'>Linea 104 D</li>
                            <li id="recorrido_ramal_105_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_A'; ?>"}'>Linea 105 A</li>
                            <li id="recorrido_ramal_105_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_B'; ?>"}'>Linea 105 B</li>
                            <li id="recorrido_ramal_105_C_250_viv" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_C_250_viv'; ?>"}'>Linea 105 C 250 Viv.</li>
                            <li id="recorrido_ramal_105_C_perichon" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_C_perichon'; ?>"}'>Linea 105 C Perichon</li>
                            <li id="recorrido_ramal_106_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_A'; ?>"}'>Linea 106 A</li>
                            <li id="recorrido_ramal_106_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_B'; ?>"}'>Linea 106 B</li>
                            <li id="recorrido_ramal_106_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_C'; ?>"}'>Linea 106 C</li>
                            <li id="recorrido_ramal_106_D" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_D'; ?>"}'>Linea 106 D</li>
                            <li id="recorrido_ramal_108_AB" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_108_AB'; ?>"}'>Linea 108 AB</li>
                            <li id="recorrido_ramal_108_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_108_C'; ?>"}'>Linea 108 C</li>
                            <li id="recorrido_ramal_109_A_Laguna_Soto" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_109_A_Laguna_Soto'; ?>"}'>Linea 109 A - Lag. Soto</li>
                            <li id="recorrido_ramal_109_B_Yecoha" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_109_B_Yecoha'; ?>"}'>Linea 109 B - Yecoha</li>
                            
                            <li id="recorrido_ramal_110_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_110_A'; ?>"}'>Linea 110 A</li>
                            <li id="recorrido_ramal_110_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_110_B'; ?>"}'>Linea 110 B</li>
                            <li id="recorrido_ramal_110_C_sta_catalina" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_110_C_sta_catalina'; ?>"}'>Linea 110 C sta. Catalina</li>
                        </ul>
                    </li>
                    <li id="vw_paradas_barranqueras" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_barranqueras'; ?>"}'>Paradas Chaco - Corrientes - Barranqueras</li>
                    <li id="vw_recorrido_barranqueras" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_barranqueras'; ?>"}'>Recorrido Chaco - Corrientes - Barranqueras</li>
                    <li id="vw_paradas_campus" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_campus'; ?>"}'>Paradas Chaco - Corrientes - Campus</li>
                    <li id="vw_recorrido_campus" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_campus'; ?>"}'>Recorrido Chaco - Corrientes - Campus</li>
                    <li id="vw_paradas_sarmiento" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_sarmiento'; ?>"}'>Paradas Chaco - Corrientes - Sarmiento</li>
                    <li id="vw_recorrido_sarmiento" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_sarmiento'; ?>"}'>Recorrido Chaco - Corrientes - Sarmiento</li>
                </ul>
            </li>

            <!-- Red vial -->

            <li id="redVial" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Red vial
                <ul>
                    <li id="vw_alturas_calles" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_alturas_calles&WS=red_vial'; ?>"}'>Altura de calle</li>
                    <li id="vw_ide_calle" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_ide_calle&WS=red_vial'; ?>"}'>Calles</li>
                    <li id="vw_ide_calle_por_tipo_calzada" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_ide_calle_por_tipo_calzada&WS=red_vial'; ?>"}'>Calles por tipo de calzada</li>
                </ul>
            </li>

            <li id="infoCatastral" data-jstree='{"icon": "images/icon/folder-1-16.png"}'>Informacion catastral
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

