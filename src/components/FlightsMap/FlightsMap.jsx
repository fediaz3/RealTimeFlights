import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, Tooltip, LayerGroup, Circle} from 'react-leaflet'
import L from 'leaflet'
import marker from "./plane.png";
import markerDestination from './destination2.png'
import { FlightsInfo } from '../FlightsInformation/FlightsInfo';

const io = require("socket.io-client");
const newicon = new L.icon({
  iconUrl: marker,
  iconSize: [22, 22]
});

const destinatioIcon = new L.icon({
  iconUrl: markerDestination,
  iconSize: [22, 22]
});

const FlightsMap = (props) => { 

    const {flightsInfo} = props;

    const [originAndDestinations, setOriginAndDestinations] = useState([])

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


    useEffect(()=> {
      const limeOptions2 = { color: 'purple', weight: 5 }
      const fillBlueOptions = { fillColor: 'blue' }
      // console.log("flightsInfo:", flightsInfo)
      let newOriginAndDestinations = flightsInfo.map(x => {
        const { ignore1, code, destination, origin, ...ignore2} = x
        return (
          <>
          <Polyline positions={[origin, destination]} pathOptions={limeOptions2} >
            <Tooltip>{`${code}`}</Tooltip>
          </Polyline>

          <LayerGroup>
            <Marker position={origin}>
              <Tooltip>{`Origin ${code}`}</Tooltip>
            </Marker>
            <Circle center={destination} pathOptions={fillBlueOptions} radius={3000}>
              <Tooltip>{`Destination ${code}`}</Tooltip>
            </Circle>/
          
          </LayerGroup>
 
          {/* <Marker position={destination} icon={destinatioIcon}> */}
         
          </>
        )
      })

      setOriginAndDestinations(newOriginAndDestinations)
    }, [flightsInfo]) //efecto secundario al cambio de la "prop" flightsInfo



    const limeOptions1 = { color: 'red', weight: 8 }

    const positionsView = Object.entries(positions).map( x => {
      // console.log("posiciones a mostrar: ", x[1])
      // if (x[1][0] == undefined || x[1][1] == undefined){
      //   return false
      // }
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
      <div id="FlightMap" >
        {/*<p>{position.code} {position.position}</p> */}
        <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            { positionsView }

            { originAndDestinations !== [] ?
              originAndDestinations : <></>
            }
            

          </MapContainer>
      </div>
    );
}


export {FlightsMap}