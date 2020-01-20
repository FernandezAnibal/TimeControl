import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container} from 'semantic-ui-react';

export default function Maquinas() {
    const [data, setData] = useState([]);
    const apiUrl = "http://localhost:4000/api/Maquinas";
    

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
                    data.map(maquina =>
                        <Button primary circular size ='massive' key={maquina._id} style={{ marginBottom: '1em' }} >
                            {maquina.maquina} 
                        </Button>
                    )
                }
        </div>
        </Container>

    );
}

