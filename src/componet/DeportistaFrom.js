//componentes de materia UI
import { Button, Card, CardContent, CircularProgress, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
//importar ocks de react
//capturar un estado 
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function DeportistaForm() {
    //captura los datos
    
    const [usuarios, colocarUsuario] = useState({
        //datos vacios
        id:'',
    });
    const [deportista, colocarDeportista] = useState({
        //datos vacios
        tipo:Number(''),
        id:Number(''),
        peso: '',
        altura: '',
        estado: ''
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

            const res = await fetch('http://localhost:4000/usuario/deportista', {
                method: 'POST',
                body: JSON.stringify(deportista),
                headers: { 'Content-Type': 'application/json' },
            }); 
                const data = await res.json();
                console.log(data)
                navigate('/listaUsuario')

        }

    // };
    //funcion cuando se tipea
    const handleChange = e => {
        colocarDeportista({ ...deportista, [e.target.name]: e.target.value });
        console.log(deportista)
        
    }
    //cargar datos 
    const cargarDatos = async (usuario) => {
        const res = await fetch(`http://localhost:4000/usuario/${usuario}`)
        const data = await res.json()
        colocarUsuario({ id:data.id })
        //id del usuario 
        colocarDeportista({id:data.id})
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
                        {editing ? "Datos de Deportista":"Crear Usuario"} 
                    </Typography>
                    {/* envento presonalizado onSubmit  */}
                    <CardContent>

                        <form onSubmit={handleSubmit}>
                            <Typography>Tipo de desportista</Typography>
                            <Select name='tipo' value={deportista.tipo} sx={{ display: 'block', margin: '.5rem 0' }} onChange={handleChange} >
                                <MenuItem value= {1} >Culturista</MenuItem>
                                <MenuItem value= {2}  >Powerlifter</MenuItem>
                            </Select>
                            <TextField variant='filled' label='Peso' sx={{ display: 'block', margin: '.5rem 0' }} name='peso' value={deportista.peso} onChange={handleChange}  InputProps={{startAdornment: <InputAdornment position="start">kg</InputAdornment>,}}/>

                            <TextField variant='filled' label='Altura' sx={{ display: 'block', margin: '.5rem 0' }} name='altura' value={deportista.altura} onChange={handleChange} InputProps={{startAdornment: <InputAdornment position="start">cm</InputAdornment>,}}/>
                            
                            <TextField  variant='filled' label='Estado' sx={{ display: 'block', margin: '.5rem 0' }} name='estado' value={deportista.estado} onChange={handleChange} />

                            <Button variant='contained' color='primary' type='submit'>
                                {loading ? (<CircularProgress color='inherit' size={25} />) : ("Guardar")}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}