import { FC, useState, useEffect } from 'react';
import { Todo } from '../Models/Todo';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { calculateRemainingTime } from '../Services/TodoService';

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
  const [editedDeadline, setEditedDeadline] = useState<string>(props.todoItem.deadline);

  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [remainingHours, setRemainingHours] = useState<number>(0);
  const [remainingMinutes, setRemainingMinutes] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

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
      deadline: editedDeadline,
    }
    props.handleUpdate(editedTodo);
    setIsEditing(false);
  }   

  useEffect(() => {
    const dateNow = new Date();
    const remainingTime = calculateRemainingTime(dateNow.toISOString(), editedDeadline);
    setRemainingDays(remainingTime.days);
    setRemainingHours(remainingTime.hours);
    setRemainingMinutes(remainingTime.minutes);
    setRemainingSeconds(remainingTime.seconds);
  }, [isEditing]);  
  
    return (
      <div className="h-full bg-white shadow-md rounded-md p-4 relative flex flex-col">
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
                 className='w-full border-2 border-gray-700 text-black text-2xl font-semibold text-center outline-none'
                 placeholder='Enter Title'
                 value={editedTitle}
                 onChange={(e) => setEditedTitle(e.target.value)}/>
        ) : (
          <h1 className="text-black text-2xl font-semibold text-center truncate">{editedTitle}</h1>
        )}
         
          {isEditing ? (
            <textarea className='text-sm text-gray-700 mt-4 p-2 w-full rounded-md resize-none outline-none border-2 border-gray-700'
                      placeholder='Enter Description'
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}/>
          ) : (
            <div className='h-1/2 flex flex-grow'>
              <p className="text-sm text-gray-700 whitespace-pre-wrap max-h-32 overflow-y-auto">{editedDescription}</p>
            </div>
          )}
          {isEditing && (
            <div className="mt-4 flex justify-center mb-4">
              <label className="p-1 flex items-center space-x-2">
                <span className="text-black text-lg font-bold">Is it Done?</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-500 border border-gray-400 rounded focus:ring-2 focus:ring-teal-500 checked:bg-teal-500 checked:border-transparent"
                  checked={editedCompleted}
                  onChange={(e) => setEditedCompleted(e.target.checked)}
                />
              </label>
            </div>
          )}   
         {isEditing ? (
          <div>
            <span className='text-black'>Deadline: </span>
            <input type="text" 
                   placeholder='YYYY-MM-DDTHH-MM-SS'
                   className='border-2 border-gray-700 text-center text-black'
                   value={editedDeadline}
                   onChange={(e) => setEditedDeadline(e.target.value)}
                   />
          </div>
            ) : (
              (remainingSeconds < 0) ? (
                <div>
                  <p className='text-red-500'>Deadline Exceeded</p>
                </div>
              ) : (
                (remainingDays < 1) ? (
                  <div>
                    <p className='text-red-500'>Deadline in: {remainingHours}h/{remainingMinutes}m/{remainingSeconds}s</p>
                  </div>
                ) : (
                  <div>
                    <p>Deadline at: {editedDeadline.replace('T', ' ')}</p>
                  </div>
                )
              )          
          )}
            </div>
            );
      
}

export default TodoItem;