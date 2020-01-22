import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {Segment, Grid, Icon, Search, Divider, Header, Container, Button, Card, Image} from 'semantic-ui-react';
import QrReader from 'react-qr-scanner'
import QrReader2 from 'react-qr-reader'

export default function QrReaderC() {
    const [data, setData]= useState([]);
    const [result, setResult] = useState([]);
    const apiUrl = "http://localhost:4000/api/posiciones";

    const handleScan = data =>{
        if(data){
          console.log(JSON.parse(data).ejecucion);
          
          getPosicion(data);
        }
    }


    const handleError = err =>{
        console.error(err);
    }

    const previewStyle = {
        'object-fit': 'cover',
        'backgroundColor': 'black',
        'padding':'2em',
        'width':'58vh',
        'maxWidth':'100%',
        'overflow': 'hidden',
        'height': '58vh',
        'position': 'relative',
        'display':'block', 
        'testAling' : 'center'

    }
    const getPosicion = async (id)=>{
      setResult(id);
    }


    return (


      <Segment placeholder >
        <Grid columns='equal' stackable textAlign='center'>

          <Grid.Row verticalAlign='middle'>

            <Grid.Column >
            <Segment className='SegmentQR'>
              <Header  textAlign ='center'  className='ButtonQR' icon>
                <p><QrReader
                  delay={500}
                  style={previewStyle}
                  onError={handleError}
                  onScan={handleScan}
                />
                </p>
              </Header>
            </Segment>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>
              <Header textAlign='center'  icon>
                <Icon name='settings' />
                Escanear QR para seleccionar Proceso
                {result}
                <br/>
              </Header>
              </Segment>
           </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <Segment className='SegmentQR'>
              <Header textAlign ='center' icon>
                <Icon name='pdf file outline' />
                Escanear para ver plano de la posicion
              </Header>
              
            </Segment>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Segment>

    );
}