import React, {useState} from 'react';
import axios from 'axios'
import {Segment, Grid, Icon, Header, Button, Label, Transition, Modal, Input} from 'semantic-ui-react';

export default function QrReaderC(props) {
    const [posicion, setPosicion] = useState([]);
    const apiUrl = "http://192.168.0.117:4000/api/posiciones/1";
    const apiUrlM = "http://192.168.0.117:4000/api/maquinas/";
    const [empleado, setEmpleado] = useState([]);
    const [maquina, setMaquina] = useState([]);
    const [procesoS, setProcesoS]= useState([]);
    const [open, setOpen]= useState(false);
    const [cantidadRes, setCantidadRes] = useState(0);

    const handleScan = data =>{
        if(data){
         
          getPosicion(JSON.parse(data));
          setEmpleado(props.mensaje.empleado);
          setMaquina(props.mensaje.maquina);
        }
    }

    const handleError = err =>{
        console.error(err);
    }

    const CheckPos = (pos) => {

      props.fProceso(pos.proceso);
      setProcesoS({proceso:pos.proceso, cantidadA: pos.cantidadA});
    }


    const getPosicion = async (posData)=>{
      const {posicion} = posData;
      const res = await axios.get(apiUrl, {
        // Asignamos el valor de userInfo a params
        params: posData
      });
      setPosicion(res.data);
      props.fPosicion(posicion);
    }


    function actualizaEstado(){

      const recordPosition = async ()=>{
        const res = await axios.put(apiUrl, {
        posicion: posicion.posicion,
        ejecucion: posicion.ejecucion,
        proceso: procesoS.proceso,
        cantidadA: cantidadRes,
        maquina: maquina.maquina,
        empleado: empleado.empleado,  
        legajo: empleado.legajo,
        operacion: "inicio"
        })
      }

      const recordMaquina = async ()=>{
        console.log(empleado.legajo)
        const res = await axios.put(apiUrlM+maquina._id, {
          proceso: procesoS.proceso,
          empleado: empleado.empleado,
          legajo: empleado.legajo,
          estado: 'activa',
          ejecucion: posicion.ejecucion,
          operacion: 'inicio',
          posicion: posicion.posicion 
        })
        
      }    
      recordPosition();
      recordMaquina();
    }

    return (
      
      <Segment placeholder >
        <Grid columns='equal' stackable textAlign='center'>

          <Grid.Row verticalAlign='middle'>

            <Grid.Column verticalAlign='middle' >
              <Segment className='SegmentQR' >
                  <Header textAlign='center'>
                    <Input placeholder ='Escanear Proceso'></Input>
                  </Header>
              </Segment>
            </Grid.Column>

            
            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>

              </Segment>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>
                <Header textAlign='center' icon>
                  <Icon name='pdf file outline' />
                  Escanear para ver plano de la posicion
                </Header>
                <Label size = 'big' attached='top'>Informacion Adicional </Label>
              </Segment>
            </Grid.Column>

          </Grid.Row>
        </Grid>

        <Modal size = 'small' open={open}>
          <Modal.Header>Registro de Tiempo</Modal.Header>
          <Modal.Content>
                Se grabará un registro de tiempo con las siguientes especificaciones:
 
                <br/>Maquina: {maquina.maquina} 
                <br/>Proceso: {procesoS.proceso} 
                <br/>Empleado: {empleado.empleado}

          </Modal.Content>
          <Modal.Actions>
            <Button onClick = {()=> setOpen(false)} negative>Cancelar</Button>
            <Button
              positive
              icon='checkmark'
              as = 'a' href='/principal'
              labelPosition='right'
              content='Aceptar'
              onClick ={()=>{actualizaEstado(); setOpen(false)}}
            />
          </Modal.Actions>
        </Modal>
        
      </Segment>

    );
}