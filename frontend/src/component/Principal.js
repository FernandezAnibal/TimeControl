import React, { useState/*, useEffect*/ } from 'react';
//import axios from 'axios';
import {Step, Icon, Transition} from 'semantic-ui-react';
import Empleados from './Empleados';
import Maquinas from './Maquinas';
import QRreaderW from './QRReader';

export default function Principal() {
  const [empleado, setEmpleado] = useState([]);
  const [maquina, setMaquina] = useState([]);
  const [Posicion, setPosicion] = useState(null);

  function callbackEmpleado(empleado) {
      setEmpleado(empleado);
  }

  function callbackMaquina(maquina) {
    setMaquina(maquina);
  }

  function callbackPosicion(Posicion) {
    setMaquina(Posicion.maquina);
  }
  console.log(empleado);
  const banda = (
    <Step.Group widths={4}>
          <Step active ={!Boolean(empleado.empleado)} completed =  {Boolean(empleado.empleado)}>
            <Icon name='user' />
            <Step.Content>
              <Step.Title>{empleado.empleado ? empleado.empleado :"Empleado"}</Step.Title>
              <Step.Description>{empleado.empleado ? "":"Seleccionar empleado"}</Step.Description>
            </Step.Content>
          </Step>
    
          <Step active ={!Boolean(maquina.maquina)} disabled ={!Boolean(empleado.empleado)} completed =  {Boolean(maquina.maquina)}>
            <Icon name='cog' />
            <Step.Content>
              <Step.Title>{maquina.maquina ? maquina.maquina :"Maquina"}</Step.Title>
              <Step.Description>{maquina.maquina ? "":"Seleccionar maquina"}</Step.Description>
            </Step.Content>
          </Step>
    
          <Step disabled >
            <Icon name='codepen' />
            <Step.Content>
              <Step.Title>Posicion</Step.Title>
              <Step.Description>Seleccionar Posicion</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled >
            <Icon name='settings' />
            <Step.Content>
              <Step.Title>Proceso</Step.Title>
              <Step.Description>Seleccionar Proceso</Step.Description>
            </Step.Content>
          </Step>


        </Step.Group>
  )

    return (
        <div className ="cont">
        {banda}
        <Transition.Group animation='drop' duration = '0' >
            {!empleado.empleado && (
              <Empleados mensajee ={callbackEmpleado} onHide  />        
            )}
            {empleado.empleado && !maquina.maquina && (
             <Maquinas mensajee ={callbackMaquina}  /> 
            )}
            {maquina.maquina && (
              <QRreaderW mensaje = {{empleado, maquina}}/>
            )}
          </Transition.Group>
        {banda}
      </div>
    );
}

