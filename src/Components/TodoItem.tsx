import { FC, useState } from 'react';
import { Todo } from '../Models/Todo';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

interface TodoItemProps {
    todoItem: Todo;
    handleDelete: (todo: Todo) => Promise<void>;
    handleUpdate: (todo: Todo) => Promise<void>;
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(props.todoItem.title);
  const [editedDescription, setEditedDescription] = useState<string>(props.todoItem.description);
  const [editedCompleted, setEditedCompleted] = useState<boolean>(props.todoItem.completed);

  const handleDeleteClick = () => {
    setIsEditing(false);
    props.handleDelete(props.todoItem);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleSaveClick = () => {
    const editedTodo: Todo = {
      id: props.todoItem.id,
      title: editedTitle,
      description: editedDescription,
      completed: editedCompleted,
    }
    props.handleUpdate(editedTodo);
    setIsEditing(false);
  }
  
    return (
      <div className="h-full bg-white shadow-md rounded-md p-4 relative">
        <div className='flex justify-between'>
          <DeleteOutlined onClick={handleDeleteClick}
                          className="text-red-500 cursor-pointer text-3xl"
          />
          {isEditing ? (
            <SaveOutlined className='text-green-500 cursor-pointer text-3xl'
                          onClick={handleSaveClick}/>
          ) : (
            <EditOutlined className='text-green-500 cursor-pointer text-3xl'
                          onClick={handleEditClick}/>
          )}
        </div>
         
        {isEditing ? (
          <input type='text'
                 className='text-black text-2xl font-semibold text-center outline-none border-b-2 border-gray-300'
                 placeholder='Enter Title'
                 value={editedTitle}
                 onChange={(e) => setEditedTitle(e.target.value)}/>
        ) : (
          <h1 className="text-black text-2xl font-semibold text-center truncate">{editedTitle}</h1>
        )}
         
          {isEditing ? (
            <textarea className='text-sm text-gray-700 mt-4 p-2 w-full rounded-md resize-none outline-none border border-gray-300'
                      placeholder='Enter Description'
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}/>
          ) : (
            <p className="text-sm text-gray-700 text-center truncate">{editedDescription}</p>
          )}
          {isEditing && (
            <div className="mt-4 flex justify-center">
              <label className="switch">
                <h2>Is it Done?</h2>
                <input type="checkbox"
                       checked={editedCompleted}
                       onChange={(e) => setEditedCompleted(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          )}        
    </div>
    );
      
}

export default TodoItem;