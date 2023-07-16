import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
//capturar un estado useState
import { useState, useEffect } from "react";
//
import { useNavigate,useParams } from "react-router-dom";
export default function Inicio() {
    //captura los datos
    const [usuarios, colocarUsuario] = useState({
        usuario: '',
        contrasena: ''
    });
    const[u,todoU]=useState([])
    //rutas
    const navigate = useNavigate();
    //
    const params=useParams();
    //permite recivir el evento submit
    const handleSubmit = async (e) => {
        //prevenir que se refresque por defecto
        e.preventDefault();
        //peticion al backend
        //login
        const res = await fetch(`http://localhost:4000/usuario/${usuarios.usuario}/${usuarios.contrasena}`, {
        })
        const data = await res.json()
        colocarUsuario(data)
        console.log(data.rol_id)
        //recepcionista
        if(data.rol_id==1){
            navigate(`MenuRecepcionista/${data.usuario}`)
         }
         //entrenador
        else if(data.rol_id==2){
             navigate(`/MenuEntrenador/${data.usuario}`)
        }
        
    //     else if(data.rol_id==3){
            
    //    }

        

    };
    //recive el evento 
    const handleChange = (e) => {
        colocarUsuario({ ...usuarios, [e.target.name]: e.target.value });
    };

    // const [loading, setloading] = useState(false)


    

    return (
        <Grid container direction='column' alignItems='center' justifyContent='center'>
            <div>
                <Typography variant='h2' textAlign='center' color='#18202e' style={{ paddingTop: '7rem', letterSpacing: '.3rem', textShadow: '.1rem .1rem .2rem #4d557e' }}>
                    PizzeriaYa
                </Typography>

            </div>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} alignItems='center' justifyContent='center' style={{ backgroundColor: '#ba6a74', padding: '2.5rem', borderRadius:'1rem'}}>
                    <Typography variant='5' textAlign='center' color='#101d45'>
                        Iniciar Sesion
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>

                            <TextField variant='filled' label='Usuario' sx={{ display: 'block', margin: '.6rem 0' }} name='usuario' onChange={handleChange} InputProps={{ style: { color: 'black', backgroundColor: 'white' } }} />

                            <TextField variant='filled' label='Contraseña' type='password' sx={{ display: 'block', margin: '.6rem 0' }} name='contrasena' onChange={handleChange} InputProps={{ style: { color: 'black', backgroundColor: 'white' } }} />

                            <Button variant='contained' color='primary' type='submit' /*disabled={!usuarios.usuario || !usuarios.contrasena}*/>
                                {/* {loading ? (<CircularProgress color='secondary' size={25} />) : ("login")} */}login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}