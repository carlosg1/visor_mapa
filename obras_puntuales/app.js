$(document).ready(function(){

    $("#btnFoto1").click(function(){

        var fd = new FormData();
        var files = $('#foto1')[0].files[0];
        fd.append('foto1',files);

        $.ajax({
            url: 'cargar_foto.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    $("#img1").attr("src", response); 
                    $("#img1").show(); // Display image element
                }else{
                    alert('file not uploaded');
                }
            },
        });
    });
});