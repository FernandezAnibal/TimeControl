import React, {useState} from 'react';
import axios from 'axios'
import {Segment, Grid, Icon, Header,  Button, Container, Transition} from 'semantic-ui-react';
import QrReader from 'react-qr-scanner'

export default function QrReaderC() {
    const [posicion, setPosicion] = useState([]);
    const apiUrl = "http://localhost:4000/api/posiciones/1";

    const handleScan = data =>{
        if(data){
         
          getPosicion(JSON.parse(data));
          console.log("Scan")
        }
    }


    const handleError = err =>{
        console.error(err);
    }


    //Estilos del QR
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



    const getPosicion = async (posData)=>{
      const {posicion, ejecucion} = posData;
      const res = await axios.get(apiUrl, {
        // Asignamos el valor de userInfo a params
        params: posData
      });
      setPosicion(res.data);
      console.log(res.data);
    }


    return (


      <Segment placeholder >
        <Grid columns='equal' stackable textAlign='center'>

          <Grid.Row verticalAlign='middle'>

            <Grid.Column verticalAlign ='middle' >
            <Segment className='SegmentQR' textAlign = 'center' >
            
            <Transition.Group animation='drop' duration = '0'>
            {posicion.posicion && (
              <Container>
              <Header>Ejecucion: {posicion.ejecucion}</Header>   
              <Header>Posicion: {posicion.posicion}</Header>     
              </Container>     
            )}
            {!posicion.posicion && (
             <QrReader
             delay={500}
             style={previewStyle}
             onError={handleError}
             onScan={handleScan}
           />
            )}
          </Transition.Group>

            </Segment>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>
              <Header textAlign='center'  icon>
                <Icon name='settings' />
                Escanear QR para seleccionar Proceso
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