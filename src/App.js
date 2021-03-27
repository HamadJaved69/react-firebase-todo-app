import './App.css';
import db from './firebase';
import Todo from './Todo/Todo';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads we need to listen to the database and fetch the todos
  useEffect(() => {
    //fires when app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().todo));
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    console.log(input);
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <form>
        <FormControl>
          <InputLabel>Todo</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
            />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
          disabled={!input}
          >
          Add Todo
        </Button>
      </form>
      <ul>
        {
          todos.map((todo, i) => (
            <Todo
              key={i}
              text={todo}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
