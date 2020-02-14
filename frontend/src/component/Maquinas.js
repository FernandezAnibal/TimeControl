import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, Modal} from 'semantic-ui-react';

export default function Maquinas(props) {
    const [data, setData] = useState([]);
    const apiUrl = "http://192.168.0.117:4000/api/Maquinas";
    const apiUrlM = "http://192.168.0.117:4000/api/maquinas/";
    const apiUrlP = "http://192.168.0.117:4000/api/posiciones/1";
    const [open, setOpen]= useState(false);
    const [maquinaA, setMaquinaA] = useState([]);
    const [procesos, setProcesos] = useState([]);
    const [cantidad, setCantidad] = useState(0);

    const getMachines = async () =>{
        const result = await  axios.get(apiUrl)
        setData(result.data);   
    }
    
    useEffect(() => {
        getMachines();
    }, [apiUrlP]);

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


    const getPosicion = async (maq)=>{
        const posData = {posicion:maq.posicionA, ejecucion: maq.ejecucionA};
        console.log(posData.posicion);
        const res = await axios.get(apiUrlP, {
        // Asignamos el valor de userInfo a params
        params: posData
        });
        if(res.data != null){
            setProcesos(res.data.procesos);
        }
    }
  

    const validation = async(emp,num) =>
    {
        
        if (props.funcionE){
            if (num != undefined)
            {
            closeProcesoM(num);
            recordPosition(num);
            }
            props.funcionM(emp);
        }
        else
        {
            closeProcesoM(num);
            recordPosition(num);
        }

        await getMachines();

    }

    const closeProcesoM = async (num)=>{
        console.log(num)
        const res = await axios.put(apiUrlM+maquinaA._id, {
            proceso: maquinaA.procesoA,
            empleado: maquinaA.empleadoA, 
            legajo: maquinaA.legajoA,
            estado: "inactiva",
            ejecucion: maquinaA.ejecucionA,
            operacion: "final",
            cantidad: num,
            posicion: maquinaA.posicionA
        })
    }

    const recordPosition = async (num)=>{
        const res = await axios.put(apiUrlP, {
        posicion: maquinaA.posicionA,
        ejecucion: maquinaA.ejecucionA,
        proceso: maquinaA.procesoA,
        cantidadA: num,
        maquina: maquinaA.maquina,
        empleado: maquinaA.empleadoA,  
        legajo: maquinaA.legajoA,
        operacion: "final"
        })
      }


      const createButtons =()=>
      {
        let procesotemp = procesos.find(proceso => proceso.proceso === maquinaA.procesoA)
        let cantidadT = (procesotemp ? procesotemp.cantidadA: 0);
        let botones = [];
        for (let i = 1; i <= cantidadT; i++ ){
        botones.push(<Button key={i}onClick={() => {setCantidad(i);validation("",i);setOpen(false);}} style={{ margin: '0.3em' }} size = 'big'> {i} </Button >)
        }
        return botones;
        
      }

    return (
        <Container >
        <div className ="menuE">
                {
                    data.map(maquina =>
                        <Button  onClick={() => {print(maquina); getPosicion(maquina)}} color = {maquina.estado === 'inactiva' ? 'orange':'green'}  circular size ='massive' key={maquina._id} style={{ marginBottom: '1em' }}>
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
                <br/>Seleccionar las piezas que quedan por hacer para este proceso:
                <br/>
                {createButtons()}

          </Modal.Content>
          <Modal.Actions>
            <Button onClick = {()=> setOpen(false)} negative>Cancelar</Button>
          </Modal.Actions>
        </Modal>

        </Container>

    );
}

