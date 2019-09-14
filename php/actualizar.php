<?php
require_once("conexion.php");

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
$fecha_vencimiento = $_POST['fecha_vencimiento'];
$presentacion = $_POST['presentacion'];
$categoria = $_POST['categoria'];

$sql = "UPDATE producto SET
            nombre = '$nombre',
            precio = '$precio',
            fecha_vencimiento = '$fecha_vencimiento',
            idpresentacion = '$presentacion',
            idcategoria = '$categoria'
            WHERE idproducto = $id";
$resp = 1;
$cnx -> query($sql) or $resp = 0;
echo $resp;
?>