import { Button, Card, CardContent, Drawer, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const drawerWidth = 240;

const sidebarStyles = {
    width: drawerWidth,
    backgroundColor: '#988dd6',

};
const buttonContainerStyles = {
    marginTop: '300px',
    width: '100%',
};
const h1Styles = {
    marginLeft: '150px',
};
const buttonStyles = {
    display: 'block',
    margin: '20px',
    width: '80%',
};

export default function MenuDeportista() {

    //captura los datos
    const [usuarios, colocarUsuario] = useState({
        //datos vacios
        nombre: '',
        apellidos: ''
    });
    //
    const navigate = useNavigate();
    //
    const params = useParams();
    //consulta sql
    const buscarUsuario = async (usuario) => {
        const res = await fetch(`http://localhost:4000/usuario/${usuario}`)
        const data = await res.json()
        colocarUsuario({ nombre: data.nombre, apellidos: data.apellidos })
    }
    //validacion 
    useEffect(() => {
        if (params.id)
            buscarUsuario(params.id);
    }, [params.id])
    return (
        <>

            <Grid >
                <h1 style={h1Styles}>Bienvenido Empleado</h1>
                <Typography style={{ marginBottom: '3.5rem', marginLeft: '150px' }}><b>Nombre:</b> {usuarios.nombre} {usuarios.apellidos}</Typography>
            </Grid>

            <div>
                <Drawer
                    variant="permanent"
                    style={sidebarStyles}
                    anchor="left"
                >
                    <div style={buttonContainerStyles}>
                        <Typography variant='h5' sx={{ flexGrow: 1, textAlign: "center" }} >Agregar </Typography>
                        <Button variant="contained" style={buttonStyles} onClick={() => navigate('/listaPedidos')}>Nuevo Pedido</Button>
                    </div>
                </Drawer>
                <main>
                    <Typography variant='h4' sx={{ flexGrow: 1, textAlign: "center" }} >Seleccione una opción </Typography>
                    <p style={{ marginTop: '50px', marginLeft: '30%' }}>Como usuario Cliente tiene multiples opciones como agregar</p>
                </main>
            </div>
        </>
    )
}