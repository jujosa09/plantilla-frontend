import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Productos from './components/productos/paginaProductos.jsx'
import Usuario from './components/usuarios/paginaUsuarios.jsx'
import PaginaProducto from './components/productos/paginaProducto.jsx'
import PaginaPrincipal from './components/principal/Principal.jsx'
import App from './App.jsx'
import './assets/css/index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import UploadProduct from './components/productos/upload_producto.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaPrincipal />
  },
  {
    path: '/productos',
    element: <Productos />
  },
  {
    path: '/misProductos',
    element: <Productos misProductos={true}/>
  },
  {
    path: '/producto/:id',
    element: <PaginaProducto />
  },
  {
    path: '/usuario/:correo',
    element: <Usuario />
  },
  {
    path: '/upload_product/',
    element: <UploadProduct/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="238974970253-mvo7tdd604k7ktkure7caclm28nrlgo1.apps.googleusercontent.com">
      <RouterProvider router={router} />
      {/*<App />*/}
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
