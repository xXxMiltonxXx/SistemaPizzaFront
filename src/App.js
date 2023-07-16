//
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './componet/Inicio'
import UsuarioForm from './componet/UsuarioForm';
import UEntrenadorForm from './componet/UEntrenadorForm'
import UsuarioList from './componet/UsuarioList';
import MenuAdministrador from './componet/MenuAdministrador';
import MenuEntre from './componet/MenuEntrenador';
import MenuDeptor from './componet/MenuDeportista';
import DeportistaForm from './componet/DeportistaFrom';
import EntrenadorForm from './componet/EntrenadorForm';
import EntrenadorList from './componet/EntrenadorList';

import Navbar from './componet/Navbar';
import { Container } from '@mui/material'
import ProductoList from './componet/ProductoList';
import PromocionesList from './componet/PromocionesList';
import PromocionForm from './componet/PromocionForm'; 
import ProductoForm from './componet/ProductoForm';
import PedidoList from './componet/PedidoList';
import ClienteForm from './componet/ClienteForm';
import ProPedForm from './componet/ProPedForm';

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          //rutas creadas

          //primera ruta de login

          <Route path='/' element={<Inicio/>}/>

          //ruta por si es recepcionista

          <Route path='/MenuRecepcionista/:id' element={<MenuAdministrador/>}/>

          //ruta por si es un entrenador

          <Route path='/MenuEntrenador/:id' element={<MenuEntre/>}/>

          //ruta por si es un deportista

          <Route path='/MenuDeportista/:id' element={<MenuDeptor/>} />

          //lista de todos los administradores 

          <Route path='/listaUsuario' element={<UsuarioList />} />

          //lista de todos los pedidos 

          <Route path='/listaPedidos' element={<PedidoList />} />

          //lista de todos los empleados

          <Route path='/listaEmpleado' element={<EntrenadorList/>}/>

          //lista de todos los productos

          <Route path='/listaProductos' element={<ProductoList/>}/>

          //lista de todos los promocion

          <Route path='/listaPromociones' element={<PromocionesList/>}/>

          //ruta para crear un usuario deportista nuevo

          <Route path='/usuario/nuevo' element={<UsuarioForm />} />

          //ruta para crear un producto

          <Route path='/producto/nuevo' element={<ProductoForm />} />

          //ruta para crear un pedido

          <Route path='/pedido/nuevo' element={<ClienteForm />} />

          //ruta para crear un usuario entrenador nuevo

          <Route path='/uentrenador/nuevo' element={<UEntrenadorForm/>}/>

          //ruta para crear una promocion nueva

          <Route path='/promocion/nuevo' element={<PromocionForm/>}/>

          //ruta para crear un deportista

          <Route path='/usuario/nuevo/:id/dep' element={<DeportistaForm />} />
          
          //ruta para crear un entrenador

          <Route path='/usuario/nuevo/:id/entrenador' element={<EntrenadorForm/>}/>
          //ruta para crear un pedido

          <Route path='/usuario/nuevo/:id/pedidoPago' element={<ProPedForm/>}/>

          //ruta para editar un usuario deportista

          <Route path='/usuario/:id/editar' element={<UsuarioForm/>}/>

          ruta para editar un usuario entrenador 

          <Route path='/uentrenador/:id/editar' element={<UEntrenadorForm/>}/>

          ruta para editar un producto

          <Route path='/producto/:id/editar' element={<UEntrenadorForm/>}/>

        </Routes>
      </Container>
    </BrowserRouter>
  )
}