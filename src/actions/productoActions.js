import {
   AGREGAR_PRODUCTO,
   AGREGAR_PRODUCTO_EXITO,
   AGREGAR_PRODUCTO_ERROR,
   COMENZAR_DESCARGA_PRODUCTOS,
   DESCARGA_PRODUCTOS_EXITO,
   DESCARGA_PRODUCTOS_ERROR,
   OBTENER_PRODUCTO_ELIMINAR,
   PRODUCTO_ELIMINADO_EXITO,
   PRODUCTO_ELIMINADO_ERROR,
   OBTENER_PRODUCTO_EDITAR,
   COMENZAR_EDICION_PRODUCTO,
   PRODUCTO_EDITADO_EXITO,
   PRODUCTO_EDITADO_ERROR
} from '../types'
import clienteAxios from "../config/axios"
import Swal from "sweetalert2"
// crear nuevos productos
export function crearNuevoProductoAction(producto) {
   return async (dispatch) => {
      dispatch( agregarProducto() )

      try {
         await clienteAxios.post('/productos', producto)
         dispatch ( agregarProductoExito(producto) )
         // Alerta
         Swal.fire(
            'Correcto',
            'El producto se agregó correctamente',
            'success'
         )
      } catch (error) {
         console.log(error);
         dispatch ( agregarProductoError(true) )
         // alerta de error
         Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error, intenta de nuevo'
         })
      }
   }
}
// agregar producto al state
const agregarProducto = () => ({
   type: AGREGAR_PRODUCTO,
   payload: true
})
// si el producto se guardo exitosamene en la bd
const agregarProductoExito = producto => ({
   type: AGREGAR_PRODUCTO_EXITO,
   payload: producto
})
// si el producto no se guardo en la bd
const agregarProductoError = estado => ({
   type: AGREGAR_PRODUCTO_ERROR,
   payload: estado
})
// crear nuevos productos
export function obternerProductosAction() {
   return async (dispatch) => {
      dispatch( descargarProductos() )
      try {
         const respuesta = await clienteAxios.get('/productos')
         // console.log(respuesta.data);
         dispatch( descargaProductosExitosa(respuesta.data) )
      } catch (error) {
         dispatch( descargaProductosError() )
      }
   }
}
// hacer saber que estamos obteniendo producto
const descargarProductos = () => ({
   type: COMENZAR_DESCARGA_PRODUCTOS,
   payload: true
})
// si el producto se obtiene exitosamene de la bd
const descargaProductosExitosa = productos => ({
   type: DESCARGA_PRODUCTOS_EXITO,
   payload: productos
})
// si el producto no se obtiene de la bd
const descargaProductosError = () => ({
   type: DESCARGA_PRODUCTOS_ERROR,
   payload: true
})

export function borrarProductoAction(id) {
   return async (dispatch) => {
      dispatch(obtenerProductoEliminar(id) )
      try {
         await clienteAxios.delete(`/productos/${id}`)
         // console.log(resultado);
         dispatch( eliminarProductoExito() )
         // Alerta
         Swal.fire(
            'Eliminado!',
            'El producto se elimino correctamente.',
            'success'
         )
      } catch (error) {
         dispatch( eliminarProductoError() )
      }
   }
}
const obtenerProductoEliminar = id => ({
   type: OBTENER_PRODUCTO_ELIMINAR,
   payload: id
})
const eliminarProductoExito = () => ({
   type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = () => ({
   type: PRODUCTO_ELIMINADO_ERROR,
   payload: true
})
//colocar producto en edicion
export function obtenerProductoEditarAction(producto) {
   return (dispatch) => {
      dispatch( obtenerProductoEditar(producto) )
   }
}
const obtenerProductoEditar = producto => ({
   type: OBTENER_PRODUCTO_EDITAR,
   payload: producto
})
// edita un registro en la api y state
export function editarProductoAction(producto) {
   return async (dispatch) => {
      dispatch( editarProducto() )
      try {
         await clienteAxios.put(`/productos/${producto.id}`, producto)
         dispatch( editarProductoExito(producto) )
      } catch (error) {
         dispatch( editarProductoError() )
      }
   }
}
const editarProducto = () => ({
   type: COMENZAR_EDICION_PRODUCTO
})
const editarProductoExito = producto => ({
   type: PRODUCTO_EDITADO_EXITO,
   payload: producto
})
const editarProductoError = () => ({
   type: PRODUCTO_EDITADO_ERROR,
   payload: true
})