import React, {useState, useEffect} from 'react'

import { MessageList } from 'react-chat-elements'
import { SystemMessage } from 'react-chat-elements'

import { MessageBox } from 'react-chat-elements'



const messages1 = [
  {
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },
  
  {
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
  },
  {
      position: 'left',
      type: 'text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
      date: new Date(),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
},
{
  position: 'left',
  type: 'text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  date: new Date(),
},
{
  position: 'right',
  type: 'text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  date: new Date(),
},
]

const Chat = (props) => {   
    // const [count, setCount] = useState(0);
    // useEffect(() => {
// 
    // }, []);
    return (
      <>
        <p></p>
        <p>Chat</p>
        <div className="Chat-Container">

          <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages1}
          />

        </div>
        
      </>
      
    );


}

export {Chat}