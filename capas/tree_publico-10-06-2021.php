<?php
/*
 * Actualizado: 29/10/2019
 * Developer: Lic Carlos Garcia - carlosgctes@gmail.com
 * Uso: para agregar una capa a la rama de información publica
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
            <li id="ambienteDesa" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Ambiente y Desarrollo Sustentable"}'>Ambiente y Desarrollo Sustentable
                <ul>
                    <!-- <li id="vw_arbolado" data-jstree='{"icon": "images/icon/arbolado.png", "category":"Ambiente y Desarrollo Sustentable"}'>Arbolado</li> -->
                    <li id="vw_arbolado" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_arbolado&WS=ambiente'; ?>", "category":"Ambiente y Desarrollo Sustentable"}'>Arbolado</li>

                    <li id="vw_recoleccion_diferenciada" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recoleccion_diferenciada&WS=ambiente'; ?>", "category":"Ambiente y Desarrollo Sustentable"}'>Recoleccion Diferenciada
                        <ul>
                            <li id="recDif_juan_vera" data-jstree='{"category": "Ambiente y Desarrollo Sustentable"}'>
                                <span>
                                    <img src="legend/recoleccion-diferenciada.png" alt="Categoria recolecci&oacute;n deferenciada">
                                </span>
                            </li>
                        </ul>
                    </li>

                    <li id="vw_puntos_verdes" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_puntos_verdes&WS=ambiente'; ?>", "category":"Ambiente y Desarrollo Sustentable"}'>Puntos Verdes</li>
                </ul>
            </li>
        </ul>

        <!-- Plan hidrico -->

        <ul>
            <li id="planHidrico" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Plan Hidrico", "class": "folder"}'>Plan h&iacute;drico
                <ul>
                    <li id="rehabilitacionDesaguesPluviales" data-jstree='{"icon":"images/polilinea_gral_1.png", "category":"Plan Hidrico"}'>Rehabilitacion de desagues pluviales
                        <ul>
                            <li id="desagueLimpio" data-jstree='{"icon": "images/icon/lazul.png", "category":"Plan Hidrico"}'>Limpio</li>
                            <li id="desaguePendiente" data-jstree='{"icon": "images/icon/lrojo.png", "category":"Plan Hidrico"}'>Pendiente</li>
                        </ul>
                    </li>
                    <li id="rehabilitacionSumideros" data-jstree='{"icon": "images/puntos_gral.png", "category":"Plan Hidrico"}'>Rehabilitaci&oacute;n de Sumideros
				        <ul>
                            <li id="sumideroLimpio" data-jstree='{"icon": "images/icon/sumidero_limpio.png", "category":"Plan Hidrico"}'>Limpio</li>
                            <li id="sumideroPendiente" data-jstree='{"icon": "images/icon/sumidero_pendiente.png", "category":"Plan Hidrico"}'>Pendiente</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- Infraestructura -->

        <ul>
            <li id="infraestructura" data-jstree='{"icon": "images/icon/folder-1-16.png", "category": "Infraestructura", "class": "folder"}'>Infraestructura
                <ul>
                    <li id="redAguaPotable" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=red_agua_potable&WS=infraestructura'; ?>", "category": "Infraestructura"}'>Red de agua potable</li>

                    <li id="vw_desagues_pluviales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_desagues_pluviales&WS=infraestructura'; ?>", "category": "Infraestructura"}'>Red de desague pluvial</li>

                    <li id="red_desague_cloacal" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_red_de_cloaca&WS=infraestructura'; ?>", "category": "Infraestructura"}'>Red de desague cloacal</li>

                    <li id="vw_alumbrado_publico" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_alumbrado_publico&WS=infraestructura'; ?>", "category": "Infraestructura"}'>Alumbrado p&uacute;blico</li>

                    <li id="vw_bocas_de_registro" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_bocas_de_registro&WS=infraestructura'; ?>", "category": "Infraestructura"}'>Bocas de registro</li>

                    <li id="vw_centros_distribuidores_dpec" data-jstree='{"icon": "images/icon/distribuidores_dpec.png", "category": "Infraestructura"}'>Centros de distribucion DPEC</li>

                    <li id="vw_puntos_wifi" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_puntos_wifi&WS=infraestructura'; ?>", "category": "Infraestructura"}'>Puntos WiFi</li>
                    
                    <li id="vw_semaforo" data-jstree='{"icon": "images/legend/semaforos.png", "category": "Infraestructura"}'>Semaforos</li>
                </ul>
            </li>

            <!-- Obras -->

            <li id="obrasMunicipales" data-jstree='{"icon": "images/icon/folder-1-16.png", "category": "Obras", "class": "folder"}'>Obras
                <ul>

                    <li id="vw_obras_cordones_cuneta" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_cordones_cuneta&WS=app'; ?>", "category": "Obras"}'>Cord&oacute;n cuneta</li>

                    <li id="vw_obras_ripio" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_ripio&WS=app'; ?>", "category": "Obras"}'>Enripiado</li>
                    
                    <li id="vw_obras_pavimento" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_pavimento&WS=app'; ?>", "category": "Obras"}'>Pavimento</li>
                    
                    <li id="vw_cloaca_social" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_cloaca_social&WS=infraestructura'; ?>", "category": "Obras"}'>Instalaci&oacute;n Cloaca social</li>

                    <li id="vw_instal_canio_acceso_domicilio" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_instal_canio_acceso_domicilio&WS=obras_municipales'; ?>", "category": "Obras"}'>Instalaci&oacute;n Acceso Domicilio</li>

                    <li id="vw_intervencion_en_plazas" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_intervencion_en_plazas&WS=obras_municipales'; ?>", "category": "Obras"}'>Intervenci&oacute;n en plazas</li>

                    <li id="vw_plaza_recreacion" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_plaza_recreacion&WS=obras_municipales'; ?>", "category": "Obras"}'>Arreglo de plazas</li>

                    <li id="vw_obras_de_bacheo" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_de_bacheo&WS=obras_municipales'; ?>", "category": "Obras"}'>Obras de bacheo</li>

                    <li id="vw_alumbrado_publico_led" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_alumbrado_publico_led&WS=infraestructura'; ?>", "category": "Obras"}'>Instalaci&oacute;n luminaria LED</li>

                    <!-- <li id="vw_obras_santa_catalina_viviendas" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_obras_santa_catalina_viviendas&WS=obras_municipales'; ?>", "category": "Obras"}'>Obra Santa Catalina</li> -->

                    <li id="vw_instalacion_canios_cruce_calle" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_instalacion_canios_cruce_calle&WS=obras_municipales'; ?>", "category": "Obras"}'>Instalaci&oacute;n Caños</li>

                    <li id="vw_obras_vereda" data-jstree='{"icon": "images/legend/vw_obras_vereda.png", "category": "Obras"}'>Veredas</li>

                    <li id="vw_limpieza_de_canales_a_cielo_abierto" data-jstree='{"icon": "images/legend/vw_limpieza_de_canales_a_cielo_abierto.png", "category": "Obras"}'>Limpieza de canales a cielo abierto</li>

                    <li id="vw_instalacion_de_camaras" data-jstree='{"icon": "images/legend/vw_instalacion_de_camaras.png", "category": "Obras"}'>Instalaci&oacute;n de c&aacute;maras</li>

                    <li id="vw_espacios_recuperados" data-jstree='{"icon": "images/legend/vw_espacios_recuperados.png", "category": "Obras"}'>Espacios recuperados</li>
                </ul> 
            </li>

            <!-- Planeamiento Urbano -->

            <li id="planeamientoUrbano" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Planeamiento Urbano", "class": "folder"}'>Planeamiento urbano
                <ul>
                    <li id="vw_distritos_planeamiento_urbano" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_distritos_planeamiento_urbano&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Distritos C&oacute;digo Planeamiento Urbano</li>

                    <li id="vw_ejido_urbano" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_ejido_urbano_rural&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Ejido urbano</li>

                    <li id="vw_medianas" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_medianas&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Medianas de la ciudad</li>

                    <li id="vw_edificios_historicos" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_edificios_historicos&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Inmuebles de valor patrimonial</li>

                    <!-- agregado por carlos 13/11/2020  -->
                    <li id="vw_parcelas_por_distrito" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_parcelas_por_distrito&WS=app'; ?>", "category":"Planeamiento Urbano"}'>Parcelas por Distrito</li>
                </ul>
            </li>

		<!-- INFORMACION MUNICIPAL -->

            <li id="infoMunicipal" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Informacion Municipal", "class": "folder"}'>Informacion Municipal
                <ul>
                    <li id="vw_centros_de_pago" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_centros_de_pago&WS=informacion_municipal'; ?>", "category":"Informacion Municipal"}'>Centros de pago</li>
                    <li id="vw_dependencias_municipales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_dependencias_municipales&WS=informacion_municipal'; ?>", "category":"Informacion Municipal"}'>Dependencias Municipales</li>
                </ul>
            </li>

            <li id="estadisticaCenso" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Estadistica Y Censo", "class": "folder"}'>Estadistica y Censo
                <ul>
                    <li id="vw_poblacion" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_poblacion&WS=estadistica_y_censo'; ?>", "category":"Estadistica Y Censo"}'>Poblaci&oacute;n</li>
                    <li id="vw_densidad_de_poblacion" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_densidad_de_poblacion&WS=estadistica_y_censo'; ?>", "category":"Estadistica Y Censo"}'>Densidad de poblaci&oacute;n</li>
                </ul>
            </li>

            <!-- Desarrollo Social Comunitario -->

            <li id="desasocialComunit" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Desarrollo social comunitario", "class": "folder"}'>Desarrollo social Comunitario
                <ul>
                    <li id="vw_cic" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_cic&WS=desarrollo_comunitario'; ?>", "category":"Desarrollo social comunitario"}'>Centros de integracion comunitario</li>
                    <li id="vw_delegaciones_municipales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_delegaciones_municipales&WS=desarrollo_comunitario'; ?>", "category":"Desarrollo social comunitario"}'>Delegaciones Municipales</li>
                    <li id="vw_sum" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_sum&WS=desarrollo_comunitario'; ?>", "category":"Desarrollo social comunitario"}'>Sal&oacute;n de usos m&uacute;ltiples</li>
                    <li id="vw_zonas_municipales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_zonas_municipales&WS=desarrollo_comunitario'; ?>", "category":"Desarrollo social comunitario"}'>Zonas Municipales</li>
                </ul>
            </li>

		<!-- SALUD -->

            <li id="salud" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Salud", "class": "folder"}'>Salud
                <ul>
                    <li id="vw_caps" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_caps&WS=salud'; ?>", "category":"Salud"}'>C.A.P.S.</li>
                    <li id="vw_saps_municipales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_saps&WS=salud'; ?>", "category":"Salud"}'>S.A.P.S.</li>
                    <li id="vw_centros_de_salud" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_centros_de_salud&WS=salud'; ?>", "category":"Salud"}'>Centros de salud</li>
                    <li id="vw_farmacias" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_farmacias&WS=salud'; ?>", "category":"Salud"}'>Farmacias</li>
                    <li id="vw_hospitales" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_hospitales&WS=salud'; ?>", "category":"Salud"}'>Hospitales</li>
                    <li id="vw_areas_programaticas_saps" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_areas_programaticas_saps&WS=salud'; ?>", "category":"Salud"}'>Areas programaticas de salud</li>
                </ul>
            </li>

        <!-- CORREDOR VIAL -->

            <li id="corredor_vial" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Corredor vial", "class": "folder"}'>Corredor vial
                <ul>
                    <li id="vw_corredor_vial_carga_descarga" data-jstree='{"opened": false, "icon": "<?php echo 'glg.php?LAYER=vw_corredor_vial_carga_descarga&WS=corredor_vial'; ?>", "category":"Corredor vial"}'>Carga y Descarga</li>

                    <li id="vw_corredor_vial_prohibido_estacionar" data-jstree='{"opened": false, "icon": "<?php echo 'glg.php?LAYER=vw_corredor_vial_prohibido_estacionar&WS=corredor_vial'; ?>", "category":"Corredor vial"}'>Prohibici&oacute;n de estacionar</li>
                </ul>
            </li>

        <!-- TRANSPORTE -->

            <li id="Transporte" data-jstree='{"opened": false, "icon": "images/icon/folder-1-16.png", "category":"Transporte", "class": "folder"}'>Transporte
                <ul>
                    <li id="vw_estacionamiento_moto" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_estacionamiento_moto&WS=transporte'; ?>", "category":"Transporte"}'>Estacionamiento para motos</li>

                    <li id="vw_estacionamiento_medido" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_estacionamiento_medido&WS=transporte'; ?>", "category":"Transporte"}'>Estacionamiento med&iacute;do</li>

                    <li id="vw_puntos_de_recarga_sube" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_puntos_recarga_sube'; ?>"}'>Puntos de recarga SUBE</li>

                    <li id="vw_recorrido_total_colectivos_corrientes" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_total_colectivo'; ?>", "category":"Transporte"}'>Recorrido Total de Colectivos</li>

                    <li id="vw_estacionamiento_privado" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_estacionamiento_privado'; ?>", "category":"Transporte"}'>Estacionamientos privados</li>

                    <li id="vw_paradas_colectivos" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_colectivos&WS=transporte'; ?>", "category":"Transporte"}'>Paradas de colectivo Urbano</li>

                    <li id="b1" data-jstree='{"opened": false, "icon": "images/icon/folder-1-16.png", "category":"Transporte"}'>Recorrido por ramal
                        <ul>
                            <li id="recorrido_ramal_101_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_101_B'; ?>", "category":"Transporte"}'>Ramal 101 B</li>
                            <li id="recorrido_ramal_101_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_101_C'; ?>", "category":"Transporte"}'>Linea 101 C</li>
                            <li id="recorrido_ramal_102_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_102_A'; ?>", "category":"Transporte"}'>Linea 102 A</li>
                            <li id="recorrido_ramal_102_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_102_B'; ?>", "category":"Transporte"}'>Linea 102 B</li>
                            <li id="recorrido_ramal_102_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_102_C'; ?>", "category":"Transporte"}'>Linea 102 C</li>
                            <li id="recorrido_ramal_103_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_A'; ?>", "category":"Transporte"}'>Linea 103 A</li>
                            <li id="recorrido_ramal_103_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_B'; ?>", "category":"Transporte"}'>Linea 103 B</li>
                            <li id="recorrido_ramal_103_C_directo" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_C_directo'; ?>"}'>Linea 103 C - Directo</li>
                            <li id="recorrido_ramal_103_C_esperanza_montania" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_C_esperanza_montania'; ?>", "category":"Transporte"}'>Linea 103 C - Bo Esperanza <-> Bo Dr. Montaña</li>
                            <li id="recorrido_ramal_103_D" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_103_D'; ?>", "category":"Transporte"}'>Linea 103 D</li>
                            <li id="recorrido_ramal_104_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_A'; ?>", "category":"Transporte"}'>Linea 104 A</li>
                            <li id="recorrido_ramal_104_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_B'; ?>", "category":"Transporte"}'>Linea 104 B</li>
                            <li id="recorrido_ramal_104_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_C'; ?>", "category":"Transporte"}'>Linea 104 C</li>
                            <li id="recorrido_ramal_104_D" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_104_D'; ?>", "category":"Transporte"}'>Linea 104 D</li>
                            <li id="recorrido_ramal_105_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_A'; ?>", "category":"Transporte"}'>Linea 105 A</li>
                            <li id="recorrido_ramal_105_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_B'; ?>", "category":"Transporte"}'>Linea 105 B</li>
                            <li id="recorrido_ramal_105_C_250_viv" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_C_250_viv'; ?>", "category":"Transporte"}'>Linea 105 C 250 Viv.</li>
                            <li id="recorrido_ramal_105_C_perichon" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_105_C_perichon'; ?>", "category":"Transporte"}'>Linea 105 C Perichon</li>
                            <li id="recorrido_ramal_106_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_A'; ?>", "category":"Transporte"}'>Linea 106 A</li>
                            <li id="recorrido_ramal_106_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_B'; ?>", "category":"Transporte"}'>Linea 106 B</li>
                            <li id="recorrido_ramal_106_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_C'; ?>", "category":"Transporte"}'>Linea 106 C</li>
                            <li id="recorrido_ramal_106_D" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_106_D'; ?>", "category":"Transporte"}'>Linea 106 D</li>
                            <li id="recorrido_ramal_108_AB" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_108_AB'; ?>", "category":"Transporte"}'>Linea 108 AB</li>
                            <li id="recorrido_ramal_108_C" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_108_C'; ?>", "category":"Transporte"}'>Linea 108 C</li>
                            <li id="recorrido_ramal_109_A_Laguna_Soto" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_109_A_Laguna_Soto'; ?>", "category":"Transporte"}'>Linea 109 A - Lag. Soto</li>
                            <li id="recorrido_ramal_109_B_Yecoha" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_109_B_Yecoha'; ?>", "category":"Transporte"}'>Linea 109 B - Yecoha</li>

                            <li id="recorrido_ramal_110_A" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_110_A'; ?>", "category":"Transporte"}'>Linea 110 A</li>
                            <li id="recorrido_ramal_110_B" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_110_B'; ?>", "category":"Transporte"}'>Linea 110 B</li>
                            <li id="recorrido_ramal_110_C_sta_catalina" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=recorrido_ramal_110_C_sta_catalina'; ?>", "category":"Transporte"}'>Linea 110 C sta. Catalina</li>
                        </ul>
                    </li>
                    <li id="vw_paradas_barranqueras" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_barranqueras'; ?>", "category":"Transporte"}'>Paradas Chaco - Corrientes - Barranqueras</li>
                    <li id="vw_recorrido_barranqueras" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_barranqueras'; ?>", "category":"Transporte"}'>Recorrido Chaco - Corrientes - Barranqueras</li>
                    <li id="vw_paradas_campus" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_campus'; ?>", "category":"Transporte"}'>Paradas Chaco - Corrientes - Campus</li>
                    <li id="vw_recorrido_campus" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_campus'; ?>", "category":"Transporte"}'>Recorrido Chaco - Corrientes - Campus</li>
                    <li id="vw_paradas_sarmiento" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_paradas_sarmiento'; ?>", "category":"Transporte"}'>Paradas Chaco - Corrientes - Sarmiento</li>
                    <li id="vw_recorrido_sarmiento" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_recorrido_sarmiento'; ?>", "category":"Transporte"}'>Recorrido Chaco - Corrientes - Sarmiento</li>
                </ul>
            </li>

            <!-- Red vial -->

            <li id="redVial" data-jstree='{"icon": "images/icon/folder-1-16.png", "class": "folder"}'>Red vial
                <ul>
                    <li id="vw_alturas_calles" data-jstree='{"icon": "images/altura_calles.svg", "category":"Red vial"}'>Altura de calle</li>
                    <li id="vw_ide_calle" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_ide_calle&WS=red_vial'; ?>", "category":"Red vial"}'>Calles</li>
                    <li id="vw_ide_calle_por_tipo_calzada" data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_ide_calle_por_tipo_calzada&WS=red_vial'; ?>", "category":"Red vial"}'>Calles por tipo de calzada</li>
                </ul>
            </li>

            <!-- INFORMACION CATASTRAL -->

            <li id="infoCatastral" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Informacion catastral", "class": "folder"}'>Informacion catastral
                <ul>
                    
                    <li id="vw_plazas_de_la_ciudad" 
                        data-jstree='{"icon": "images/icon/vw_plazas_de_la_ciudad.jpg", "category":"Red vial"}'>Espacios verdes</li>
                    
                    <li id="vw_asentamiento_renabap" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_asentamiento_renabap&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Asentamientos informales (Re.Na.Ba.P.)</li>

                    <li id="vw_cordones" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_cordones&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Cordones</li>

                    <li id="vw_grupo_viviendas_invico" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_grupo_vivienda_invico&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Grupos de vivienda In.Vi.Co</li>

                    <li id="vw_barrios" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_barrios_de_la_ciudad&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Barrios</li>

                    <li id="vw_ph_parcelas" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_ph_parcelas&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Parcelas PH</li>

                    <li id="vw_parcelas" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_parcelas&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Parcelario Catastral</li>

                    <li id="vw_manzanas" 
                        data-jstree='{"icon": "<?php echo 'glg.php?LAYER=vw_manzanas_de_la_ciudad&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Manzanas</li>

                </ul>
            </li>

        </ul>
    </li>
</ul>
