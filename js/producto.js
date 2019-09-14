window.load = inicio();

let txtFiltro = $('#txtFiltro');
txtFiltro.keyup(() => listado(1, 'idproducto', txtFiltro.val()));

$('#ordenarId').click(() => listado(1, 'idproducto', txtFiltro.val()));
$('#ordenarNombre').click(() => listado(1, 'nombre', txtFiltro.val()));
$('#ordenarPrecio').click(() => listado(1, 'precio', txtFiltro.val()));
$('#ordenarFechaVencimiento').click(() =>
  listado(1, 'fecha_vencimiento', txtFiltro.val())
);
$('#ordenarPresentacion').click(() =>
  listado(1, 'p.descripcion', txtFiltro.val())
);
$('#ordenarCategoria').click(() =>
  listado(1, 'c.descripcion', txtFiltro.val())
);

function inicio() {
  listado(1, 'idproducto', '');
  listarPresentaciones();
  listarCategorias();
}

function listado(pag, campo, filtro) {
  $.ajax({
    url: 'php/lista.php',
    type: 'post',
    data: { pag: pag, campo: campo, filtro: filtro },
    success: function(data) {
      $('#registros').html(data);
    }
  });
  paginacion(filtro);
}

function confirmar(id) {
  $('#idProductoEliminar').val(id);
  $('#btnConfirmar').click(() => {
    eliminar(id);
    $('#confirmarEliminacion').modal('toggle');
  });
}

function eliminar(id) {
  $.ajax({
    url: 'php/eliminar.php',
    type: 'post',
    data: { id: id },
    success: function(data) {
      if (data == 1) {
        $('#divmsg').html('Registro eliminado');
        listado(1, 'idproducto', txtFiltro.val());
      } else {
        $('#divmsg').html('Error al eliminar el registro');
      }
      $('#divmsg').show();
      setInterval(() => {
        $('#divmsg').hide();
      }, 3000);
    }
  });
}

function paginacion(filtro) {
  $.ajax({
    url: 'php/paginacion.php',
    type: 'post',
    data: { filtro: filtro },
    success: function(data) {
      $('#divpaginas').html(data);
    }
  });
}

function guardar() {
  var id = $('#idProducto').val();
  var nombre = $('#txtNombre').val();
  var precio = $('#txtPrecio').val();
  var fecha_vencimiento = $('#txtFechaVencimiento').val();
  var presentacion = $('#cboPresentacion').val();
  var categoria = $('#cboCategoria').val();
  if (id > 0) {
    // Update
    $.ajax({
      url: 'php/actualizar.php',
      type: 'post',
      data: {
        id: id,
        nombre: nombre,
        precio: precio,
        fecha_vencimiento: fecha_vencimiento,
        presentacion: presentacion,
        categoria: categoria
      },
      success: function(data) {
        if (data == 1) {
          $('#divfrm').modal('toggle');
          $('#divmsg').html('Actualización exitosa!');
          listado(1, 'idproducto', txtFiltro.val());
        } else {
          $('#divmsg').html('Error en la actualización');
        }
        $('#divmsg').show();
        setInterval(() => {
          $('#divmsg').hide();
        }, 3000);
      }
    });
  } else {
    // Insert
    $.ajax({
      url: 'php/guardar.php',
      type: 'post',
      data: {
        nombre: nombre,
        precio: precio,
        fecha_vencimiento: fecha_vencimiento,
        presentacion: presentacion,
        categoria: categoria
      },
      success: function(data) {
        if (data == 1) {
          $('#divfrm').modal('toggle');
          $('#divmsg').html('Registro correcto');
          listado(1, 'idproducto', txtFiltro.val());
        } else {
          $('#divmsg').html('Error en el registro');
        }
        $('#divmsg').show();
        setInterval(() => {
          $('#divmsg').hide();
        }, 3000);
      }
    });
  }
}

function editar(id) {
  $.ajax({
    url: 'php/editar.php',
    type: 'post',
    data: { id: id },
    success: function(data) {
      var datos = JSON.parse(data);
      $('#idProducto').val(id);
      $('#txtNombre').val(datos.nombre);
      $('#txtPrecio').val(datos.precio);
      $('#txtFechaVencimiento').val(datos.fecha_vencimiento);
      $('#cboPresentacion').val(datos.idpresentacion);
      $('#cboCategoria').val(datos.idcategoria);
    }
  });
  $('#divfrm').modal('toggle');
}

function listarPresentaciones() {
  $.ajax({
    url: 'php/listarPresentaciones.php',
    type: 'post',
    success: data => {
      $('#cboPresentacion').html(data);
    }
  });
}

function listarCategorias() {
  $.ajax({
    url: 'php/listarCategorias.php',
    type: 'post',
    success: data => {
      $('#cboCategoria').html(data);
    }
  });
}
