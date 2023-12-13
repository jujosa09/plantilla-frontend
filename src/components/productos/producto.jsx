import routerService from '../../service/routerService'
import ImageNotFound from '../../assets/images/imagenotfound.jpg'
import chatService from '../../service/chatService'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productoService from '../../service/productoService';

export default function producto({producto}) {

    let cierreSubasta = new Date(producto.fechaCierre);
    let hoy = new Date();
    let subastaCerrada = hoy > cierreSubasta;

    let diffTime = Math.abs(hoy - cierreSubasta);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
            <span style={{float: "left"}}>Subido por <a href={'/usuario/' + producto.usuario}>{producto.usuario}</a></span>
        </div>
        <div className='card-body anuncio-thumbnail' style={{width: '100%'}}>
            <div className='placement-imagen'>
                    <div className={subastaCerrada?  'fecha-cierre cerrada shadow-sm' : (diffDays <= 10? 'fecha-cierre peligro shadow-sm' : 'fecha-cierre abierta shadow-sm')}>
                        Hasta {cierreSubasta.toString().substring(3,15)}
                    </div>
                    {
                        subastaCerrada?
                        <>
                        <div className='finalizada-aviso-imagen shadow-sm'>
                            SUBASTA FINALIZADA
                        </div>
                        </>
                        :
                        <>
                        </>
                    }
                <img src={producto.imagen !== undefined && producto.imagen !== null? producto.imagen : ImageNotFound} alt={producto.descripcion === null? producto.nombre + '. Este anuncio no tiene descripción.' : producto.nombre + '. Descripción: ' + producto.descripcion} 
                tabIndex="0" onClick={() => routerService.moveToProductPage(producto._id)}/>
            </div>
            <div className='anuncio-info'>
                <p className={producto.nombre.length >= 20? 'nombre-anuncio size-small' : 'nombre-anuncio size-large'} tabIndex="0"><b>{producto.nombre.length > 20? producto.nombre.toString().substring(0,22) + '...' : producto.nombre}</b></p><br/>
                <p className='precio-anuncio' tabIndex="0"><span>Precio actual: &nbsp; <span className="badge rounded-pill bg-precio" style={{fontSize: "20px"}}>{producto.puja !== undefined && producto.puja != {}? producto.puja.cantidad : producto.precioInicial} &euro;</span></span></p>
                <p className='precio-anuncio' tabIndex="0">Precio inicial: &nbsp; {producto.precioInicial} €</p> 
                {/*<span style={{float: 'right'}} tabIndex="0">{producto.fechaInicio.toString().substring(0,10)}</span>*/}
            </div>
        </div>
        <div className='card-body' style={{width: '100%', marginTop: "20px", marginBottom: "0px"}}>
            <br/>
            { producto.usuario === user && producto.puja === undefined && <button className='button-anuncio eliminar' 
                onClick={() => handleEliminarProducto(producto._id, user)}>Eliminar</button>
            }

            
            <button className='button-anuncio info' onClick={() => routerService.moveToProductPage(producto._id)}>+ Info</button>
        </div>
    </div>
    </>
  )
}
