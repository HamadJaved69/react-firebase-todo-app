import './Todo.css';
import db from '../firebase';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    List,
    Modal,
    Input,
    Button,
    ListItem,
    makeStyles,
    InputLabel,
    IconButton,
    FormControl,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: "20px",
        textAlign: "center",
    }
}));

function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [input, setInput] = useState();

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <h1>Update Todo</h1>
                <FormControl>
                <InputLabel>Todo</InputLabel>
                <Input
                    placeholder={props.todo.todo}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    />
                </FormControl>
                <Button variant="contained" color="primary" type="submit"onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemText primary="Todo" secondary={props.todo.todo}></ListItemText>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={e => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={e => db.collection('todos').doc(props.todo.id).delete()}
                        >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
        </>
    )
}

export default Todo;
