import React, {useState, useEffect} from 'react'
import { FlightsMap } from '../FlightsMap/FlightsMap'
import {FlightsInfo} from '../FlightsInformation/FlightsInfo'
import { Chat } from '../Chat/Chat';
import { InsertName } from '../Chat/InsertName';


const io = require("socket.io-client");

const ClientWS = (props) => {   

    const [flightsInfo, setFligthsInfo] = useState([])

    const [newMessageSocket, setNewMessageSocket] = useState({})

    useEffect(() => {
        const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights',
            reconnection: true //Por default cuando se desconecta, "se reconecta" solo 
        });
        
        // socket.on("POSITION", msg => { //poner cuando quiera dibujar el mapa
        //     // console.log("Position:", msg)
        //     setPosition({code: msg.code, position: msg.position})
        //     
        // })

        socket.emit('FLIGHTS')
        socket.on("FLIGHTS", msg => {
            console.log("Flights:", msg)
            let newFligthsInfo = msg
            setFligthsInfo(newFligthsInfo)
        })

        socket.on("CHAT", msg => {
            console.log("Chat:", msg)
            setNewMessageSocket(msg)
        })
    
        
    }, []);

    return (
        <>
          <p>Client WS Contiene a todos</p>
          <div id='box-field'>
              <FlightsMap flightsInfo={flightsInfo} />
              <FlightsInfo flightsInfo={flightsInfo} />
          </div>
          

          <InsertName/>

          <div id='box-field'>
            <Chat newMessageSocket = {newMessageSocket}/>
          </div>
        </>
    );


}


export {ClientWS}