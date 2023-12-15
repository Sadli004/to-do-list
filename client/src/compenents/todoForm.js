import React, {useState} from 'react'
import $ from 'jquery';
export const TodoForm = ({ addTodo}) => {
    const [value , setValue] = useState("");
    

    const handleSubmit = e => {
        e.preventDefault();
        if(value === ""){ alert("You need to write a task")}
        else{
        addTodo(value)
        setValue("")
        }
    }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type='text' className='todo-input' value={value} placeholder='what is the task today ?' onChange={(e)=> setValue(e.target.value)}></input>
        <button type='submit' className='todo-btn' >Add Task</button>
    </form>
  )
}
