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
    const [entrenador, colocarDeportista] = useState({
        //datos vacios
        code_customer:Number(`${params.id}`),
        code_usuario:Number(),
        date_of_order: ''
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
            //consulta sql para crear entrenador
            const res = await fetch('http://localhost:4000/usuario/entrenador', {
                method: 'POST',
                body: JSON.stringify(entrenador),
                headers: { 'Content-Type': 'application/json' },
            }); 
                const data = await res.json();
                console.log(data)
                navigate(`/usuario/nuevo/${data.code_order}/pedidoPago`)

        }

    // };
    //funcion cuando se tipea
    const handleChange = e => {
        colocarDeportista({ ...entrenador, [e.target.name]: e.target.value });
        console.log(entrenador)
        
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
                        {editing ? "Datos de Entrenador":"Crear Pedido"} 
                    </Typography>
                    {/* envento presonalizado onSubmit  */}
                    <CardContent>

                        <form onSubmit={handleSubmit}>
                            <Typography>Empleado</Typography>
                            <Select name='code_usuario' value={entrenador.code_usuario} sx={{ display: 'block', margin: '.5rem 0' }} onChange={handleChange} >
                                <MenuItem value= {2} >Daniel Escribano</MenuItem>
                                <MenuItem value= {4} >Edurne Catalan</MenuItem>
                            </Select>

                            <TextField variant='filled' label='Fecha' type="date" sx={{ display: 'block', margin: '.5rem 0' }} name='date_of_order' value={entrenador.date_of_order} onChange={handleChange} />
                            
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