import Axios from 'axios';

const getUsuarioByCorreo = async (correo, setUsuario) => {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}};
    await Axios.get("https://plantilla-backend.vercel.app/usuario?correo=" + correo,config)
    .then ((res) => {
        setUsuario(res.data)
    })
}


const getUsuario = async (token, setUsuario) => {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}};
    let result = await Axios.get("https://plantilla-backend.vercel.app/usuario/checkOrCreate?token=" + token,config);
    if(result.status === 200){
        setUsuario(JSON.stringify(result.data));
    }

}

const checkToken = async (token,logOutUser) => {
    try{
        const config = {headers: {'Access-Control-Allow-Origin': '*'}};
        let result = await Axios.get("https://plantilla-backend.vercel.app/usuario/checkToken?token=" + token,config)

        //En caso de que el token no sea valido se cierra la sesion
        if(result.status !== 200){
            logOutUser();
        }
    }catch (error) {
        logOutUser();
        console.error('Error al verificar el token de Google:', error);
    }


}


const usuarioService = {getUsuario, checkToken, getUsuarioByCorreo}

export default usuarioService;