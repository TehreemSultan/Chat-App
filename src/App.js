import {useState, useEffect, useRef} from 'react';
import Message from './Message';
import {  FormControl, Input, IconButton } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import  FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {

  const [input,setInput] = useState("");
  const [username,setUsername] = useState("");
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>({id: doc.id, message: doc.data()})))})
  }, []);


  useEffect(()=>{
    setUsername(prompt('Please enter your name'));
  },[]);
  
  useEffect(()=>{
     document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
  },[messages])

  const sendMessage=(event)=>{
    event.preventDefault();
    db.collection('messages').add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  }

  return (
    <div className="App">
      <h1 style={{}}>REACT CHAT APP</h1>
      <h2>Welcome {username}</h2>
      <form className='app__form'>
      <FormControl className='app__formControl'>
        <Input className="app__input" placeholder='Write a message...' value={input} onChange={event => setInput(event.target.value)}/>
        <IconButton className="app__iconButton" disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
          <SendIcon/>
        </IconButton>
      </FormControl>
      </form>
      
  
      <FlipMove id='app_messagesContainer' >
      {
        messages.map(({id,message})=>(
        <Message className='msg' key={id} username={username} message={message}/>
       ) )
      }  
      </FlipMove>
      <div className='extra' ></div>
     </div>
    
  );
}

export default App
