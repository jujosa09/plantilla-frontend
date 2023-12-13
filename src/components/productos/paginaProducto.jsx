import React from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from "../NavBar";
import productoService from "../../service/productoService";
import Swal from 'sweetalert2';
import GMap from '../maps/GoogleMap';
import '../../assets/css/productPage.css'
import routerService from '../../service/routerService';
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

    const [userLocation, setUserLocation] = useState([]);
    // define the function that finds the users geolocation
    const getUserLocation = () => {
        // if geolocation is supported by the users browser
        if (navigator.geolocation) {
            // get the current users location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // save the geolocation coordinates in two variables
                    const { latitude, longitude } = position.coords;
                    // update the value of userlocation variable
                    setUserLocation({ latitude, longitude });
                },
                // if there was an error getting the users location
                (error) => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'No se puede obtener la localización del navegador',
                        html: 'Por favor, compruebe que tiene los servicios de geolocalización de su navegador activados para realizar la estimación de la tasa adicional por la emisión de CO2 en el transporte del producto. <br/><br/> En caso contrario esta tasa no podrá calcularse.'
                    })
                }
            );
        }
        // if geolocation is not supported by the users browser
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    if (userLocation.length === 0) {
        getUserLocation();
    }

    const [carbono, setCarbono] = useState(null); 

    useEffect(() => {
        if (userLocation.length !== 0) {
            productoService.calcularHuellaCarbono(userLocation, producto.direccion, setCarbono);
        }
    }, [userLocation, producto])
    


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
                            <div className='row'>
                                {
                                    subastaCerrada?
                                    <p style={{float: 'left'}}>Esta subasta <b>ya está cerrada.</b></p>
                                    :
                                    <p style={{float: 'left'}}>Esta subasta termina el {cierreSubasta.toString().substring(7, 10)} {cierreSubasta.toString().substring(4,7)} {cierreSubasta.toString().substring(11,15)} (Quedan {diffDays} días). </p>
                                }
                            </div>
                        </div>
                        <div className="container-fluid bg-trasparent my-4 p-3"> 
                            <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" style={{height: "10%"}}> 
                                <div className="col puja-container"> 
                                    <div className="card h-100 shadow-sm"> 
                                        <div className="label-top shadow-sm">{
                                            subastaCerrada?
                                            'Subasta finalizada'
                                            :
                                            'Puja más alta'
                                        }</div> 
                                        <div className="card-body" style={{height: "120px", padding: '0px'}}> 
                                            <div className="clearfix mb-3"> 
                                                {
                                                    producto.puja !== undefined && producto.puja != {}?
                                                    <><span className="float-start badge rounded-pill bg-danger" style={{fontSize: "30px"}}>{producto.puja.cantidad}&euro;</span>
                                                    <br/>
                                                    <span style={{float: 'right'}}>Realizada el {producto.puja.fecha.toString().substring(0,10).replaceAll('-', '/')} a las {producto.puja.fecha.toString().substring(11,16)}</span></>
                                                    :
                                                    <><p>Aún no se ha realizado ninguna puja sobre este producto.</p></>
                                                }
                                            </div> 
                                            {!subastaCerrada?
                                                <>
                                                <div className="text-center my-4"> 
                                                    {usuario !== producto.usuario? (
                                                        <>
                                                        <a href="#" className="btn btn-warning" onClick={(e) => {
                                                            e.preventDefault();
                                                            Swal.fire({
                                                                icon: 'info',
                                                                title: 'Vas a realizar una puja',
                                                                showCancelButton: true,
                                                                confirmButtonText: 'Entendido',
                                                                html: 'Va a pujar sobre el producto ' + producto.nombre + '. <br/><br/> Por favor, entienda que al '
                                                                + 'realizar esta operación se compromete a pagar la cantidad pujada en caso de ser el ganador '
                                                                + 'de la subasta en un plazo menor a 7 días. En caso de no ser así, se le penalizará en esta '
                                                                + 'aplicación. <br/><br/> <b>Esta acción no se podrá deshacer</b>'
                                                                
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    Swal.fire({
                                                                        title: 'Introduzca la cantidad a pujar',
                                                                        input: 'number',
                                                                        showCancelButton: true,
                                                                        showLoaderOnConfirm: true,
                                                                        preConfirm: async (cantidad) => {
                                                                            return await productoService.pujar(usuario, cantidad, producto._id);
                                                                        },
                                                                        allowOutsideClick: () => !Swal.isLoading()
                                                                    }).then((result) => {
                                                                        if (result.value.status) {
                                                                            Swal.fire({
                                                                                icon: 'error',
                                                                                title: 'No se puede realizar la puja',
                                                                                text: result.value.mensaje
                                                                            })
                                                                        } else {
                                                                            Swal.fire({
                                                                                icon: 'success',
                                                                                title: 'Puja realizada con éxito',
                                                                                text: 'Ahora eres el usuario con la puja más alta para este producto. Puedes ver el estado de este producto en la sección de "Mis pujas".'
                                                                            }).then((result) => {
                                                                                if (result.isConfirmed) {
                                                                                    routerService.moveToProductPage(producto._id);
                                                                                }
                                                                            })       
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }}><b>Pujar</b></a> 
                                                        </>
                                                    ) : (
                                                        <>
                                                        <a href="#" className="btn btn-secondary" onClick={() => {
                                                        Swal.fire({
                                                            icon: 'info',
                                                            title: 'No puedes realizar la puja',
                                                            confirmButtonText: 'Entendido',
                                                            html: 'Eres el propietario del producto ' + producto.nombre + ' y no puedes pujar sobre él.'
                                                            
                                                        })
                                                        }}><b>Pujar</b></a> 
                                                        </>
                                                    )}
                                                </div> 
                                                </>
                                                :
                                                <>                                                
                                                <div className="text-center my-4"> 
                                                    <a href="#" className="btn btn-secondary" style={{cursor: "default"}}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            icon: 'info',
                                                            title: 'La subasta está cerrada',
                                                            text: 'No puedes pujar por la subasta porque ya ha terminado.'
                                                        })
                                                    }}><b>Pujar</b></a> 
                                                </div> 
                                                </>
                                            }
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <hr/>
        {
            carbono !== null?
            <>
            <p>Según la distancia entre su localización y la del producto se calcula una tasa extra por la huella de carbono emitida en el transporte del mismo.</p>
            <p>La estimación de la cantidad de CO2 emitida en el transporte de este producto a su localización es de <b>{carbono.toString().substring(0,6)}Kg</b></p>
            <p>Con dicha estimación, la tasa adicional calculada es de <b>{(Number(carbono)/10 * producto.precioInicial).toString().substring(0,5)}€</b></p>
            
            </>
            :
            <>
            <p>Calculando tasa adicional de CO2...</p>
            </>
        }
        <hr/>

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