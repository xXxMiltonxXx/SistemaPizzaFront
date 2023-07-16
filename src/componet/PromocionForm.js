//componentes de materia UI
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
//importar ocks de react
//capturar un estado 
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function PromocionForm() {
    //captura los datos
    const [usuario, colocarUsuario] = useState({
        //datos vacios
        promocion: '',
        fechaInicio: '',
        fechaFin: ''
    });

    const [loading, setloading] = useState(false)
    //estado de esdicion
    const [editing, setEditing] = useState(false)

    const navigate = useNavigate();
    //validacion
    const params = useParams();
    //evento para el formulario   
    const handleSubmit = async (e) => {
        //evitar que se refresque(el evento por defecto)
        e.preventDefault();

        setloading(true);

        if (editing) {
            //EDITAR USUARIO
            const response = await fetch(`http://localhost:4000/uentrenador/${params.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(usuario)
            });
            navigate('/listaEntrenador')
        } else {
            //CREAR UN NUEVO USUARIO ENTRENADOR 
            const res = await fetch('http://localhost:4000/usuario/promocion', {
                method: 'POST',
                body: JSON.stringify(usuario),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            setloading(false)
            navigate('/listaPromociones')

        }

    };
    //funcion cuando se tipea
    const handleChange = e => {
        colocarUsuario({ ...usuario, [e.target.name]: e.target.value });
    }
    //cargar datos 
    const cargarDatos = async (usuario) => {
        const res = await fetch(`http://localhost:4000/usuario/${usuario}`)
        const data = await res.json()
        colocarUsuario({ nombre: data.nombre, apellidos: data.apellidos, cedula: data.cedula, usuario: data.usuario, contasena: data.contrasena, telefono: data.telefono, email: data.email })
        // estado de edicion
        setEditing(true)
    }
    //validacion
    useEffect(() => {
        if (params.id) {
            cargarDatos(params.id)
        }
    }, [params.id])

    return (
        <Grid container direction='column' alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{ backgroundColor: '#C4C3C0', padding: '2rem' }}>
                    <Typography variant='5' textAlign='center' color='black'>
                        {editing ? "Actualizar usuario":"Crear Usuario"} 
                    </Typography>
                    {/* envento presonalizado onSubmit  */}
                    <CardContent>

                        <form onSubmit={handleSubmit}>
                            <TextField variant='filled' label='Promocion' sx={{ display: 'block', margin: '.5rem 0' }} name='promocion' value={usuario.promocion} onChange={handleChange} />

                            <TextField variant='filled' label='Fecha de inicio' type="date" sx={{ display: 'block', margin: '.5rem 0' }} name='fechaInicio' value={usuario.fechaInicio} onChange={handleChange} />

                            <TextField variant='filled' label='Fecha de fin' type="date" sx={{ display: 'block', margin: '.5rem 0' }} name='fechaFin' value={usuario.fechaFin} onChange={handleChange} />

                            <Button variant='contained' color='primary' type='submit' disabled={!usuario.promocion || !usuario.fechaInicio || !usuario.fechaFin }>
                                {loading ? (<CircularProgress color='inherit' size={25} />) : ("Guardar")}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}