import React, { FC } from 'react';
import { Todo } from '../Models/Todo';
import TodoItem from './TodoItem';

interface TodoItemsProps {
  listOfTodos: Todo[];
  handleDelete: (todo: Todo) => Promise<void>;
}

const TodoItems: FC<TodoItemsProps> = (props) => {

if(props.listOfTodos.length === 0){
  return(<div className="text-white">No Todo's here!</div>)
}

return (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <h1 className="text-3xl text-white">Not Done</h1>
      {props.listOfTodos.map((todo, index) => (
        <div key={index}>
          {todo.completed ? (
            <div></div>
          ) : (
            <div className="bg-gray-800 rounded shadow-md p-4 m-4 text-gray-500">
              <TodoItem todoItem={todo} handleDelete={props.handleDelete}/>
            </div>
          )}
        </div>
      ))}
    </div>

    <div>
      <h1 className="text-3xl text-white">Done</h1>
      {props.listOfTodos.map((todo, index) => (
        <div key={index}>
          {todo.completed ? (
            <div className="bg-gray-800 rounded shadow-md p-4 m-4 text-gray-500">
              <TodoItem todoItem={todo} handleDelete={props.handleDelete}/>
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