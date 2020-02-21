import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container} from 'semantic-ui-react';

export default function Empleados(props) {
    const [data, setData] = useState([]);
    const apiUrl = "http://localhost:4000/api/empleados";
    
    const getUser = async () =>{
    const result = await axios(apiUrl);
        setData(result.data);
    }

    const print = async (emp) =>{
        props.mensajee(emp)
    }


    useEffect(() => {
        getUser();
    }, []);

    return (
        <Container textAlign= 'center'>
        <div className="menuE" >
                {
                    data.map(empleado =>
                        <Button  onClick={() => print(empleado)} circular size ='massive' key={empleado._id} style={{ marginBottom: '1em' }} >
                            {empleado.empleado} 
                        </Button>
                    )
                }
        </div>
        </Container>
    );
}

