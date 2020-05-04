var app_key = '74232a508a90438ac7e4';
var canal = 'chat';
var evento = 'mensaje';
var usuario;

$(document).ready(function() {

    if(!localStorage.getItem('usuario')){
      while(trim(usuario).length == 0){
        usuario = prompt("Nombre:");
        localStorage.setItem('usuario',usuario);
      }
    }
    else{
        usuario = localStorage.getItem('usuario');
    }

   var titleOriginal = document.title;   
   var intervalBlinkTitle = 0;
   var primero = true;

   window.startFlashTitle = function (newTitle) {       
       if(intervalBlinkTitle == 0){
            document.title = 
             (document.title == titleOriginal) ? newTitle : titleOriginal;           

            intervalBlinkTitle = setInterval(function (){
             document.title = 
              (document.title == titleOriginal) ? newTitle : titleOriginal;           
            }, 1000);
        } 
   };


   window.stopFlashTitle = function () {       
       clearInterval(intervalBlinkTitle);
       intervalBlinkTitle = 0;
       document.title = titleOriginal;
   };


   $(window).click(function(event) {
      stopFlashTitle();
   });



   $('#msg').keyup(function(event) {
        event.preventDefault();
        if(event.keyCode == 13){
            enviarMensaje($('#msg').val(),false);
            $('#msg').val('');
        }
   });


   $('#bt-enviar').click(function(event) {
       enviarMensaje($('#msg').val(),false);
       $('#msg').val('');
   });


    $('.emo').click(function(event) {
        msg = '<img src="'+this.src+'"width="40" height="40">';
        enviarMensaje(msg,true);
    });


 
    var pusher = new Pusher(app_key);

    var channel = pusher.subscribe(canal);
    
    channel.bind(evento, function(data) {

        fecha = new Date();

        hora = fecha.toString().split(' ');

        cad = '<li class="left clearfix"><span class="chat-img pull-left">'+
              '<img src="http://placehold.it/50/FA6F57/fff&text=CHAT" alt="User Avatar" class="img-circle" />'+
                '</span>'+
                '<div class="chat-body clearfix">'+
                '<div class="header">'+
                '<strong class="primary-font">'+data.usuario+'</strong> <small class="pull-right text-muted">'+
                '<span class="glyphicon glyphicon-time"></span>'+hora[4]+'</small>'+
                '</div>'+
                '<p>'+data.mensaje+
                '</p>'+
                '</div>'+
                '</li>';


        $('#mensajes').append(cad);

        $("#divmsg").scrollTop($("#mensajes")[0].scrollHeight+50);

        if(usuario != data.usuario)startFlashTitle('Nuevo Mensaje');
    });

    

});


/*Esta funcion envia un mensaje al presionar "Enviar Mensaje", primero comprueba si ya existe un nombre de usuario
si no, entonces crea uno (id unico),despues se usa la funcion $.get de jquery para enviarle el mensaje al server*/

function enviarMensaje(msg,emoti){
    //comprovamos que el mensaje no este vacio...si es haci no enviamos nada
    if(trim(msg).length == 0)return;
   
    //enviamos el mensaje al servidor mediante AJAX
    $.post('server.php',{usuario:usuario,mensaje:msg,emoticone:emoti},function(data) {
    });
}

//Funcion que quita los espacios de una cadena
function trim(cadena){
       if(typeof(cadena) == 'undefined' || cadena == null)return "";
       cadena=cadena.replace(/^\s+/,'').replace(/\s+$/,'');
       return(cadena);
}
