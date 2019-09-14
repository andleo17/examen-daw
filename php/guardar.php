<?php
require_once("conexion.php");

$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
$fecha_vencimiento = $_POST['fecha_vencimiento'];
$presentacion = $_POST['presentacion'];
$categoria = $_POST['categoria'];

$sql="INSERT INTO producto
VALUES (DEFAULT, '$nombre', $precio, '$fecha_vencimiento', $presentacion, $categoria)";
$resp = 1;
$cnx -> query($sql) or $resp = 0;
echo $resp;
?>