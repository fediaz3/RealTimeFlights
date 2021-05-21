import React, {useState, useEffect} from 'react'

const io = require("socket.io-client");

const ClientWS = (props) => {   
    // const [count, setCount] = useState(0);
    useEffect(() => {
        const io = require("socket.io-client");
        const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights',
            reconnection: true //Por default cuando se desconecta, "se reconecta" solo 
        });
        
        // socket.on("POSITION", msg => { //poner cuando quiera dibujar el mapa
        //     console.log("Position:", msg)
        // })


        socket.on("FLIGHTS", msg => {
            console.log("Flight:", msg)
        })

        socket.on("CHAT", msg => {
            console.log("Chat:", msg)
        })
    
        
    }, []);

    return (
        <>
          <p>Client WS</p>
        </>
    );


}


export {ClientWS}