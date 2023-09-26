import { FC } from 'react';
import { Todo } from '../Models/Todo';
import TodoItem from './TodoItem';

interface TodoItemsProps {
  listOfTodos: Todo[];
  handleDelete: (todo: Todo) => Promise<void>;
  handleUpdate: (todo: Todo) => Promise<void>;
}

const TodoItems: FC<TodoItemsProps> = (props) => {

if(props.listOfTodos.length === 0){
  return(<div className="text-white">No Todo's here!</div>)
}

return (
  <div className="w-full">
    <div>
      {props.listOfTodos.map((todo, index) => (
        <div key={index}>
            <div className="bg-gray-800 rounded shadow-md p-4 m-4 text-gray-500">
              <TodoItem todoItem={todo} 
                        handleDelete={props.handleDelete}
                        handleUpdate={props.handleUpdate}/>
            </div>
        </div>
      ))}
    </div>   
  </div>
);
};

export default TodoItems;