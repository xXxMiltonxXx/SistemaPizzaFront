import { useEffect, useState } from "react"
import { AppBar, Box, Button, Card, CardContent, Container, Link, Toolbar, Typography } from "@mui/material"
import { display } from "@mui/system"
import { useNavigate } from "react-router-dom"
export default function ProductoList() {
    //
    const [usuarios, colocarUsuario] = useState([])
    //envia a una url
    const navigate = useNavigate()
    //Busca todos los usuarios con el rol de entrenador 
    const loadUsuarios = async () => {
        const res = await fetch('http://localhost:4000/usuario/producto')
        const data = await res.json()
        colocarUsuario(data)
    }
    //elimiar usuario 
    const handleDelete = async (usuario) => {
        try {
            await fetch(`http://localhost:4000/producto/${usuario}`, {
                method: "DELETE",
            });
            //filtrar elementos 
            colocarUsuario(usuarios.filter(user => user.id !== usuario));
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
                            <Button variant='contained' color='primary' onClick={() => navigate('/producto/nuevo')}>
                                Nuevo Producto
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <h1>Lista de Productos</h1>
            {
                usuarios.map((user) => (
                    <Card style={{ marginBottom: '.7rem', backgroundColor: '#c4c3c0' }} key={user.id}>

                        <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography><b>Id:</b> {user.id}</Typography>
                                <Typography><b>Empleado:</b>{user.empleado}</Typography>
                                <Typography><b>Promocion:</b> {user.promocion}</Typography>
                                <Typography><b>Descripcion:</b> {user.descripcion}</Typography>
                                <Typography><b>Precio:</b> {user.precio}</Typography>
                                <Typography><b>Producto:</b> {user.producto}</Typography>
                                <Typography><b>Stock:</b> {user.stock}</Typography>
                            </div>
                            <div>
                                {/* <Button variant='contained' color="inherit" onClick={() => navigate(`/producto/${user.usuario}/editar`)} >Editar</Button> */}
                                <Button variant='contained' color="warning" onClick={() => handleDelete(user.id)} style={{ marginLeft: '.6rem' }}>Eliminar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>

    )
}