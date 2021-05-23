import React, {useState, useEffect} from 'react'
import { MessageList, Input, Button } from 'react-chat-elements'

const processDate = (date) => {
  let newDate = undefined
  newDate = new Date(date)
  // console.log("newdate:", newDate)
  let [day, month, year, hour, minute, second] = [newDate.getDate(),
     newDate.getMonth() + 1, newDate.getFullYear(), newDate.getHours(), 
     newDate.getMinutes(), newDate.getSeconds()]
  newDate = `${day}/${month}/${year} 
            ${hour}:${minute}:${second}`
  return newDate

}

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
      let {date, name, message} = newMessageSocket
      let dateFormat = processDate(date)

      let newMessageChat =  {
        position: name == username ? 'right' : 'left',
        type: 'text',
        title: `${name}      ${dateFormat}`,
        text: message,
        height: "auto",
        date: '',
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
            toBottomHeight={'100%'}
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