import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container} from 'semantic-ui-react';

export default function Maquinas(props) {
    const [data, setData] = useState([]);
    const apiUrl = "http://localhost:4000/api/Maquinas";
    

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
        <Container>
        <div className ="menuE">
                {
                    data.map(maquina =>
                        <Button  onClick={() => print(maquina)}  circular size ='massive' key={maquina._id} style={{ marginBottom: '1em' }} >
                            {maquina.maquina} 
                        </Button>
                    )
                }
        </div>
        </Container>

    );
}

