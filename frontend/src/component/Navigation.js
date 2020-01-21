import React from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function Principal() {

    return (  
            <Menu fluid widths={4} icon='labeled' size='massive'>
                <Menu.Item as={Link} to="/" name='tasks'>
                    <Icon name='tasks' />
                     Principal
                </Menu.Item>

                <Menu.Item as={Link} to="/maquinas"  name='gavel'>
                    <Icon name='factory' />
                    Fabrica
                </Menu.Item>

                <Menu.Item as={Link} to="/empleados" name='id card'>
                    <Icon name='id card' />
                    Empleados
                </Menu.Item>
                <Menu.Item as={Link} to="/principal" name='codepen'>
                    <Icon name='chart pie' />
                    Estadísticas
                </Menu.Item>
            </Menu>
    
    )  
}