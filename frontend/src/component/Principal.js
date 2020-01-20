import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container} from 'semantic-ui-react';

export default function CreateEmpleados() {
    const [data, setData] = useState([]);
   const apiUrl = "http://localhost:4000/api/empleados";
    

    const getUser = async () =>{
        const result = await axios(apiUrl);
        setData(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <Container>
        <div class="menuE" textAlign = 'center'>
                {
                    data.map(empleado =>
                        <Button primary circular size ='massive' key={empleado._id} style={{ marginBottom: '1em' }} >
                            {empleado.empleado} 
                        </Button>
                    )
                }
        </div>
        </Container>
    );
}

