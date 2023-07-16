import { useEffect, useState } from "react"
import { AppBar, Box, Button, Card, CardContent, Container, Link, Toolbar, Typography } from "@mui/material"
import { display } from "@mui/system"
import { useNavigate } from "react-router-dom"
export default function PedidoList() {
    //
    const [usuarios, colocarUsuario] = useState([])
    //envia a una url
    const navigate = useNavigate()
    //Busca todos los pedidos
    const loadUsuarios = async () => {
        const res = await fetch('http://localhost:4000/usuario/pedidos')
        const data = await res.json()
        colocarUsuario(data)
    }
    //elimiar usuario 
    const handleDelete = async (usuario) => {
        try {
            await fetch(`http://localhost:4000/usuario/${usuario}`, {
                method: "DELETE",
            });
            //filtrar elementos 
            colocarUsuario(usuarios.filter(user => user.usuario !== usuario));
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        loadUsuarios()
    }, [])
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' style={{backgroundColor: '#15191e'}}>
                    <Container>
                        <Toolbar>
                            <Button variant='contained' color='primary' onClick={() => navigate('/pedido/nuevo')}>
                                Nuevo Pedido
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <h1>Lista de Pedidos</h1>
            {
                usuarios.map((user) => (
                    <Card style={{ marginBottom: '.7rem', backgroundColor: '#c4c3c0' }} key={user.code_order}>

                        <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography><b>Id:</b> {user.code_order}</Typography>
                                <Typography><b>Cliente:</b> {user.customer_name}</Typography>
                                <Typography><b>Empleado:</b> {user.nombre}</Typography>
                                <Typography><b>Codigo de Orden:</b> {user.code_product}</Typography>
                                <Typography><b>Fecha:</b> {user.date_of_order}</Typography>
                                <Typography><b>Producto:</b> {user.product_name}</Typography>
                            </div>
                            <div>
                                <Button variant='contained' color="success" onClick={() => navigate(`/uentrenador/${user.code_order}/editar`)} style={{ marginRight: '.6rem' }} >Factura</Button>
                                <Button variant='contained' color="inherit" onClick={() => navigate(`/uentrenador/${user.code_order}/editar`)} >Editar</Button>
                                <Button variant='contained' color="warning" onClick={() => handleDelete(user.code_order)} style={{ marginLeft: '.6rem' }}>Eliminar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>

    )
}