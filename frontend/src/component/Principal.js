import React, { useState/*, useEffect*/ } from 'react';
//import axios from 'axios';
import {Step, Icon, Transition} from 'semantic-ui-react';
import Empleados from './Empleados';
import Maquinas from './Maquinas';
import Selector from './Selector';

export default function Principal() {
  const [empleado, setEmpleado] = useState([]);
  const [maquina, setMaquina] = useState([]);
  const [posicion, setPosicion] = useState(null);
  const [proceso, setProceso] = useState(null);

  function callbackEmpleado(empleado) {
      setEmpleado(empleado);
  }

  function callbackMaquina(maquina) {
      setMaquina(maquina);
  }

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
             <Maquinas funcionM ={callbackMaquina} funcionE ={empleado.empleado}   /> 
            )}
            {maquina.maquina && (
              <Selector mensaje = {{empleado, maquina}}/>
            )}
          </Transition.Group>
        {banda}
      </div>
    );
}

