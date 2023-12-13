const moveToProductos = () => {
    window.location.href = '/productos'
}

const moveToProductPage = (idProducto) => {
    window.location.href = '/producto/' + idProducto;
}


const moveToMainPage = () => {
    window.location.href = '/';
}


const routerService = {moveToProductos, moveToProductPage, moveToMainPage}

export default routerService;