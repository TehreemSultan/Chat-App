import {useState, useEffect} from 'react';
import Message from './Message';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [input,setInput] = useState("");
  const [username,setUsername] = useState("");
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>doc.data()))})
  }, []);


  useEffect(()=>{
    setUsername(prompt('Please enter your name'));
  },[]);

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
      <h1>My Chat App</h1>
      <h2>welcome {username}</h2>
      <form>
      <FormControl>
      <InputLabel htmlFor="my-input">Enter a message.....</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>Send Message</Button>
      </FormControl>
      </form>
      {
        messages.map(message=>(
        <Message username={username} message={message}/>
       ) )
      }
    </div>
  );
}

export default App
