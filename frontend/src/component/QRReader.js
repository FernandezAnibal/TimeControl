import React, {useState} from 'react';
import axios from 'axios'
import {Segment, Grid, Icon, Header, Card, Button, Label, Transition, Container} from 'semantic-ui-react';
import QrReader from 'react-qr-scanner'

export default function QrReaderC(props) {
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
        'padding':'3vh',
        'width':'100%',
        'height': '57vh',
    }



    const getPosicion = async (posData)=>{
      const {posicion, ejecucion} = posData;
      const res = await axios.get(apiUrl, {
        // Asignamos el valor de userInfo a params
        params: posData
      });
      setPosicion(res.data);
    }


    return (


      <Segment placeholder >
        <Grid columns='equal' stackable textAlign='center'>

          <Grid.Row verticalAlign='middle'>

            <Grid.Column verticalAlign='middle' >
              <Segment className='SegmentQR' >

                <Transition.Group animation='drop' duration='0'>
                  {posicion.posicion && (
                    <Header textAlign='center' icon>

                  <h1>Ejecucion: {posicion.ejecucion}</h1>
                  <h1>Posicion: {posicion.posicion}</h1>
                  <h1>Cantidad: {posicion.cantidad}</h1>
              </Header>
                  )}
                  {!posicion.posicion && (
                    <Header textAlign='center'>
                    <QrReader className = 'QRST'
                      delay={500}
                      style={previewStyle}
                      onError={handleError}
                      onScan={handleScan}
                    />
                    </Header>
                  )}
                </Transition.Group>
              </Segment>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>
                {posicion.posicion && (

                  <div className="menuProcesos"  >
                    {
                      posicion.procesos.map(proceso =>
                        <Button primary size='big' key={proceso.proceso} >
                          {proceso.proceso} 
                          <Label  as='a' basic pointing='left'>52</Label>
                        </Button>
                        
                      )
                    }
                  </div>
                )}
                {!posicion.posicion && (
                  <Header textAlign='center' icon>
                    <Icon name='settings' />
                    Escanear QR para seleccionar Proceso
              </Header>
                )}

              </Segment>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Segment className='SegmentQR'>
                <Header textAlign='center' icon>
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