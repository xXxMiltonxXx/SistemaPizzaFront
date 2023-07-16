import { useEffect, useState } from "react"
import { AppBar, Box, Button, Card, CardContent, Container, Link, Toolbar, Typography } from "@mui/material"
import { display } from "@mui/system"
import { useNavigate } from "react-router-dom"
export default function UsuarioList() {
    //
    const [usuarios, colocarUsuario] = useState([])
    //envia a una url
    const navigate = useNavigate()
    //
    const loadUsuarios = async () => {
        const res = await fetch('http://localhost:4000/usuario')
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
                            <Button variant='contained' color='primary' onClick={() => navigate('/usuario/nuevo')}>
                                Nuevo Administrador
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <h1>Lista de Administradores</h1>
            {
                usuarios.map((user) => (
                    <Card style={{ marginBottom: '.7rem', backgroundColor: '#c4c3c0' }} key={user.id}>

                        <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography><b>Id:</b> {user.id}</Typography>
                                <Typography><b>Rol:</b> {user.rol}</Typography>
                                <Typography><b>Nombre:</b> {user.nombre}</Typography>
                                <Typography><b>Apellidos:</b> {user.apellidos}</Typography>
                                <Typography><b>Cedula:</b> {user.cedula}</Typography>
                                <Typography><b>Nombre de usuario:</b> {user.usuario}</Typography>
                                <Typography><b>Contraseña:</b> {user.contrasena}</Typography>
                                <Typography><b>Telefono:</b> {user.telefono}</Typography>
                                <Typography><b>Correo Electronico:</b>{user.email}</Typography>
                            </div>
                            <div>
                                <Button variant='contained' color="inherit" onClick={() => navigate(`/usuario/${user.usuario}/editar`)} >Editar</Button>
                                <Button variant='contained' color="warning" onClick={() => handleDelete(user.usuario)} style={{ marginLeft: '.6rem' }}>Eliminar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>

    )
}