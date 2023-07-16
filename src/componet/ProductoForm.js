//componentes de materia UI
import { Button, Card, CardContent, CircularProgress, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
//importar ocks de react
//capturar un estado 
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function ProductoForm() {
    //captura los datos
    const [usuario, colocarUsuario] = useState({
        //datos vacios
        code_usuario: 0,
        promotion_code: 0,
        products_descript: '',
        produtc_price: 0.0,
        product_name: '',
        stock: 0
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
            const response = await fetch(`http://localhost:4000/usuario/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            navigate('/listaUsuario')
        } else {
            //CREAR UN NUEVO Producto
            const res = await fetch('http://localhost:4000/usuario/producto', {
                method: 'POST',
                body: JSON.stringify(usuario),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            setloading(false)
            navigate('/listaProductos')

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
                        {editing ? "Actualizar usuario" : "Crear Producto"}
                    </Typography>
                    {/* envento presonalizado onSubmit  */}
                    <CardContent>

                        <form onSubmit={handleSubmit}>
                            <InputLabel>Empleado</InputLabel>
                            <Select name='code_usuario' value={usuario.code_usuario} sx={{ display: 'block', margin: '.5rem 0' }} onChange={handleChange} >
                                <MenuItem value={2} >Daniel Escribano</MenuItem>
                                <MenuItem value={4}  >Edurne Catalan</MenuItem>
                            </Select>
                            <InputLabel>Promocion</InputLabel>
                            <Select name='promotion_code' value={usuario.promotion_code} sx={{ display: 'block', margin: '.5rem 0' }} onChange={handleChange} >
                                <MenuItem value={1} >2X1</MenuItem>
                                <MenuItem value={2} >-20%</MenuItem>
                                <MenuItem value={3} >nada</MenuItem>
                            </Select>
                            <TextField variant='filled' label='Descripcion' sx={{ display: 'block', margin: '.5rem 0' }} name='products_descript' value={usuario.products_descript} onChange={handleChange} />

                            <TextField variant='filled' label='Precio' type='number' step='any' sx={{ display: 'block', margin: '.5rem 0' }} name='produtc_price' value={usuario.produtc_price} onChange={handleChange} />

                            <TextField variant='filled' label='Nombre del Producto' sx={{ display: 'block', margin: '.5rem 0' }} name='product_name' value={usuario.product_name} onChange={handleChange} />

                            <TextField variant='filled' label='Stock' type='number' sx={{ display: 'block', margin: '.5rem 0' }} name='stock' value={usuario.stock} onChange={handleChange} />

                            <Button variant='contained' color='primary' type='submit' disabled={!usuario.code_usuario || !usuario.promotion_code || !usuario.products_descript || !usuario.produtc_price || !usuario.product_name}>
                                {loading ? (<CircularProgress color='inherit' size={25} />) : ("Guardar")}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}