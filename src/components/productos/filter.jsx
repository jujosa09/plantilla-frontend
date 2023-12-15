import React, { useEffect, useState } from "react";
import productoService from "../../service/productoService";
import '../../assets/css/searchbar.css'

export default function Filter({setProductos, misProductos, setFiltrando}) {
    const [texto, setTexto] = useState('');

    useEffect(() => {
        if (texto.length !== 0) {
            productoService.getProductos(setProductos, texto);
        }

        if (texto.length === 0) {
            setFiltrando(false);
        } else {
            setFiltrando(true);
        }
    }, [texto])

    return(
        <>
        <div className="box">
            <form name="search" onSubmit={(e) => e.preventDefault()}>
                <input id='searchbar' type="text" className="input" name="buscar" placeholder='Buscar...' aria-label="Campo de entrada para buscar evento" onChange={() => setTexto(document.getElementById('searchbar').value)}/>
            </form>
            <i className="fa fa-search"></i>
        </div>
        </>
    )
}