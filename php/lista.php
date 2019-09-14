<?php
require_once("conexion.php");

$p = $_POST['pag'];
$campo = $_POST['campo'];
$filtro = $_POST['filtro'];

$cant = 10;
$inicio = ($p - 1) * $cant;

$sql = "SELECT *, c.descripcion as 'categoria', p.descripcion as 'presentacion' FROM producto
			INNER JOIN presentacion p ON producto.idpresentacion = p.idpresentacion
			INNER JOIN categoria c ON producto.idcategoria = c.idcategoria
			WHERE nombre like '%$filtro%'
			ORDER BY $campo
			LIMIT $inicio, $cant";

$result = $cnx -> query($sql);

while($producto = $result -> fetchObject()){
	echo "<tr>
			<td>{$producto -> idproducto}</td>
			<td>{$producto -> nombre}</td>
			<td>{$producto -> precio}</td>
			<td>{$producto -> fecha_vencimiento}</td>
			<td>{$producto -> presentacion}</td>
			<td>{$producto -> categoria}</td>
			<td>
				<button type='button' class='btn btn-info' onclick='editar({$producto -> idproducto})'>Editar</button>
				<button type='button' class='btn btn-danger' onclick='confirmar({$producto -> idproducto})' data-toggle='modal' data-target='#confirmarEliminacion'>Eliminar</button>
			</td>
		</tr>";
}
?>