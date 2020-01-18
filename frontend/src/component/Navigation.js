import React, { Component } from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {NavLink, NavbarBrand} from 'reactstrap'
import {Link} from 'react-router-dom'

export default class Navigation extends Component {

  render() {
    return (
        <Navbar className="navbar navbar-expand-lg" bg="dark" variant="dark">
            <Container>
                <NavbarBrand tag={Link} to="/" >
                    Posiciones
            </NavbarBrand>
                <Nav className="ml-auto">
                    <NavLink tag={Link} to="/">Posiciones</NavLink>
                    <NavLink tag={Link} to="/create">Crear Posicion</NavLink>
                    <NavLink tag={Link} to="/user">Crear Empleado</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
  }
}