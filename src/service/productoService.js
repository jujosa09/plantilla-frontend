import Axios from 'axios';

const getProductos = async (setProductos, lugar) => {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}};
    await Axios.get("https://plantilla-backend.vercel.app/evento/"+lugar,config)
    .then((res) => {
        setProductos(res.data.eventos)
    })
}


const getProductoById = async (setProducto, idProducto) => {
  const config = {headers: {'Access-Control-Allow-Origin': '*'}};
  await Axios.get("https://plantilla-backend.vercel.app/evento/" + idProducto,config)
  .then((res) => {
      setProducto(res.data.evento)
  })
}

const addProduct = async (productoFormData) => {
  try {
    const config = {headers: {'Access-Control-Allow-Origin': '*'}};
    const response = await Axios.post("https://plantilla-backend.vercel.app/evento", productoFormData,config);
    return {status: response.data.status};
  } catch (error) {
    return {status: error.response.status, mensaje: error.response.data.message};
  }
};


  const deleteProduct = async (producto) => {
    try {
      const config = {headers: {'Access-Control-Allow-Origin': '*'}};
      const response = await Axios.delete('https://plantilla-backend.vercel.app/evento/' + producto,config);
      return {status: response.data.status}
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};


const productoService = {getProductos, getProductoById, addProduct, deleteProduct}

export default productoService;