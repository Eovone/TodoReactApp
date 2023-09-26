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
  return(<div className="text-white text-xl mt-5">No Todo's here!</div>)
}

return (
  <div className="w-3/5 sm:w-1/2 md:w-3/8 lg:w-1/4">
    <div className='w-full'>
      {props.listOfTodos.map((todo, index) => (
        <div className='w-full'  key={index}>
            <div className="h-60 bg-gray-800 rounded shadow-md p-2 m-4 text-gray-500">
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