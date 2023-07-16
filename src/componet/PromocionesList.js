import { useEffect, useState } from "react"
import { AppBar, Box, Button, Card, CardContent, Container, Link, Toolbar, Typography } from "@mui/material"
import { display } from "@mui/system"
import { useNavigate } from "react-router-dom"
export default function PromocionesList() {
    //
    const [usuarios, colocarUsuario] = useState([])
    //envia a una url
    const navigate = useNavigate()
    //Busca todos los usuarios con el rol de entrenador 
    const loadUsuarios = async () => {
        const res = await fetch('http://localhost:4000/usuario/promociones')
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
                            <Button variant='contained' color='primary' onClick={() => navigate('/promocion/nuevo')}>
                                Nueva Promocion
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <h1>Lista de Promociones</h1>
            {
                usuarios.map((user) => (
                    <Card style={{ marginBottom: '.7rem', backgroundColor: '#c4c3c0' }} key={user.id}>

                        <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography><b>Id:</b> {user.id}</Typography>
                                <Typography><b>Promocion:</b> {user.promocion}</Typography>
                                <Typography><b>Fecha de Inicio:</b> {user.fecha_inicio}</Typography>
                                <Typography><b>Fecha Final:</b> {user.fecha_final}</Typography>
                            </div>
                            <div>
                                {/* <Button variant='contained' color="inherit" onClick={() => navigate(`/uentrenador/${user.usuario}/editar`)} >Editar</Button> */}
                                <Button variant='contained' color="warning" onClick={() => handleDelete(user.usuario)} style={{ marginLeft: '.6rem' }}>Eliminar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>

    )
}