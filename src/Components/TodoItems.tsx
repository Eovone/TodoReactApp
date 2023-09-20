import React, { FC } from 'react';
import { Todo } from '../Models/Todo';
import TodoItem from './TodoItem';

interface TodoItemsProps {
  listOfTodos: Todo[];
}

const TodoItems: FC<TodoItemsProps> = (props) => {

if(props.listOfTodos.length === 0){
  return(
    <div>No Todo's here!</div>
  )
}

return (
<div className='grid grid-cols-2'>

  <div>
    <h1>Not Done</h1>
      {props.listOfTodos.map((todo, index) => (
        <div key={index}>
          {todo.completed ? (       
            <div></div>
          ) : (
          <div className=''>
            <TodoItem todoItem={todo} />
          </div>
        )}      
        </div>    
        ))}
  </div>

  <div>
    <h1>Done</h1>
  {props.listOfTodos.map((todo, index) => (
    <div key={index}>
      {todo.completed ? (
        <div className=''>
          <TodoItem todoItem={todo} />
        </div>
      ) : (
        <div></div>
      )}      
    </div>    
  ))}
  </div>
  

  
</div>

); 
};

export default TodoItems;