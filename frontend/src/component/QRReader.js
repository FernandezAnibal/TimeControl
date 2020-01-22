import React, {useState} from 'react';
import {Segment, Grid, Icon, Search, Divider, Header, Container, Button, Card, Image} from 'semantic-ui-react';
import QrReader from 'react-qr-scanner'
export default function Principal() {
    const [result, setResult] = useState("");

    const handleScan = data =>{
        if(data){
            setResult(data);
            console.log(data);
        }
    }

    const handleError = err =>{
        console.error(err);
    }

    const previewStyle = {
        height: '48vh',
        width: '64vh',
        padding: '3vh',
      }


    return (

        <Card.Group>
        <Card>
          <Card.Content>
            <Image
              floated='right'
              size='mini'
              src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
            />
            <Card.Header>Steve Sanders</Card.Header>
            <Card.Meta>Friends of Elliot</Card.Meta>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
                Approve
              </Button>
              <Button basic color='red'>
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Image
              floated='right'
              size='mini'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>Molly Thomas</Card.Header>
            <Card.Meta>New User</Card.Meta>
            <Card.Description>
              Molly wants to add you to the group <strong>musicians</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
                Approve
              </Button>
              <Button basic color='red'>
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Image
              floated='right'
              size='mini'
              src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
            />
            <Card.Header>Jenny Lawrence</Card.Header>
            <Card.Meta>New User</Card.Meta>
            <Card.Description>
              Jenny requested permission to view your contact details
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
                Approve
              </Button>
              <Button basic color='red'>
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>


    );
}