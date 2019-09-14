<?php
require_once 'conexion.php';

$query = 'SELECT * FROM presentacion';

$resultados = $cnx -> query($query);

while ($presentacion = $resultados -> fetchObject()) {
    echo "
        <option value='{$presentacion -> idpresentacion}'>{$presentacion -> descripcion}</option>
    ";
}