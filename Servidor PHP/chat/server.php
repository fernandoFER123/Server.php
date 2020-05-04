<?php
	$app_key = "74232a508a90438ac7e4";
	$app_secret = "e7cb0603dd1e3b67b51c";
	$app_id = "995190";
	$canal = "chat";
	$evento = "mensaje";
	
	require('libs/Pusher.php');
	if($_POST){
		if(isset($_POST['usuario']) && isset($_POST['mensaje']) && isset($_POST['emoticone'])){
	
			$usuario = strip_tags($_POST['usuario']);
			if($_POST['emoticone'] == "false"){
			 	$mensaje = strip_tags($_POST['mensaje']);
			}
			else $mensaje = $_POST['mensaje'];
			$pusher = new Pusher($app_key, $app_secret, $app_id);
			$pusher->trigger($canal, $evento, array('usuario'=> $usuario,'mensaje' => ($mensaje) ));
			echo json_encode($_POST);
		}
	}
?>