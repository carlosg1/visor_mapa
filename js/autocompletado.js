window.addEventListener('load', () => {
    document.getElementById('input-busqueda').addEventListener('keyup', () => {
        autocompletado();
    });
    
    async function autocompletado() {
        document.getElementById("place_list").innerHTML = '';
    
        let busqueda = document.getElementById('input-busqueda').value;
    
        var resultados = await $.get('autocompletado.php', { busqueda: busqueda }, function (data) { resultados = data; return resultados;});
    
        var tam = busqueda.length;
        for (let i = 0; i < resultados.length; i++) {
            var nombre = resultados[i].nombre;
            var str = nombre.substring(0, tam);
            if (busqueda.length <= nombre.length && busqueda.length != 0 && nombre.length != 0) {
                if (busqueda.toLowerCase() == str.toLowerCase()) {
                    $('#place_list').append(`
                        <li class="result-item">
                            <b>${resultados[i].nombre}</b> <small>${resultados[i].tipo}</small>
                        </li>
                    `);
                }
            }
        }
    }
    
    $('#place_list').on('click', '.result-item', function(e){
        document.getElementById('input-busqueda').value = this.innerText;
        document.getElementById("place_list").innerHTML = '';
    });
});




