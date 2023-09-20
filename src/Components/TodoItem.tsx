import React, { FC, } from 'react';
import { Todo } from '../Models/Todo';
import { Switch } from 'antd';

interface TodoItemProps {
    todoItem: Todo;
}

const TodoItem: FC<TodoItemProps> = (props) => {
    return (
      <div className="bg-white shadow-md rounded-md p-4 m-4">
        <h1 className="text-xl font-semibold">{props.todoItem.title}</h1>
        <p className="text-gray-700">{props.todoItem.description}</p>
        <div className="mt-4">
          <Switch checked={props.todoItem.completed} />
        </div>
      </div>
      );
}

export default TodoItem;