import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editarProductoAction } from "../actions/productoActions"

const EditarProducto = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [ producto, setProducto ] = useState({
      nombre: '',
      precio: ''
   })

   // producto a editar
   const productoeditar = useSelector(state => state.productos.productoeditar)

   useEffect(() => {
      if(!productoeditar) {
         navigate('/')
      }
   }, [])

   useEffect(() => {
      setProducto(productoeditar)
   }, [productoeditar])

   const handleChangeForm = e => {
      setProducto({
         ...producto,
         [e.target.name]: e.target.value
      })
   }
   
   const { nombre, precio } = producto
   const handleGuardarProducto = e => {
      e.preventDefault()
      dispatch( editarProductoAction(producto) )
      navigate('/')
   }
   return (
      <div className="row justify-content-center">
         <div className="col-md-8">
            <div className="card">
               <div className="card-body">
                  <h2 className="text-center mb-4 font-weight-bold">
                     Editar Producto
                  </h2>

                  <form
                     onSubmit={handleGuardarProducto}
                  >
                     <div className="form-group">
                     <label >Nombre producto</label>
                     <input 
                        type="text" 
                        className="form-control"
                        placeholder="Nombre Producto"
                        name="nombre"
                        value={nombre}
                        onChange={handleChangeForm}
                     />
                     </div>
                     <div className="form-group">
                     <label >Precio producto</label>
                     <input 
                        type="number" 
                        className="form-control"
                        placeholder="Precio Producto"
                        name="precio"
                        value={precio}
                        onChange={handleChangeForm}
                     />
                     </div>

                     <button
                     type="submit"
                     className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                     >Guardar Cambios</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EditarProducto