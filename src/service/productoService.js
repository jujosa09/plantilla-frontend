import Axios from 'axios';
import logOut from '../components/oauth/GoogleOauth'
const getProductos = async (setProductos, token) => {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
    await Axios.get("https://plantilla-backend.vercel.app/producto", config)
    .then((res) => {
      if(res.status != 401){
        setProductos(res.data.productos)
      }else{
          logOut()
      }
    })
}

const filtrarProductos = async (setProductos, usuario, texto, orden, token) => {
  const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
  await Axios.post("https://plantilla-backend.vercel.app/producto/filter", {
    usuario: usuario,
    texto: texto,
    orden: orden
  }, config).then((res) => {
    if(res.status != 401){
      setProductos(res.data.productos)
    }else{
        logOut()
    }
  });
}

const getProductoById = async (setProducto, idProducto, token) => {
  const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
  await Axios.get("https://plantilla-backend.vercel.app/producto/" + idProducto, config)
  .then((res) => {

      if(res.status != 401){
        setProducto(res.data.producto)
      }else{
          logOut()
      }
  })
}

const getProductosByUsuario = async (setProductos, usuario, token) => {
  const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
  await Axios.get("https://plantilla-backend.vercel.app/producto?usuario=" + usuario, config)
  .then((res) => {
    if(res.status != 401){
      setProductos(res.data.productos)
    }else{
        logOut()
    }
  })
}


const addProduct = async (productoFormData, token) => {
  try {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
    const response = await Axios.post("https://plantilla-backend.vercel.app/producto", productoFormData,config);
    if(response.status != 401){
      return {status: response.data.status};
    }else{
        logOut()
    }
  } catch (error) {
    return {status: error.response.status, mensaje: error.response.data.message};
  }
};


  const deleteProduct = async (producto, token) => {
    try {
      const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
      const response = await Axios.delete('https://plantilla-backend.vercel.app/producto/' + producto,config);
      if(response.status != 401){
        return {status: response.data.status}
      }else{
          logOut()
      }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};


const getCoordenadasByCodPostal = async (producto, setCoordenadas, token) => {
  try {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
    if(producto.direccion && producto.direccion !== 29080){
      await Axios.get('https://plantilla-backend.vercel.app/carbono/coord?codPostal=' + producto.direccion,config).then((res) => {
        if(res.status != 401){
          res.data.title = producto.nombre
          setCoordenadas(res.data)
        }else{
            logOut()
        }

      })
    }
  } catch (error) {
    console.error(error);
  }
}


const getCoordenadasListByCodPostal = async (productos, setCoordenadas, token) => {
  try {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}, Authorization: `Bearer ${token}`};
    let coordenadas = [];

    for (const producto of productos) {
      if(producto.direccion && producto.direccion !== 29080){
        const response = await Axios.get('https://plantilla-backend.vercel.app/carbono/coord?codPostal=' + producto.direccion, config);
        if(response.status != 401){
          response.data.title = producto.nombre
          coordenadas.push(response.data);
        }else{
            logOut()
        }
      }
      
    }
    setCoordenadas(coordenadas);
  } catch (error) {
    console.error(error);
  }
}


const productoService = {getProductos, filtrarProductos, getProductosByUsuario, getProductoById, addProduct, deleteProduct, getCoordenadasByCodPostal,getCoordenadasListByCodPostal}

export default productoService;