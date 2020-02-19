import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Segment, Grid, Icon, Header, Button, Modal, Input, Form, ButtonGroup} from 'semantic-ui-react';

export default function QrReaderC(props) {
    const [posicion, setPosicion] = useState([]);
    const apiUrl = "http://192.168.0.117:4000/api/posiciones/1";
    const apiUrlM = "http://192.168.0.117:4000/api/maquinas/";
    const [empleado, setEmpleado] = useState([]);
    const [maquina, setMaquina] = useState([]);
    const [procesoS, setProcesoS]= useState([]);
    const [open, setOpen]= useState(false);
    const [cantidadRes, setCantidadRes] = useState(0);
    const [id, setId] = useState(0);


    const getPosicion = async (idT)=>{
      let posicionTemp;
      const res = await axios.get(apiUrl, {
        // Asignamos el valor de userInfo a params
        params: {"id":idT}
      });
      posicionTemp = res.data
      setPosicion(posicionTemp);
      posicionTemp.procesos.forEach(proceso => {
        if (proceso.id == idT){
          setProcesoS(proceso)
          setPosicion(posicionTemp);
          setEmpleado(props.mensaje.empleado)
          setMaquina(props.mensaje.maquina)
          setCantidadRes(proceso.cantidadA)
        }
      });
      
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
        console.log(res)
      }

      const recordMaquina = async ()=>{

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

    const keyPresseds = async (e)=>{
      if(e.key === 'Enter'){
        setId(e.target.value)
        getPosicion(e.target.value)
        setOpen(true);
      }
    }


    return (
      
      <Segment placeholder >
        <Grid columns='equal' stackable >

          <Grid.Row verticalAlign='middle'>

            <Grid.Column width={6} >
              <Segment className='SegmentQR' >
                <Header as='h2' icon textAlign='center'>
                  <Icon name='barcode' size ='massive' />
                  <Header.Content>
                    
                      <Input onKeyPress={keyPresseds}  type = 'number'  placeholder='Escanear' autoFocus  />
              
                  </Header.Content>
                </Header>

              </Segment>
            </Grid.Column>


            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>
              </Segment>
            </Grid.Column>

          </Grid.Row>
        </Grid>

        <Modal size='small' open={open}>
          <Modal.Header>Registro de Tiempo</Modal.Header>
          <Modal.Content>
            Se grabará un registro de tiempo con las siguientes especificaciones:

            <br />Maquina: {maquina.maquina}
            <br />Proceso: {procesoS.proceso}
            <br />Empleado: {empleado.empleado}

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)} negative>Cancelar</Button>
            <Button
              positive
              icon='checkmark'
              as='a' href='/principal'
              labelPosition='right'
              content='Aceptar'
              onClick={() => { actualizaEstado(); setOpen(false) }}
            />
          </Modal.Actions>
        </Modal>

      </Segment>

    );
}