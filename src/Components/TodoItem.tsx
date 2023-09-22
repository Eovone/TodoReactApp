import React, { FC, } from 'react';
import { Todo } from '../Models/Todo';
import { Switch } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TodoItemProps {
    todoItem: Todo;
    handleDelete: (todo: Todo) => Promise<void>;
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const handleDeleteClick = () => {
    props.handleDelete(props.todoItem);
  }

    return (
      <div className="bg-white shadow-md rounded-md p-4 m-4 relative">
        <h1 className="text-2xl font-semibold text-center">{props.todoItem.title}</h1>
          <DeleteOutlined onClick={handleDeleteClick}
                          className="text-red-500 absolute top-2 right-2 cursor-pointer text-3xl"
          />
        <p className="text-sm text-gray-700 text-center">{props.todoItem.description}</p>
        <div className="mt-4 flex justify-center">
          <Switch checked={props.todoItem.completed}
           />
      </div>
    </div>
    );
}

export default TodoItem;