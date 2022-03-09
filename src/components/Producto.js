import React from 'react'
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
// Redux
import { useDispatch } from "react-redux"
import { borrarProductoAction, obtenerProductoEditarAction } from "../actions/productoActions"

const Producto = ({producto}) => {
   const { nombre, precio, id } = producto   
   const dispatch = useDispatch()
   let navigate = useNavigate();
   // Confirmar si desea eliminar Producto
   const confirmarEliminarProducto = id => {
      // preguntar al usuario
      Swal.fire({
         title: '¿Estas seguro?',
         text: "Un producto que se elimina no se puede recuperar",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, eliminar!',
         cancelButtonText: 'Cancelar'
      }).then((result) => {
         if (result.value) {
            // pasar al action
            dispatch( borrarProductoAction(id) )
         }
      })
   }
   const redireccionarEdicion = producto => {
      dispatch( obtenerProductoEditarAction(producto) )
      navigate(`/productos/editar/${producto.id}`);
   }
   return (
      <tr>
         <td>{nombre}</td>
         <td className="font-weight-bold"> $ {precio} </td>
         <td className="acciones">
            <button 
               type="button"
               onClick={() => redireccionarEdicion(producto)}
               className="btn btn-primary mr-2"
            >Editar</button>
            <button 
               type="button"
               className="btn btn-danger"
               onClick={() => confirmarEliminarProducto(id)}
            >Eliminar</button>
         </td>
      </tr>
   )
}

export default Producto