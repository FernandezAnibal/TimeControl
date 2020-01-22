import React, { useState/*, useEffect*/ } from 'react';
//import axios from 'axios';
import {Step, Icon, Transition} from 'semantic-ui-react';
import Empleados from './Empleados';
import Maquinas from './Maquinas';
import QRreaderW from './QRReader';

export default function Principal() {
  const [empleado, setEmpleado] = useState(null);
  const [maquina, setMaquina] = useState(null);
  const [Posicion, setPosicion] = useState(null);

  function callbackEmpleado(empleado) {
      setEmpleado(empleado.empleado);
  }

  function callbackMaquina(maquina) {
    setMaquina(maquina.maquina);
  }

  function callbackPosicion(Posicion) {
    setMaquina(Posicion.maquina);
  }

  const banda = (
    <Step.Group widths={4}>
          <Step active ={!Boolean(empleado)} completed =  {Boolean(empleado)}>
            <Icon name='user' />
            <Step.Content>
              <Step.Title>{empleado ? empleado :"Empleado"}</Step.Title>
              <Step.Description>{empleado ? "":"Seleccionar empleado"}</Step.Description>
            </Step.Content>
          </Step>
    
          <Step active ={!Boolean(maquina)} disabled ={!Boolean(empleado)} completed =  {Boolean(maquina)}>
            <Icon name='cog' />
            <Step.Content>
              <Step.Title>{maquina ? maquina :"Maquina"}</Step.Title>
              <Step.Description>{maquina ? "":"Seleccionar maquina"}</Step.Description>
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
        <Transition.Group animation='drop' duration = '0'>
            {!empleado && (
              <Empleados mensajee ={callbackEmpleado} />        
            )}
            {empleado && !maquina && (
             <Maquinas mensajee ={callbackMaquina} /> 
            )}
            {maquina && (
              <QRreaderW/>
            )}
          </Transition.Group>
        {banda}
      </div>
    );
}

