import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
                <h1>Bienvenido/a Deportista</h1>
                <Typography style={{marginBottom: '3.5rem' }}><b>Nombre:</b> {usuarios.nombre} {usuarios.apellidos}</Typography>
            </Grid>
            <Grid container direction='column' alignItems='center' justifyContent='center'>
                        <div >
                            <Typography variant='h4' sx={{ flexGrow: 1 }} >Entrenamientos</Typography>
                            <Button variant="contained" onClick={()=> navigate('/listaUsuario')} style={{ marginTop: '2rem',marginLeft:'5.5rem',marginBottom: '2rem' }}>Acceder</Button>
                        </div>
                        <div>
                            <Typography variant='h4' sx={{ flexGrow: 1 }} >Datos de Cuenta</Typography>
                            <Button variant="contained"  style={{ marginTop: '2rem',marginLeft:'5.7rem',marginBottom: '2rem' }}>Acceder</Button>

                        </div>



            </Grid>
        </>
    )
}