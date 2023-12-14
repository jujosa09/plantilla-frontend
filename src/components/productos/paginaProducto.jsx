import React from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from "../NavBar";
import productoService from "../../service/productoService";
import GMap from '../maps/GoogleMap';
import '../../assets/css/productPage.css'
import ImageNotFound from '../../assets/images/imagenotfound.jpg'

export default function PaginaProducto() {

    const usuario = localStorage.getItem('email');

    const [producto, setProducto] = useState([]);
    const [coordenadas, setCoordenadas] = useState([]);

    let param = useParams();
    let idProducto = param.id;

    //////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchData = async() => {
            await productoService.getProductoById(setProducto, idProducto);
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (producto.length !== 0) {
            productoService.getCoordenadasByCodPostal(producto, setCoordenadas)
        }
    }, [producto])

    //////////////////////////////////////////////////////////////////////

    let cierreSubasta = new Date(producto.fechaCierre);
    let hoy = new Date();
    let subastaCerrada = hoy > cierreSubasta;

    let diffTime = Math.abs(hoy - cierreSubasta);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //////////////////////////////////////////////////////////////////////

    let imagenProducto = new Image();
    imagenProducto.src = producto.imagen;

    //////////////////////////////////////////////////////////////////////
   
    
    return(
        <>
        <NavBar />
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6" style={{height: "500px", objectFit: 'contain'}}>
                        {
                            subastaCerrada?
                            <>
                            <div className='finalizada-aviso shadow-sm'>
                                SUBASTA FINALIZADA
                            </div>
                            </>
                            :
                            <>
                            </>
                        }
                        <img className="card-img-top mb-5 mb-md-0" src={producto.imagen !== undefined? producto.imagen : ImageNotFound} alt="..." style={imagenProducto.height > imagenProducto.width? {height: '500px', width: 'auto'} : {height: 'auto', width: '500px'}}/>
                    </div>
                    <div className="col-md-6">
                        <div className="small mb-1"><a href={'/usuario/' + producto.usuario}>{producto.usuario}</a></div>
                        <hr/>
                        <h1 className="display-5 fw-bolder">{producto.nombre}</h1>
                        <div className="fs-5 mb-5">
                            <span>
                            </span>
                            <p className="lead">{producto.descripcion}</p>
                            <hr/>
                            <div className='row'><p style={{float: 'left'}}>Subasta iniciada con un precio de {producto.precioInicial} €</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-5 bg-light">
            {coordenadas.length !== 0?
                <>
                <p>Localización aproximada del producto (código postal {producto.direccion}):</p>
                <GMap locations={[coordenadas]}/>
                </>
            :
                <></>
            }
            
        </section>
        </>
    )
}