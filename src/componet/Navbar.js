import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link,useNavigate } from 'react-router-dom'
export default function Navbar() {
    const navigate=useNavigate()
    return (
        <Box sx={{flexGrow:1}}>
            <AppBar position='static' color='inherit'>
                <Container>
                    <Toolbar>
                        <Typography variant='h5' sx={{flexGrow:1}}>
                            <Link to='/listaUsuario' style={{textDecoration:'none', color:'#000'}}> Usuarios </Link>
                        </Typography>
                        <Button variant='contained' color='primary' onClick={()=> navigate('/usuario/nuevo')}>
                            Nuevo Usuario
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}