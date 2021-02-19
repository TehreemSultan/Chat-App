import {useState, useEffect} from 'react';
import Message from './Message';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from './firebase';

function App() {

  const [input,setInput] = useState("");
  const [username,setUsername] = useState("");
  const [messages,setMessages] = useState([{username:'jj', message:"kkkk"}]);

  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>doc.data()))})
  }, []);


  useEffect(()=>{
    setUsername(prompt('Please enter your name'));
  },[]);

  const sendMessage=(event)=>{
    event.preventDefault();
    setMessages([...messages, {username:username, text:input}]);
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
