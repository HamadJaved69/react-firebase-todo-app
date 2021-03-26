import './App.css';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';

function App() {
  const [todos, setTodos] = useState(['Take the dogs for a walk', 'Create React Project']);
  const [input, setInput] = useState('');

  const addTodo = (event) => {
    console.log(input);
    event.preventDefault();
    setTodos([...todos, input]);
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
          Primary
        </Button>
      </form>
      <ul>
        {
          todos.map((todo, i) => (
            <li key={i}>{todo}</li>
          ))
        }
        <li></li>
      </ul>
    </div>
  );
}

export default App;
