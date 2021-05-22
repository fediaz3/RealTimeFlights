import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import marker from "./plane.png";
const io = require("socket.io-client");
const newicon = new L.icon({
  iconUrl: marker,
  iconSize: [15, 15]
});


const FlightsMap = (props) => {   
    const [positions, setPositions] = useState({})

    // const [position, setPosition] = useState({ code: '', position: [0, 0] })
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
            // console.log('positions a modificar:', newObject)
          })

    }, []);


    useEffect(() => {
      // console.log("positions modificado:", positions)
      // Object.entries(positions).map( x => {
      //   // console.log(x[0], x[1][0], x[1][1])}
      // )
      // console.log('--------------------------------------')
    }, [positions])



  
    const limeOptions1 = { color: 'red', weight: 5 }
    // const limeOptions2 = {color: "blue", weight: 3}

    const positionsView = Object.entries(positions).map( x => {
      // console.log("posiciones a mostrar: ", x[1])
      if (x[1][0] == undefined || x[1][1] == undefined){
        return false
      }
      let positionsToShow = x[1].map(x => x)
      let lastPosition = positionsToShow[positionsToShow.length - 1]
      // console.log("positions to show:", positionsToShow)
      return (
        <>
        <Marker position={lastPosition} icon={newicon}>
          <Tooltip>{`${x[0]}`}</Tooltip>
        </Marker>
        <Polyline positions={positionsToShow} pathOptions={limeOptions1} >
          <Tooltip>{`${x[0]}`}</Tooltip>
        </Polyline>
        </>
        )
      } 
    )
    
    
    return (
      <>  
      
      <div id="FlightMap" >
        {/*<p>{position.code} {position.position}</p> */}
        
        <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            { positions != {} && positionsView }

          </MapContainer>
      </div>
      
      </>
    );


}


export {FlightsMap}