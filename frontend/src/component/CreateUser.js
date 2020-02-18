import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Form, Button, Card, Row, Col} from 'react-bootstrap';


export default function CreateUser() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const apiUrl = "https://192.168.0.117:4000/api/users";

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const result = await axios(apiUrl);
        setData(result.data);
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(apiUrl, { username });
        setUsername('');
        getUser();
    }

    const deleteUser = async (id) => {
        await axios.delete(apiUrl + '/' + id);
        getUser();
    }

    getUser();
    return (
        <Container>
            <Container className='mt-2'>
            <Form  onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><h2>Empleado</h2></Form.Label>
                    <Form.Control type="text" name="username" value={username} onChange={onChangeUsername} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Añadir
                </Button>
            </Form>
            </Container >
                <Container  className='mt-2' fluid="sm">
                <Row>
                {
                    data.map(user =>
                        <Col sm className='mt-2'>
                        <Card align ="center" >
                           <Card.Body>
                           <Card.Title>{user.username}</Card.Title>
                           <Button variant="danger" action onClick={() => deleteUser(user._id)} key={user._id}>Borrar</Button> 
                            </Card.Body>
                        </Card>
                        </Col>                       
                    )
                
                }
                </Row>
                </Container>
        </Container>
    );
}

