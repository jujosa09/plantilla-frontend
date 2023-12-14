import React from 'react'
import { useEffect, useState } from 'react'
import productoService from '../../service/productoService';
import NavBar from '../NavBar'
import Producto from './producto'
import '../../assets/css/productsPage.css'
import GMap from '../maps/GoogleMap';
import Filter from './filter';


export default function paginaProductos({ misProductos }) {
    const usuario = localStorage.getItem("email")
    const [productos, setProductos] = useState([]);
    const [filtrando, setFiltrando] = useState(false);
    const [coordenadas, setCoordenadas] = useState([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (misProductos) {
            productoService.getProductosByUsuario(setProductos, usuario, token);
        } else {
            productoService.getProductos(setProductos, token);
        }
    }, []);

    useEffect(() => {
        productoService.getCoordenadasListByCodPostal(productos, setCoordenadas, token)
    }, [productos])

    return(
        <>
        <div className="container-fluid main-div">
            <div className="row">
                <NavBar ubicacion={misProductos? 'Mis Productos' : "Productos"}/>
            </div>
            <div className="row" id='titulo'>
                <div className="col-md-12">
                    {misProductos? 
                        (
                        productos.length === 0? 
                            filtrando?
                            <h2 tabIndex="0" className='product-page-title title'>No se ha encontrado ningún producto según el filtro</h2>
                            :
                            <><h2 className='product-page-title title'>No tienes productos registrados actualmente</h2></> 
                        : 
                            <h2 className='product-page-title title'><b>Mis productos</b></h2>
                        )  
                    : 
                        (
                        productos.length !== 0? 
                            <h2 tabIndex="0" className='product-page-title title'><b>Sección de los productos</b></h2> 
                        :  
                            filtrando?
                            <h2 tabIndex="0" className='product-page-title title'>No se ha encontrado ningún producto según el filtro</h2>
                            :
                            <h2 tabIndex="0" className='product-page-title title'><b>No hay ningún producto actualmente en subasta</b></h2>
                        )
                    }
                    
                    <Filter setProductos={setProductos} misProductos={misProductos} usuario={usuario} setFiltrando={setFiltrando}/>
                </div>
            </div>
            <div className='row' style={{width: "100%"}}>
                <div className='col' style={{backgroundColor: "", width: "100%"}}>
                    <br/>
                    <br/>
                    <div className="item active">
                        <div className="row">
                            {productos.map((producto, key) => {
                                return(
                                    <div className='placement-anuncios' key={key}>
                                        <Producto producto={producto}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-5 bg-light">
                <section className='map-section'>
                {coordenadas.length !== 0?
                    <>
                    <GMap locations={[coordenadas]}/>
                    </>
                :
                    <></>
                }
                </section>
                
            </section>
        </div>
        </>
    )
}