import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};


const Todo = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [text, setText] = useState('');
  
    const handleAddTodo = () => {
      if (text.trim() !== '') {
        dispatch({ type: 'ADD_TODO', payload: text });
        setText('');
      }
    };
  
    const handleDeleteTodo = (id) => {
      dispatch({ type: 'DELETE_TODO', payload: id });
    };
  
    return (
      <div className='block'>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo} className='add-button'>Add Todo</button>
          {state.todos.map((todo) => (
            <p key={todo.id}>
              {todo.text}
              <button className='delete-button' onClick={() => handleDeleteTodo(todo.id) }>Delete</button>
            </p>
          ))}
      </div>
    );
  };
  
  export default Todo;
  