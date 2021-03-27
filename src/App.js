import './App.css';
import db from './firebase';
import Todo from './Todo/Todo';
import firebase from 'firebase';
import Navbar from './Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Input,
  Button,
  InputLabel,
  makeStyles,
  FormControl
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    textAlign: "center"
  }
}));

function App() {

  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads we need to listen to the database and fetch the todos
  useEffect(() => {
    //this code fires when app.js loaded
    db.collection('todos').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id:doc.id, todo: doc.data().todo})))
    })}, [])

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
    <div className={classes.root}>
      <Navbar />
      <br />
      <Grid container>
        <Grid item xs={2} md={3}></Grid>
        <Grid item xs={8} md={6}>
          <form className={classes.form}>
            <div>  
              <FormControl>
                <InputLabel>Todo</InputLabel>
                <Input
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  />
              </FormControl>
            </div>
            <div style={{padding:'10px'}}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={addTodo}
                disabled={!input}
                >
                Add Todo
              </Button>
            </div>
          </form>
          <div>
            {
              todos.map((todo, i) => (
                <Todo
                  key={i}
                  todo={todo}
                />
              ))
            }
          </div>
        </Grid>
        <Grid item xs={2} md={3}></Grid>
      </Grid>
    </div>
  );
}

export default App;
