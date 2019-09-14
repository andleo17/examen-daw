<?php
require_once("conexion.php");
$filtro = $_POST['filtro'];

$sql = "SELECT * FROM producto WHERE nombre like '%$filtro%'";
$result = $cnx->query($sql);
$cantreg = $result->rowCount();
$crxp = 10;
$cantpag = ceil($cantreg/$crxp);
for($i = 1; $i <= $cantpag; $i++){
	echo "<a href='#' class='btn btn-warning mr-2' onclick=\"listado($i, 'idproducto', '')\"> $i </a>";
}
?>