import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Step, Icon, Segment, Image} from 'semantic-ui-react';
import Empleados from './Empleados'

export default function CreateEmpleados() {
 
    return (
        <div class ="cont">
        <Step.Group widths={4}>
          <Step active >
            <Icon name='user' />
            <Step.Content>
              <Step.Title>Empleado</Step.Title>
              <Step.Description>Seleccionar empleado</Step.Description>
            </Step.Content>
          </Step>
    
          <Step disabled >
            <Icon name='cog' />
            <Step.Content>
              <Step.Title>Maquina</Step.Title>
              <Step.Description>Seleccionar Maquina</Step.Description>
            </Step.Content>
          </Step>
    
          <Step disabled >
            <Icon name='codepen' />
            <Step.Content>
              <Step.Title>Posicion</Step.Title>
              <Step.Description>Seleccionar Posicion</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name='settings' />
            <Step.Content>
              <Step.Title>Proceso</Step.Title>
              <Step.Description>Seleccionar Proceso</Step.Description>
            </Step.Content>
          </Step>

        </Step.Group>
    
        <Segment >
        <Empleados/>
        </Segment>
    
        <Step.Group widths={4}>
          <Step active >
            <Icon name='user' />
            <Step.Content>
              <Step.Title>Empleado</Step.Title>
              <Step.Description>Seleccionar empleado</Step.Description>
            </Step.Content>
          </Step>
    
          <Step disabled >
            <Icon name='cog' />
            <Step.Content>
              <Step.Title>Maquina</Step.Title>
              <Step.Description>Seleccionar Maquina</Step.Description>
            </Step.Content>
          </Step>
    
          <Step disabled >
            <Icon name='codepen' />
            <Step.Content>
              <Step.Title>Posicion</Step.Title>
              <Step.Description>Seleccionar Posicion</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name='settings' />
            <Step.Content>
              <Step.Title>Proceso</Step.Title>
              <Step.Description>Seleccionar Proceso</Step.Description>
            </Step.Content>
          </Step>

        </Step.Group>
      </div>
    );
}

