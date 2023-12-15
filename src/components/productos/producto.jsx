import routerService from '../../service/routerService'
import ImageNotFound from '../../assets/images/imagenotfound.jpg'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productoService from '../../service/productoService';

export default function producto({producto}) {

    let cierreSubasta = producto.timestamp;

    console.log(cierreSubasta)

    const token = localStorage.getItem("googleToken") || "";
    let params = useParams();
    let usuario = params.usuario;

    const user = localStorage.getItem("email");    

    const handleEliminarProducto = async (productoId) => {
        // Lógica para eliminar el producto
        await productoService.deleteProduct(productoId);
      
        // Redireccionar a la página de productos (o donde sea necesario)
        window.location.reload();
      };
    

  return(
    <>
    <div className='card anuncio' tabIndex="0" aria-label={producto.nombre} style={{boxShadow: "2px 2px 5px"}}>
        <div className='card-header anuncio-header' tabIndex="0">
            <span style={{float: "left"}}>Subido por <a>{producto.organizador}</a></span>
        </div>
        <div className='card-body anuncio-thumbnail' style={{width: '100%'}}>
            <div className='placement-imagen'>
                    <div>
                        Quedada el {cierreSubasta}
                    </div>
                <img src={producto.imagen !== undefined && producto.imagen !== null? producto.imagen : ImageNotFound} alt={producto.descripcion === null? producto.nombre + '. Este anuncio no tiene descripción.' : producto.nombre + '. Descripción: ' + producto.descripcion} 
                tabIndex="0" onClick={() => routerService.moveToProductPage(producto._id)}/>
            </div>
            <div className='anuncio-info'>
                <p className={producto.nombre.length >= 20? 'nombre-anuncio size-small' : 'nombre-anuncio size-large'} tabIndex="0"><b>{producto.nombre.length > 20? producto.nombre.toString().substring(0,22) + '...' : producto.nombre}</b></p><br/>
                {/*<span style={{float: 'right'}} tabIndex="0">{producto.fechaInicio.toString().substring(0,10)}</span>*/}
            </div>
        </div>
        <div className='card-body' style={{width: '100%', marginTop: "20px", marginBottom: "0px"}}>
            <br/>
            { producto.organizador === user && producto.puja === undefined && <button className='button-anuncio eliminar' 
                onClick={() => handleEliminarProducto(producto._id, user)}>Eliminar</button>
            }

            
            <button className='button-anuncio info' onClick={() => routerService.moveToProductPage(producto._id)}>+ Info</button>
        </div>
    </div>
    </>
  )
}
