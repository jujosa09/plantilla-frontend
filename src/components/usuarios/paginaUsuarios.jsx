import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar'

import usuarioService from '../../service/usuarioService';
import Usuario from './usuario';


export default function paginaUsuario() {

    const [user, setUsuario] = useState({});
    let params = useParams();
    let correo = params.correo;

    useEffect(() => {
        usuarioService.getUsuarioByCorreo(correo, setUsuario);
    }, []);    

   
    return(
        <>
         <div className='container-fluid'>
            <NavBar ubicacion={user.correo === correo ? 'Mi perfil' : ''}/>
            {user && <Usuario usuario={user}/>}
        </div>
        </>
        
    )

    

    
}