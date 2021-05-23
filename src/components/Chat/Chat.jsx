import React, {useState, useEffect} from 'react'
import { MessageList, Input, Button } from 'react-chat-elements'

const io = require("socket.io-client");
const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
    path: '/flights',
    reconnection: true //Por default cuando se desconecta, "se reconecta" solo 
  })
const Chat = (props) => {   
  const {newMessageSocket, username} = props
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    // console.log('llego:', newMessageSocket)
    if (Object.keys(newMessageSocket).length > 0){
      let {name, message} = newMessageSocket
      let newMessageChat =  {
        position: name == username ? 'right' : 'left',
        type: 'text',
        text: message,
        date: new Date(),
      }
      setMessages(prev => [...prev, newMessageChat])
      // console.log('llego un mensaje:', messages)
    }
    // console.log('llego un mensaje2:', messages)
  }, [newMessageSocket])


  const handleChange = (e) => {
    // console.log("cambio:", e, e.nativeEvent.data, e.target, e.target.value)
    let newText = e.target.value
    setInputText(newText)

  }
  const handleSubmit = (e) => {
    if (inputText != ''){
      let message = {
        name: username,
        message: inputText,
      }
      socket.emit('CHAT', message)
    }
  }

    return (
      <>
        <p></p>
        <p>Control Center - User: {username}</p>
        <div className="Chat-Container">

          { messages !== [] 
          ?  
          <>
            <MessageList
            className='message-list'
            lockable={true}
            // toBottomHeight={'100%'}
            dataSource={messages}
            />

            <Input
              placeholder="Type here..."
              // multiline={true}
              type='text'
              defaultValue=''
              onChange={handleChange}
              rightButtons={ 
                <Button color='white' backgroundColor='#282c34' text='Send'
                  onClick={handleSubmit}/>
            }/>
          </>
          : 
          <>
          </>
          
          }

        </div>
        
      </>
      
    );
}

export {Chat}