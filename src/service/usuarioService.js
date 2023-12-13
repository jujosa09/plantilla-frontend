import Axios from 'axios';

const getUsuarioByCorreo = async (correo, setUsuario) => {
    await Axios.get("https://plantilla-backend.vercel.app/usuario?correo=" + correo)
    .then ((res) => {
        setUsuario(res.data)
    })
}


const getUsuario = async (token, setUsuario) => {
    let result = await Axios.get("https://plantilla-backend.vercel.app/usuario/checkOrCreate?token=" + token);
    if(result.status === 200){
        setUsuario(JSON.stringify(result.data));
    }

}

const checkToken = async (token,logOutUser) => {
    try{
        let result = await Axios.get("https://plantilla-backend.vercel.app/usuario/checkToken?token=" + token)

        //En caso de que el token no sea valido se cierra la sesion
        if(result.status !== 200){
            logOutUser();
        }
    }catch (error) {
        logOutUser();
        console.error('Error al verificar el token de Google:', error);
    }


}


const usuarioService = {getUsuario, checkToken, getValoraciones, getRating, getUsuarioByCorreo}

export default usuarioService;