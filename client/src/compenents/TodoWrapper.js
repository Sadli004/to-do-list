import React, {useState} from 'react'
import { TodoForm } from './todoForm'
import { v4 as uuidv4 } from "uuid";
import { Todo } from './todo'
import { EditTodoForm } from './EditTodoForm';
uuidv4()


export const TodoWrapper = () => {
    const [todos , setTodos] = useState([]) 
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    const addTodo = todo =>  {
      
        setTodos ([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
        console.log(todos); 
      }


      const toggleComplete = (id) => {
        setTodos(
          todos.map((todo) =>todo.id === id ? {...todo, completed: !todo.completed } : todo )
          );
        }
        

        const deleteTodo = (id) => {
          setShowConfirmation(true);
          setTodoToDelete(id);
        }

        const confirmDelete = (confirmed) => {
          if (confirmed) {
            setTodos(todos.filter((todo) => todo.id !== todoToDelete));
          }
          setShowConfirmation(false);
          setTodoToDelete(null);
        };
      

        const editTodo = (id) => {
          setTodos(
            todos.map((todo) => todo.id === id ? {...todo , isEditing : !todo.isEditing } : todo 
          )
          );
        }

        const editTask =(task , id) => {
          setTodos(
            todos.map((todo)=> todo.id === id ? {...todo, task, isEditing : !todo.isEditing} : todo
            )
          )
        }
        
  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!! </h1>
        <TodoForm addTodo = {addTodo} />
        {todos.map((todo, index) => (
          todo.isEditing ?(<EditTodoForm editTodo={editTask} task = {todo}/>) : (
            <Todo task={todo} key={index} 
            toggleComplete ={toggleComplete} deleteTodo ={deleteTodo} editTodo ={editTodo}/> 
          )

        
        )) }
        {showConfirmation && (
        <div className='confirmation-modal'>
          <p>Are you sure you want to delete this task?</p>
          <button className='confirmation-button' onClick={() => confirmDelete(true)}>Yes</button>
          <button className='confirmation-button' onClick={() => confirmDelete(false)}>No</button>
        </div>


        
      )}
        

    </div>

  )
}
