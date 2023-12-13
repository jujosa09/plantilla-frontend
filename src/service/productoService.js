import Axios from 'axios';

const getProductos = async (setProductos) => {
    await Axios.get("https://plantilla-backend.vercel.app/producto")
    .then((res) => {
        setProductos(res.data.productos)
    })
}

const filtrarProductos = async (setProductos, usuario, texto, orden) => {
  await Axios.post("https://plantilla-backend.vercel.app/producto/filter", {
    usuario: usuario,
    texto: texto,
    orden: orden
  }).then((res) => {
    setProductos(res.data.productos)
  });
}

const getProductoById = async (setProducto, idProducto) => {
    await Axios.get("https://plantilla-backend.vercel.app/producto/" + idProducto)
    .then((res) => {
        setProducto(res.data.producto)
    })
}

const getProductosByUsuario = async (setProductos, usuario) => {
    await Axios.get("https://plantilla-backend.vercel.app/producto?usuario=" + usuario)
    .then((res) => {
        setProductos(res.data.productos)
    })
}


const addProduct = async (productoFormData) => {
    try {
      const response = await Axios.post("https://plantilla-backend.vercel.app/producto", productoFormData);
      return {status: response.data.status};
    } catch (error) {
      return {status: error.response.status, mensaje: error.response.data.message};
    }
  };


  const deleteProduct = async (producto) => {
    try {
        const response = await Axios.delete('https://plantilla-backend.vercel.app/producto/' + producto);
        return {status: response.data.status}
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};


const getCoordenadasByCodPostal = async (producto, setCoordenadas) => {
  try {
    if(producto.direccion && producto.direccion !== 29080){
      await Axios.get('https://plantilla-backend.vercel.app/carbono/coord?codPostal=' + producto.direccion).then((res) => {
        res.data.title = producto.nombre
        setCoordenadas(res.data)
      })
    }
  } catch (error) {
    console.error(error);
  }
}


const getCoordenadasListByCodPostal = async (productos, setCoordenadas) => {
  try {
    let coordenadas = [];

    for (const producto of productos) {
      if(producto.direccion && producto.direccion !== 29080){
        const response = await Axios.get('https://plantilla-backend.vercel.app/carbono/coord?codPostal=' + producto.direccion);
        response.data.title = producto.nombre
        coordenadas.push(response.data);
      }
      
    }
    setCoordenadas(coordenadas);
  } catch (error) {
    console.error(error);
  }
}


const productoService = {getProductos, filtrarProductos, getProductosByUsuario, getProductoById, addProduct, deleteProduct, getCoordenadasByCodPostal,getCoordenadasListByCodPostal}

export default productoService;