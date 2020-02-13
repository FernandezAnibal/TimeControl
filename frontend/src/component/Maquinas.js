import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, Modal} from 'semantic-ui-react';

export default function Maquinas(props) {
    const [data, setData] = useState([]);
    const apiUrl = "http://192.168.0.117:4000/api/Maquinas";
    const apiUrlM = "http://192.168.0.117:4000/api/maquinas/";
    const [open, setOpen]= useState(false);
    const [maquinaA, setMaquinaA] = useState([]);

    const getMachines = async () =>{
        const result = await axios(apiUrl);
        setData(result.data);
     
       
    }

    const print = async (emp) =>{
        setMaquinaA(emp);
       
        if(emp.estado === 'inactiva'){
            if(props.funcionE){
            validation(emp);
            }
        }
        else
        {
        setOpen(true);  
        }      
    }

    const validation = async(emp) =>
    {

        //Se detiene la maquina de dos formas una para el proceso de produccón y otra es simple detención

        //TODO hacer validación de cierre pasar para aca los iconos de actualización
        if (props.funcionE){

            closeProcesoM()
            props.funcionM(emp)
        }
        else
        {
            //TODO hhacer registro de cierre de tiempo
            closeProcesoM();
        }

        await getMachines();

    }

    const closeProcesoM = async ()=>{

        const res = await axios.put(apiUrlM+maquinaA._id, {
          proceso: maquinaA.procesoA,
          empleado: maquinaA.empleadoA,
          legajo: maquinaA.legajoA,
          estado: "inactiva",
          ejecucion: maquinaA.ejecucionA,
          operacion: "final",
          posicion: maquinaA.posicion 
        })
    }

    useEffect(() => {
        getMachines();
    },[]);
    

    

    return (
        <Container >
        <div className ="menuE">
                {
                    data.map(maquina =>
                        <Button  onClick={() => print(maquina)} color = {maquina.estado === 'inactiva' ? 'orange':'green'}  circular size ='massive' key={maquina._id} style={{ marginBottom: '1em' }}>
                            {maquina.maquina} 
                        </Button>
                    )
                }
        </div>

        <Modal size = 'small' open={open}>
          <Modal.Header>Registro de Tiempo</Modal.Header>
          <Modal.Content>
                La maquina está trabajando con las siguientes especificaciones: 
                <br/>Maquina: {maquinaA.maquina} 
                <br/>Proceso: {maquinaA.procesoA} 
                <br/>Empleado: {maquinaA.empleadoA}
                <br/>Si acepta finalizará la sesión actual
          </Modal.Content>
          <Modal.Actions>
            <Button onClick = {()=> setOpen(false)} negative>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              onClick ={()=>{validation(maquinaA); setOpen(false)}}
            />
          </Modal.Actions>
        </Modal>

        </Container>

    );
}

