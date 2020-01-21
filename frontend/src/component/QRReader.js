import React, {useState} from 'react';
import QrReader from 'react-qr-reader';
import {Segment, Grid, Icon, Search, Divider, Header, Container, Button} from 'semantic-ui-react';

export default function Principal() {
    const [result, setResult] = useState("");

    const handleScan = data =>{
        if(data){
            setResult(data);
        }
    }

    const handleError = err =>{
        console.error(err);
    }



    return (

        <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='search' />
                            Find Country
              </Header>

                        <Search placeholder='Search countries...' />
                    </Grid.Column>

                    <Grid.Column>
                        <Header>
                            <Icon size = 'huge' name = 'gamepad'>  <QrReader
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}

                                /></Icon>
                                
                       </Header>

                        <Button primary>Create</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>


    );
}