import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container} from 'semantic-ui-react';

export default function Empleados() {
    const [data, setData] = useState([]);
   const apiUrl = "http://192.168.0.117:4000/api/empleados";
    

    const getUser = async () =>{
        const result = await axios(apiUrl);
        setData(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <Container textAlign= 'center' >
        <div class="menuE">
                {
                    data.map(empleado =>
                        <Button color='gray' circular size ='massive' key={empleado._id} style={{ marginBottom: '1em' }} >
                            {empleado.empleado} 
                        </Button>
                    )
                }
        </div>
        </Container>
    );
}

