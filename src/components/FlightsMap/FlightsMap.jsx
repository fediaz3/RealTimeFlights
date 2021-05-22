import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline} from 'react-leaflet'
const io = require("socket.io-client");

const FlightsMap = (props) => {   
  // {'fabian': [2, 2], 'sergio': [10, 0]}
    const [loading, setLoading] = useState(true)
    const [positions, setPositions] = useState({})

    const [position, setPosition] = useState({ code: '', position: [0, 0] })
    useEffect(() => {
      const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights',
            reconnection: true //Por default cuando se desconecta, "se reconecta" solo 
        });
        socket.on("POSITION", msg => { //poner cuando quiera dibujar el mapa
            
            // console.log("Position:", msg)
            // setPosition({code: msg.code, position: msg.position})  

            if (positions.hasOwnProperty(msg.code) != true) {
              positions[msg.code] = []
            }
            const key = msg.code
            const value = msg.position;
            let specificArrayInObject = positions[key];
            specificArrayInObject.push(value);
            const newObject = { ...positions, [key]: specificArrayInObject };
            setPositions(newObject);

            // const newObject = { ...positions[msg.code], 
            //   [msg.code]: positions[msg.code].push(msg.position)}
            // setPositions(newObject)

            
            console.log('positions a modificar:', newObject)
            
           
            
            // console.log(positions
          })


        
    }, []);


    useEffect(() => {
      //setLoading(false)
      console.log("positions modificado:", positions)
      Object.entries(positions).map( x => {
        console.log(x[0], x[1][0], x[1][1])}
      )
      console.log('--------------------------------------')
      //setLoading(true)
      
      
    }, [positions])

    
    
    const redOptions = { color: 'red' }
    // const positionsView = Object.entries(positions).map( (x) => (
    //   <>
    //     <CircleMarker center={x.position} pathOptions={redOptions} radius={5}>
    //       <Popup>{x.code}</Popup>
    //     </CircleMarker>
    //   </> ) )

    
    const limeOptions = { color: 'red' }
    return (
      <>  
      
      
      <div id="FlightMap" >
        {/*<p>{position.code} {position.position}</p> */}
        
        <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[51.505, -0.09]}>
              <Popup>
                PopUp De ejemplo {position}
              </Popup>
            </Marker>

            

            <CircleMarker center={[10, 10]} pathOptions={redOptions} radius={5}>
              <Popup>Lolens</Popup>
            </CircleMarker>

          

      

            { positions != {} && loading && 
              Object.entries(positions).map( x => {
                console.log("posiciones a mostrar: ", x[1])
                if (x[1][0] == undefined || x[1][1] == undefined){
                  return false
                }
                let x1 = parseFloat(x[1][0])
                let x2 = parseFloat(x[1][1])
                let positionsToShow = x[1].map(x => x)
                console.log("positions to show:", positionsToShow)
                return (
                  <Polyline pathOptions={limeOptions} positions={x[1].map(x => x)} style={ {weight: "5px"}} >
                    <Popup>{`Flight ${x[0]}`}</Popup>
                  </Polyline>
                  
                )
                {/*<CircleMarker center={[x1, x2]} pathOptions={redOptions} radius={3}>
                    <Popup>{x[0]}</Popup>
                </CircleMarker>*/}
              } 
              )
            }

  

          </MapContainer>
      </div>
      
      </>
    );


}


export {FlightsMap}