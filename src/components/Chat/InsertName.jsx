import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom';



const InsertName = (props) => {

    const [userName, setUsername] = useState('')

    const mySubmitHandler = (event) => {
        event.preventDefault();
        console.log("click final", userName)
        props.sendData1(userName)
      }

    const myChangeHandler = (event) => {
      setUsername(event.target.value);
    }

    return (
        <form onSubmit={mySubmitHandler} style={{paddingBottom: '50px'}}>
            <p style={{color: 'white'}}>Log In to Control Center</p>
            <input
              type='text'
              placeholder='Type your name...'
              onChange={myChangeHandler}
            />
            <input
              type='submit'
              value="Send"
            />
        </form>
      );

}

export {InsertName}