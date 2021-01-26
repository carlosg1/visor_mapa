function compartirUrl(){
	var botonCompartir = document.createElement('img');
	botonCompartir.id = 'compartir';
	botonCompartir.src = "images/compartir-url.png";
	botonCompartir.title = "Compartir enlace";
	botonCompartir.style.cssText = 'display: block; z-index: 1001; position: absolute; right: 10px; top: 260px; cursor: pointer;';
	document.querySelector('body').appendChild(botonCompartir);
	botonCompartir.addEventListener('click', function(){
		let capasActivas = [];
		seleccionados = $('#arbolMCC').jstree('get_selected', true);
		seleccionados.forEach(e => capasActivas.push(e.id));
		let url = location.origin + location.pathname + '?menu='+menu_abierto+ '&c=' + capasActivas.toString() + location.hash;
		navigator.clipboard.writeText(url).then(function(){
			Snackbar.show({
				pos : 'bottom-left',
				text: 'Copiado en el portapapeles',
				actionText: 'Entendido'
			});
		});
	})
}