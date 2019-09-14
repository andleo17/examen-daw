<?php
require_once 'conexion.php';

$query = 'SELECT * FROM categoria';

$resultados = $cnx -> query($query);

while ($categoria = $resultados -> fetchObject()) {
    echo "
        <option value='{$categoria -> idcategoria}'>{$categoria -> descripcion}</option>
    ";
}